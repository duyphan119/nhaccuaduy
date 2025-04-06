import { editPlaylist, EditPlaylistProps } from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export const useEditPlaylist = () => {
  return useMutation({
    mutationFn: (props: EditPlaylistProps) => editPlaylist(props),
  });
};
