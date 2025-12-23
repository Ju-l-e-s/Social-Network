import { Router } from "express";
import { authenticate } from "@/middlewares/auth";
import * as controller from "@/modules/profiles/profile.controller";
import { requireAdmin, requirePermission } from "@/middlewares/permissions";

export const router = Router();

router.get("/me", authenticate, controller.getOwnProfile);
router.patch(
  "/me",
  authenticate,
  requirePermission("profile:edit"),
  controller.updateOwnProfile,
);

router.get(
  "/",
  authenticate,
  requireAdmin,
  controller.listProfiles,
);

router.patch(
  "/:id/permissions",
  authenticate,
  requireAdmin,
  controller.updatePermissions,
);

router.get(
  "/:id",
  authenticate,
  requirePermission("feed:read"),
  controller.getProfileById,
);
