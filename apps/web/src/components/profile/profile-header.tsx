"use client";

import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useHasPermission } from "@/hooks/use-permission";
import { formatPermission, type PermissionKey } from "@/lib/permissions";

type ProfileFormState = {
  role: string;
  department: string;
  location: string;
  bio: string;
  avatarColor: string;
  avatarUrl: string;
  skills: string;
};

export function ProfileHeader() {
  const { data, isLoading, error } = useProfile();
  const canEditProfile = useHasPermission("profile:edit");
  const updateProfile = useUpdateProfile();
  const uploadImage = useUploadImage();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileFormState | null>(null);

  useEffect(() => {
    if (data) {
      setForm({
        role: data.role,
        department: data.department,
        location: data.location,
        bio: data.bio,
        avatarColor: data.avatarColor,
        avatarUrl: data.avatarUrl ?? "",
        skills: data.skills.join(", "),
      });
    }
  }, [data]);

  const initials = useMemo(() => {
    if (!data) return "";
    const first = data.firstName?.[0] ?? "";
    const last = data.lastName?.[0] ?? "";
    return (first + last || "G").toUpperCase();
  }, [data]);

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Chargement du profil…</p>
      </section>
    );
  }

  if (error || !data || !form) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-900 text-red-600 dark:text-red-400">
          Impossible de charger le profil. Vérifiez votre connexion ou
          réessayez plus tard.
        </p>
      </section>
    );
  }

  const avatarPreview = form.avatarUrl || data.avatarUrl;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => (current ? { ...current, [name]: value } : current));
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const uploadedUrl = await uploadImage.mutateAsync(file);
    setForm((current) =>
      current ? { ...current, avatarUrl: uploadedUrl } : current,
    );
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    await updateProfile.mutateAsync({
      role: form.role,
      department: form.department,
      location: form.location,
      bio: form.bio,
      avatarColor: form.avatarColor,
      avatarUrl: form.avatarUrl || null,
      skills,
    });
    setIsEditing(false);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt={`${data.firstName} ${data.lastName}`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold text-white"
                style={{ backgroundColor: form.avatarColor || "#6366f1" }}
              >
                {initials}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {data.firstName} {data.lastName}
              </p>
              {data.isAdmin && (
                <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand dark:bg-brand/25">
                  Admin
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {form.role} · {form.department} · {form.location}
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="md"
          disabled={!canEditProfile}
          onClick={() => setIsEditing((value) => !value)}
        >
          {isEditing ? "Fermer" : "Modifier mon profil"}
        </Button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-slate-800 dark:text-slate-100">{form.bio}</p>
          {data.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <PermissionsPanel permissions={data.permissions} />
      </div>

      {isEditing && (
        <form
          onSubmit={(event) => void submit(event)}
          className="mt-6 space-y-4 rounded-2xl border border-dashed border-slate-300 p-4 dark:border-slate-700"
        >
          {updateProfile.isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Échec de l&apos;enregistrement. Merci de réessayer (la requête peut
              être lente) ou de contacter l&apos;équipe IT si le problème persiste.
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Rôle"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
            <Field
              label="Département"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            <Field
              label="Localisation"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Avatar</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="color"
                  name="avatarColor"
                  value={form.avatarColor}
                  onChange={handleChange}
                  className="h-10 w-16 cursor-pointer rounded border border-slate-300 bg-transparent dark:border-slate-600"
                />
                <label className="cursor-pointer text-sm font-medium text-brand">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(event) => void handleAvatarUpload(event)}
                  />
                  {uploadImage.isPending
                    ? "Upload en cours..."
                    : "Uploader une image"}
                </label>
                {form.avatarUrl && (
                  <button
                    type="button"
                    className="text-sm text-slate-500 underline dark:text-slate-400"
                    onClick={() =>
                      setForm((current) =>
                        current ? { ...current, avatarUrl: "" } : current,
                      )
                    }
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Skills (séparés par une virgule)</label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function Field({ label, name, value, onChange }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-800 dark:text-slate-100" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />
    </div>
  );
}

function PermissionsPanel({ permissions }: { permissions: PermissionKey[] }) {
  if (!permissions.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Permissions
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {permissions.map((permission) => (
          <span
            key={permission}
            className="rounded-full bg-white px-3 py-1 font-medium text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
          >
            {formatPermission(permission)}
          </span>
        ))}
      </div>
    </div>
  );
}
