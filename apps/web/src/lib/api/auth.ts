import { apiClient } from "@/lib/api/client";
import type { PermissionKey } from "@/lib/permissions";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
  permissions: PermissionKey[];
};

export async function login(payload: { email: string; password: string }) {
  const { data } = await apiClient.post<AuthUser>("/auth/login", payload);
  return data;
}

export async function signup(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const { data } = await apiClient.post<AuthUser>("/auth/signup", payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<AuthUser>("/auth/me");
  return data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
}
