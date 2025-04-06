import { addSongToPlaylists, AddSongToPlaylistsProps } from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export function useAddSongToPlaylists() {
  return useMutation({
    mutationFn: (props: AddSongToPlaylistsProps) => addSongToPlaylists(props),
  });
}
