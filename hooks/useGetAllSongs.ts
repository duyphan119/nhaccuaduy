import { getAllSongs } from "@/db/song";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: getAllSongs,
  });
};
