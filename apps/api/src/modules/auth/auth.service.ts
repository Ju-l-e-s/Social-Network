import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "@/modules/users/user.model";
import { env } from "@/config/env";
import { ApiError } from "@/middlewares/error-handler";
import { defaultMemberPermissions } from "@/modules/users/permissions";

const baseUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
});

export const signupSchema = baseUserSchema.extend({
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signup(input: z.infer<typeof signupSchema>) {
  const payload = signupSchema.parse(input);
  const hashed = await bcrypt.hash(payload.password, 10);
  const user = await UserModel.create({
    ...payload,
    password: hashed,
    permissions: defaultMemberPermissions,
  });
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    permissions: user.permissions,
  };
}

export async function login(input: z.infer<typeof loginSchema>) {
  const payload = loginSchema.parse(input);
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new ApiError("Identifiants invalides", 401);
  }

  const isValid = await bcrypt.compare(payload.password, user.password);
  if (!isValid) {
    throw new ApiError("Identifiants invalides", 401);
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    env.TOKEN_KEY,
    { expiresIn: "1d" },
  );

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
       permissions: user.permissions ?? defaultMemberPermissions,
    },
  };
}

export async function getCurrentUser(userId: string) {
  const user = await UserModel.findById(userId)
    .select("firstName lastName email isAdmin permissions")
    .lean();
  if (!user) {
    throw new ApiError("Utilisateur introuvable", 404);
  }
  return {
    id: user._id,
    ...user,
  };
}
