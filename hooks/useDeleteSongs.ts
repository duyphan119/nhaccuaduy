import { deleteSongs } from "@/db/song";
import { useMutation } from "@tanstack/react-query";
import * as MediaLibrary from "expo-media-library";

export const useDeleteSongs = () => {
  return useMutation({
    mutationFn: ({ songs }: { songs: MediaLibrary.Asset[] }) =>
      deleteSongs(songs),
  });
};
