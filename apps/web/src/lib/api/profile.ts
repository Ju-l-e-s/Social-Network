import { apiClient } from "@/lib/api/client";
import type { PermissionKey } from "@/lib/permissions";

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  location: string;
  bio: string;
  skills: string[];
  avatarColor: string;
  avatarUrl: string | null;
  isAdmin?: boolean;
  permissions: PermissionKey[];
};

export async function fetchMyProfile() {
  const { data } = await apiClient.get<Profile>("/profiles/me");
  return data;
}

export type UpdateProfilePayload = {
  role?: string;
  department?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  avatarColor?: string;
  avatarUrl?: string | null;
};

export async function updateMyProfile(input: UpdateProfilePayload) {
  const { data } = await apiClient.patch<Profile>("/profiles/me", input);
  return data;
}
