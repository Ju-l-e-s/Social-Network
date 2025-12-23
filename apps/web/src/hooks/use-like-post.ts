"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/lib/api/client";

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => postId,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previous = queryClient.getQueryData<Post[]>(["posts"]);
      queryClient.setQueryData<Post[]>(["posts"], (current) =>
        current?.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post,
        ) ?? [],
      );
      return { previous };
    },
    onError: (_err, _postId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
    },
  });
}

