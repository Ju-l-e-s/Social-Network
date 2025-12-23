import { Router } from "express";
import * as postsController from "@/modules/posts/posts.controller";
import { authenticate } from "@/middlewares/auth";
import { requirePermission } from "@/middlewares/permissions";

export const router = Router();

router.get(
  "/",
  authenticate,
  requirePermission("feed:read"),
  postsController.getPosts,
);
router.post(
  "/",
  authenticate,
  requirePermission("post:create"),
  postsController.createPost,
);
