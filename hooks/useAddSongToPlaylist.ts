import { addSongsToPlaylist, AddSongsToPlaylistProps } from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export function useAddSongsToPlaylist() {
  return useMutation({
    mutationFn: (props: AddSongsToPlaylistProps) => addSongsToPlaylist(props),
  });
}
