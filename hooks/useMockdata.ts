import { fetchAllUser, fetchUserById } from "@/app/api/mockdata";
import { useQuery } from "@tanstack/react-query";

export function useMockData() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUser,
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: Boolean(id),
  });
}
