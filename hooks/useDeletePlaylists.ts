import { deletePlaylists } from "@/db/playlist";
import { useMutation } from "@tanstack/react-query";

export const useDeletePlaylists = () => {
  return useMutation({
    mutationFn: (nameList: string[]) => deletePlaylists(nameList),
  });
};
