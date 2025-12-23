import type { Request, Response } from "express";
import * as authService from "@/modules/auth/auth.service";
import { AuthRequest } from "@/middlewares/auth";
import { ApiError } from "@/middlewares/error-handler";

export async function signup(req: Request, res: Response) {
  const user = await authService.signup(req.body);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { token, user } = await authService.login(req.body);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json(user);
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "déconnexion" });
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user) {
    throw new ApiError("Authentification requise", 401);
  }
  const user = await authService.getCurrentUser(req.user.id);
  res.json(user);
}
