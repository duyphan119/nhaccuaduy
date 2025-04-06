import SongItem from "@/components/SongItem";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { Playlist, Song } from "@/types";
import {
  FLOATING_PLAYER_HEIGHT,
  PADDING,
  SONG_ITEM_SIZE,
} from "@/utils/constants";
import { useMemo } from "react";
import { FlatList } from "react-native";

type SongsProps = {
  playlist: Playlist;
};

export default function Songs({ playlist }: SongsProps) {
  const { setPlayingPlaylist, playlists } = usePlaylistsStore();

  const { playbackMode, musicPlayerVisible, playingSong, playSong } =
    useSongsStore();

  const handlePress = async (song: Song) => {
    setPlayingPlaylist(playlist);
    playSong(song, playlist, playbackMode);
  };

  const favoriteSongIds = useMemo(() => {
    return (
      playlists
        .find((playlist) => playlist.name === "Yêu thích")
        ?.songs.map(({ id }) => id) || []
    );
  }, [playlists]);

  return (
    <FlatList
      data={playlist.songs}
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => (
        <SongItem
          isFavorited={favoriteSongIds.includes(item.id)}
          song={item}
          onPress={() => handlePress(item)}
        />
      )}
      style={[
        { width: "100%" },
        !musicPlayerVisible && playingSong
          ? {
              marginBottom: FLOATING_PLAYER_HEIGHT + SONG_ITEM_SIZE + PADDING,
            }
          : { marginBottom: SONG_ITEM_SIZE + PADDING },
      ]}
    />
  );
}
