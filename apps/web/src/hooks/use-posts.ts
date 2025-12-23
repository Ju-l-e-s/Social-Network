"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ApiForbiddenError,
  ApiUnauthorizedError,
  fetchPosts,
  type Post,
} from "@/lib/api/client";
import { mockPosts } from "@/lib/mock/posts";

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        return await fetchPosts();
      } catch (error) {
        if (
          error instanceof ApiUnauthorizedError ||
          error instanceof ApiForbiddenError
        ) {
          throw error;
        }
        console.warn(
          "[usePosts] API indisponible, fallback sur les données mockées.",
          error,
        );
        return mockPosts;
      }
    },
  });
}
