"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/lib/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const schema = z
  .object({
    firstName: z.string().min(2, "Prénom trop court"),
    lastName: z.string().min(2, "Nom trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Mot de passe trop court"),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type SignupValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setErrorMessage(null);
      await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      router.push("/login?signup=ok");
    } catch (error) {
      console.error(error);
      setErrorMessage("Impossible de créer le compte (email déjà utilisé ?)");
    }
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 px-4">
      <div className="rounded-3xl border border-stroke bg-white/90 p-8 shadow-card dark:bg-canvas-accent">
        <p className="text-sm uppercase tracking-[0.2em] text-text-muted">
          Groupomania
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-text">Inscription</h1>
        <form className="mt-8 space-y-4" onSubmit={(event) => void onSubmit(event)}>
          <div>
            <label className="text-sm font-medium" htmlFor="firstName">
              Prénom
            </label>
            <input
              id="firstName"
              className="mt-2 w-full rounded-2xl border border-stroke/80 bg-transparent p-3"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-warning">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="lastName">
              Nom
            </label>
            <input
              id="lastName"
              className="mt-2 w-full rounded-2xl border border-stroke/80 bg-transparent p-3"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-warning">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full rounded-2xl border border-stroke/80 bg-transparent p-3"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-warning">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="mt-2 w-full rounded-2xl border border-stroke/80 bg-transparent p-3"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-warning">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="confirm">
              Confirmation
            </label>
            <input
              id="confirm"
              type="password"
              className="mt-2 w-full rounded-2xl border border-stroke/80 bg-transparent p-3"
              {...register("confirm")}
            />
            {errors.confirm && (
              <p className="text-sm text-warning">{errors.confirm.message}</p>
            )}
          </div>
          {errorMessage && (
            <p className="text-sm text-warning">{errorMessage}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-text-muted">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-brand hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
