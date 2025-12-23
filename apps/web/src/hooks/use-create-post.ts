"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api/posts";
import type { Post } from "@/lib/api/client";

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previous = queryClient.getQueryData<Post[]>(["posts"]);
      const tempPost: Post = {
        id: `temp-${Date.now()}`,
        author: {
          firstName: "Vous",
          lastName: "",
          role: "Employé",
          avatarColor: "#6366f1",
          avatarUrl: null,
        },
        message: payload.message,
        imageUrl: payload.imageUrl,
        likes: 0,
        reactions: [],
        createdAt: new Date().toISOString(),
        tags: payload.tags ?? [],
      };
      queryClient.setQueryData<Post[]>(["posts"], (current) =>
        current ? [tempPost, ...current] : [tempPost],
      );
      return { previous, tempId: tempPost.id };
    },
    onSuccess: (created, _payload, context) => {
      queryClient.setQueryData<Post[]>(["posts"], (current) => {
        const filtered =
          current?.filter((post) => post.id !== context?.tempId) ?? [];
        return [created, ...filtered];
      });
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
    },
  });
}
