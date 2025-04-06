import { Song } from "@/types";
import * as MediaLibrary from "expo-media-library";

export const getAllSongs = async () => {
  const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
    includeSmartAlbums: true,
  });
  const result: Song[][] = [];
  for (let album of fetchedAlbums) {
    const { assets } = await MediaLibrary.getAssetsAsync({
      album,
      mediaType: ["audio"],
    });

    result.push(assets);
  }

  return result.flat().sort((a, b) => b.modificationTime - a.modificationTime);
};

export const getSong = async (id: string) => {
  return MediaLibrary.getAssetInfoAsync(id);
};

export const deleteSongs = async (songs: Song[]) => {
  try {
    await MediaLibrary.deleteAssetsAsync(songs);
  } catch (error) {
    console.log(error);
  }
};
