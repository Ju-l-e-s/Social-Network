export const PERMISSIONS = [
  "feed:read",
  "profile:edit",
  "media:upload",
  "post:create",
  "post:moderate",
  "admin:access",
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  "feed:read": "Lecture du feed",
  "profile:edit": "Edition du profil",
  "media:upload": "Uploads Cloudinary",
  "post:create": "Publication",
  "post:moderate": "Modération",
  "admin:access": "Admin",
};

export function formatPermission(permission: PermissionKey) {
  return PERMISSION_LABELS[permission] ?? permission;
}
