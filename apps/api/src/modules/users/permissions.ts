export const permissionValues = [
  "feed:read",
  "profile:edit",
  "media:upload",
  "post:create",
  "post:moderate",
  "admin:access",
] as const;

export type PermissionKey = (typeof permissionValues)[number];

export const defaultMemberPermissions: PermissionKey[] = [
  "feed:read",
  "profile:edit",
  "media:upload",
  "post:create",
];

export const defaultAdminPermissions: PermissionKey[] = Array.from(
  new Set<PermissionKey>([
    ...defaultMemberPermissions,
    "post:moderate",
    "admin:access",
  ]),
);

export function normalizePermissions(
  input: PermissionKey[] | undefined,
  isAdmin: boolean,
) {
  const allowed = new Set<PermissionKey>(permissionValues);
  const provided = (input ?? []).filter((permission): permission is PermissionKey =>
    allowed.has(permission as PermissionKey),
  );
  const base = provided.length > 0 ? provided : defaultMemberPermissions;
  const normalized = new Set<PermissionKey>(base);

  if (isAdmin) {
    defaultAdminPermissions.forEach((permission) => normalized.add(permission));
  } else {
    normalized.delete("admin:access");
  }

  return Array.from(normalized);
}

export const permissionLabels: Record<PermissionKey, string> = {
  "feed:read": "Lecture du feed",
  "profile:edit": "Edition du profil",
  "media:upload": "Uploads Cloudinary",
  "post:create": "Publication de posts",
  "post:moderate": "Modération",
  "admin:access": "Panel admin",
};
