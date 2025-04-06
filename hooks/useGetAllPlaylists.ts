import { getAllPlaylists } from "@/db/playlist";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylists = () => {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: getAllPlaylists,
  });
};
