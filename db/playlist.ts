import { Playlist, PlaylistItem, Song } from "@/types";
import { getAssetInfoAsync } from "expo-media-library";
import { getDb } from ".";

export const getAllPlaylists = async () => {
  const db = await getDb();

  try {
    const playlists: Playlist[] = await db.getAllAsync(
      `select * from playlists`
    );

    for (let i = 0; i < playlists.length; i++) {
      const playlist = await getPlaylist(playlists[i].name);

      playlists[i] = {
        ...playlists[i],
        ...playlist,
      };
    }

    return playlists;
  } catch (error) {
    console.log("Get all playlists error", error);
    return [];
  }
};

export const getPlaylist = async (name: string) => {
  const db = await getDb();

  const playlistItems: PlaylistItem[] = await db.getAllAsync(
    `select * from playlist_items where playlist = '${name}' order by created_at desc`
  );

  const results = await Promise.allSettled(
    playlistItems.map(({ item_id }) => getAssetInfoAsync(item_id))
  );

  const songs = results.map((result) =>
    result.status === "fulfilled" ? result.value : null
  );

  for (let i = 0; i < songs.length; i++) {
    if (!songs[i]) {
      await db.execAsync(
        `delete from playlist_items where item_id = '${playlistItems[i].item_id}'`
      );
    }
  }

  return {
    name,
    songs: songs.filter((song) => song) as Song[],
  };
};

export type CreatePlaylistProps = {
  name: string;
};

export const createPlaylist = async ({ name }: CreatePlaylistProps) => {
  const db = await getDb();

  if (name === "Yêu thích") return;

  try {
    await db.execAsync(`INSERT INTO playlists (name) VALUES ('${name}')`);

    return {
      name,
      songs: [],
    } as Playlist;
  } catch (error) {
    console.log("create playlist error", error);
  }
};

export type EditPlaylistProps = {
  newName: string;
  oldName: string;
};

export const editPlaylist = async ({ newName, oldName }: EditPlaylistProps) => {
  const db = await getDb();

  if (oldName === "Yêu thích" || newName === "Yêu thích") return;

  try {
    await db.execAsync(
      `update playlists set name = '${newName}' where name = '${oldName}'`
    );
  } catch (error) {
    console.log("update playlist error", error);
  }
};

export const deletePlaylists = async (nameList: string[]) => {
  const db = await getDb();

  try {
    await db.execAsync(
      `delete from playlists where name in (${nameList
        .map((name) => `'${name}'`)
        .join(",")})`
    );
  } catch (error) {
    console.log(error);
  }
};

export const songIsFavorite = async (id: string) => {
  const db = await getDb();

  const result = await db.getFirstAsync(
    `select * from playlist_items where item_id = '${id}' and playlist = 'Yêu thích'`
  );

  return !!result;
};

export const isSongInPlaylist = async (id: string, playlist: string) => {
  const db = await getDb();

  const result = await db.getFirstAsync(
    `select * from playlist_items where item_id = '${id}' and playlist = '${playlist}'`
  );

  return !!result;
};

export type AddSongsToPlaylistProps = {
  playlistName: string;
  songIds: string[];
};

export const addSongsToPlaylist = async ({
  songIds,
  playlistName,
}: AddSongsToPlaylistProps) => {
  const db = await getDb();

  const queries = songIds.map(
    (id) =>
      `insert into playlist_items (item_id, playlist) values ('${id}', '${playlistName}')`
  );

  try {
    await db.execAsync(queries.join(";"));
  } catch (error) {
    console.log("add songs to playlist error", error);
  }
};

export type AddSongToPlaylistsProps = {
  playlistNames: string[];
  songId: string;
};

export const addSongToPlaylists = async ({
  songId,
  playlistNames,
}: AddSongToPlaylistsProps) => {
  const db = await getDb();

  const queries = playlistNames.map(
    (name) =>
      `insert into playlist_items (item_id, playlist) values ('${songId}', '${name}')`
  );

  try {
    await db.execAsync(queries.join(";"));
  } catch (error) {
    console.log("add songs to playlist error", error);
  }
};

export type RemoveSongsFromPlaylistProps = {
  playlistName: string;
  songIds: string[];
};

export const removeSongsFromPlaylist = async ({
  playlistName,
  songIds,
}: RemoveSongsFromPlaylistProps) => {
  const db = await getDb();

  const queries = songIds.map(
    (id) =>
      `delete from playlist_items where item_id = '${id}' and playlist = '${playlistName}'`
  );

  try {
    await db.execAsync(queries.join(";"));
  } catch (error) {
    console.log("remove songs from playlist error", error);
  }
};
