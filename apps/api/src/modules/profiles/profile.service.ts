import { z } from "zod";
import { UserModel, type UserDocument } from "@/modules/users/user.model";
import { ApiError } from "@/middlewares/error-handler";
import {
  normalizePermissions,
  permissionValues,
} from "@/modules/users/permissions";

const profileSelection =
  "firstName lastName role department location bio skills avatarColor avatarUrl permissions isAdmin";

const permissionSchema = z.enum(permissionValues);

export const updateProfileSchema = z.object({
  role: z.string().min(2).max(80).optional(),
  department: z.string().min(2).max(80).optional(),
  location: z.string().min(2).max(80).optional(),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).max(10).optional(),
  avatarColor: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i).optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

const updatePermissionsSchema = z.object({
  permissions: z.array(permissionSchema).min(1),
  isAdmin: z.boolean().optional(),
  role: z.string().min(2).max(80).optional(),
});

type ProfileRecord = Pick<
  UserDocument,
  | "firstName"
  | "lastName"
  | "role"
  | "department"
  | "location"
  | "bio"
  | "skills"
  | "avatarColor"
  | "avatarUrl"
  | "permissions"
  | "isAdmin"
> & { _id: string };

function sanitizeSkills(skills?: string[]) {
  if (!skills) return undefined;
  return skills
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0)
    .slice(0, 10);
}

function toProfile(user: ProfileRecord) {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    department: user.department,
    location: user.location,
    bio: user.bio,
    skills: user.skills ?? [],
    avatarColor: user.avatarColor,
    avatarUrl: user.avatarUrl ?? null,
    permissions: user.permissions ?? [],
    isAdmin: user.isAdmin,
  };
}

export async function getProfileById(userId: string) {
  const user = await UserModel.findById(userId).select(profileSelection).lean();
  if (!user) {
    throw new ApiError("Profil introuvable", 404);
  }
  return toProfile(user as ProfileRecord);
}

export async function updateProfile(userId: string, input: unknown) {
  const payload = updateProfileSchema.parse(input);
  const updates: Record<string, unknown> = {
    ...payload,
  };
  if (payload.avatarUrl === null) {
    updates.avatarUrl = null;
  }
  if (payload.skills) {
    updates.skills = sanitizeSkills(payload.skills);
  }
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true },
  )
    .select(profileSelection)
    .lean();
  if (!user) {
    throw new ApiError("Profil introuvable", 404);
  }
  return toProfile(user as ProfileRecord);
}

export async function listProfiles() {
  const profiles = await UserModel.find()
    .select(profileSelection)
    .sort({ firstName: 1 })
    .lean();
  return profiles.map((profile) => toProfile(profile as ProfileRecord));
}

export async function updatePermissions(userId: string, input: unknown) {
  const payload = updatePermissionsSchema.parse(input);
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError("Profil introuvable", 404);
  }

  if (typeof payload.isAdmin === "boolean") {
    user.isAdmin = payload.isAdmin;
  }

  user.permissions = normalizePermissions(payload.permissions, user.isAdmin);

  if (payload.role) {
    user.role = payload.role;
  }

  await user.save();
  const freshUser = await UserModel.findById(user._id)
    .select(profileSelection)
    .lean();
  if (!freshUser) {
    throw new ApiError("Profil introuvable", 404);
  }
  return toProfile(freshUser as ProfileRecord);
}
