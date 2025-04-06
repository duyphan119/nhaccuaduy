import {
  removeSongsFromPlaylist,
  RemoveSongsFromPlaylistProps,
} from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export function useRemoveSongsFromPlaylist() {
  return useMutation({
    mutationFn: (props: RemoveSongsFromPlaylistProps) =>
      removeSongsFromPlaylist(props),
  });
}
