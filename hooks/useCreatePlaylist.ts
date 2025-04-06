import { createPlaylist, CreatePlaylistProps } from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export function useCreatePlaylist() {
  return useMutation({
    mutationFn: (props: CreatePlaylistProps) => createPlaylist(props),
  });
}
