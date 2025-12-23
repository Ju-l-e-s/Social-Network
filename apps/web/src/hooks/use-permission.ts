"use client";

import { useAuthStore } from "@/stores/use-auth";
import type { PermissionKey } from "@/lib/permissions";

export function useHasPermission(permission: PermissionKey) {
  return useAuthStore((state) => {
    const user = state.user;
    if (!user) return false;
    if (user.isAdmin) return true;
    return user.permissions.includes(permission);
  });
}

export function usePermissions() {
  return useAuthStore((state) => state.user?.permissions ?? []);
}
