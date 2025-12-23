import type { Request, Response } from "express";
import * as postsService from "@/modules/posts/posts.service";
import { ApiError } from "@/middlewares/error-handler";
import { AuthRequest } from "@/middlewares/auth";

export async function getPosts(_req: Request, res: Response) {
  const posts = await postsService.listPosts();
  res.json(posts);
}

export async function createPost(req: AuthRequest, res: Response) {
  if (!req.user) {
    throw new ApiError("Authentification requise", 401);
  }

  const post = await postsService.createPost({
    ...req.body,
    userId: req.user.id,
  });
  res.status(201).json(post);
}
