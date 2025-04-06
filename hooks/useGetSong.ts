import { getSong } from "@/db/song";
import { useQuery } from "@tanstack/react-query";

export const useGetSong = (id: string) => {
  return useQuery({
    queryKey: ["song", id],
    queryFn: () => getSong(id),
  });
};
