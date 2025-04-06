import { getPlaylist } from "@/db/playlist";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaylist = (name: string) => {
  return useQuery({
    queryKey: ["playlist", name],
    queryFn: () => getPlaylist(name),
  });
};
