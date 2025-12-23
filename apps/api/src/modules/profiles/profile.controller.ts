import type { Response } from "express";
import { AuthRequest } from "@/middlewares/auth";
import * as profileService from "@/modules/profiles/profile.service";
import { ApiError } from "@/middlewares/error-handler";

export async function getOwnProfile(req: AuthRequest, res: Response) {
  if (!req.user) {
    throw new ApiError("Authentification requise", 401);
  }
  const profile = await profileService.getProfileById(req.user.id);
  res.json(profile);
}

export async function updateOwnProfile(req: AuthRequest, res: Response) {
  if (!req.user) {
    throw new ApiError("Authentification requise", 401);
  }
  const profile = await profileService.updateProfile(req.user.id, req.body);
  res.json(profile);
}

export async function getProfileById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const profile = await profileService.getProfileById(id);
  res.json(profile);
}

export async function listProfiles(_req: AuthRequest, res: Response) {
  const profiles = await profileService.listProfiles();
  res.json(profiles);
}

export async function updatePermissions(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const profile = await profileService.updatePermissions(id, req.body);
  res.json(profile);
}
