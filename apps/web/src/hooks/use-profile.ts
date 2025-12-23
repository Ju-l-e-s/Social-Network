"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMyProfile,
  updateMyProfile,
  type Profile,
} from "@/lib/api/profile";

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ["profile", "me"],
    queryFn: fetchMyProfile,
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile", "me"], profile);
    },
  });
}
