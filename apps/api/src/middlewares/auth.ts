import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { ApiError } from "@/middlewares/error-handler";
import { UserModel } from "@/modules/users/user.model";
import type { PermissionKey } from "@/modules/users/permissions";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    isAdmin?: boolean;
    permissions?: PermissionKey[];
  };
}

export async function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token ?? req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ApiError("Authentification requise", 401));
  }

  try {
    const decoded = jwt.verify(token, env.TOKEN_KEY) as {
      userId: string;
    };

    const dbUser = await UserModel.findById(decoded.userId)
      .select("_id isAdmin permissions")
      .lean();

    if (!dbUser) {
      return next(new ApiError("Authentification requise", 401));
    }

    req.user = {
      id: String(dbUser._id),
      isAdmin: dbUser.isAdmin,
      permissions: dbUser.permissions ?? [],
    };

    return next();
  } catch {
    return next(new ApiError("Token invalide", 401));
  }
}
