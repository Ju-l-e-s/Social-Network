import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@/middlewares/auth";
import { ApiError } from "@/middlewares/error-handler";
import type { PermissionKey } from "@/modules/users/permissions";

export function hasPermission(req: AuthRequest, permission: PermissionKey) {
  const user = req.user;
  if (!user) return false;
  if (user.isAdmin) return true;
  const permissions = user.permissions ?? [];
  return permissions.includes(permission);
}

export function requirePermission(permission: PermissionKey) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!hasPermission(req, permission)) {
      throw new ApiError("Action non autorisée", 403);
    }
    next();
  };
}

export function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    throw new ApiError("Accès interdit", 403);
  }
  next();
}
