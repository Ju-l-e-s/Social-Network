"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/use-auth";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Au moins 6 caractères"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (values: LoginValues) => {
    try {
      setErrorMessage(null);
      const user = await login(values);
      setUser(user);
      router.push("/app");
    } catch (error) {
      console.error(error);
      setErrorMessage("Identifiants incorrects ou API hors ligne.");
    }
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 px-4"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/groupomania.svg"
          alt="Groupomania logo"
          width={200}
          height={50}
        />
        <h1 className="text-3xl font-semibold text-text">Connexion</h1>
        <p className="text-text-muted">
          Utilisez un compte existant pour vous connecter.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl border border-stroke bg-white/90 p-8 shadow-card dark:bg-canvas-accent"
      >
        <form
          className="space-y-4"
          onSubmit={(event) => void submit(event)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-text" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-2xl border border-stroke/80 bg-transparent p-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60"
              placeholder="prenom@groupomania.com"
              {...register("email")}
            />
          </div>
          <div className="relative space-y-2">
            <label
              className="text-sm font-medium text-text"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full rounded-2xl border border-stroke/80 bg-transparent p-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60"
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 text-text-muted"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-stroke" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-canvas-accent px-2 text-text-muted">
              Ou continuer avec
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline">
            Google
          </Button>
          <Button variant="outline">
            GitHub
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-text-muted">
          Besoin d’un compte ?{" "}
          <Link href="/signup" className="text-brand hover:underline">
            S'inscrire
          </Link>
        </p>
      </motion.div>
      <p className="text-center text-sm text-text-muted">
        <Link href="/" className="text-brand hover:underline">
          Retour à la présentation
        </Link>
      </p>
    </motion.main>
  );
}
