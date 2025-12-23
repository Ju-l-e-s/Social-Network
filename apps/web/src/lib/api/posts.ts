import { apiClient } from "@/lib/api/client";
import type { Post } from "@/lib/api/client";

export async function createPost(payload: {
  message: string;
  imageUrl?: string;
  tags?: string[];
}) {
  try {
    const { data } = await apiClient.post<Post>("/posts", payload);
    return data;
  } catch (error) {
    console.warn("[createPost] API indisponible, fallback local.", error);
    // Fallback local pour la démo : génère un post simulé.
    return {
      id: `local-${Date.now()}`,
      author: {
        firstName: "Vous",
        lastName: "",
        role: "Employé",
        avatarColor: "#fb923c",
        avatarUrl: null,
      },
      message: payload.message,
      imageUrl: payload.imageUrl,
      likes: 0,
      reactions: [],
      createdAt: new Date().toISOString(),
      tags: payload.tags ?? [],
    } satisfies Post;
  }
}
