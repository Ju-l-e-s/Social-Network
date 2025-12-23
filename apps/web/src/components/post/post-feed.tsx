"use client";

import { usePosts } from "@/hooks/use-posts";
import { PostCard } from "@/components/post/post-card";
import { PostComposer } from "@/components/post/post-composer";
import { motion, AnimatePresence } from "framer-motion";
import { ApiForbiddenError, ApiUnauthorizedError } from "@/lib/api/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHasPermission } from "@/hooks/use-permission";

export function PostFeed() {
  const {
    data: posts,
    isLoading,
    error,
  } = usePosts();
  const isUnauthorized = error instanceof ApiUnauthorizedError;
  const isForbidden = error instanceof ApiForbiddenError;
  const canPublish = useHasPermission("post:create");

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {!isUnauthorized && !isForbidden && canPublish && <PostComposer />}
      {!isUnauthorized && !isForbidden && !canPublish && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Le feed est en lecture seule pour ton rôle actuel.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Demande un accès &ldquo;Publication&rdquo; ou passe par un admin pour
            obtenir les permissions nécessaires.
          </p>
        </div>
      )}
      {isForbidden && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Accès au feed restreint.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ton profil n&apos;a pas encore la permission &ldquo;Lecture du
            feed&rdquo;. Contacte un admin pour débloquer l&apos;accès.
          </p>
        </div>
      )}
      {isUnauthorized && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-800 dark:bg-slate-900">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Connecte-toi pour voir le vrai feed interne.
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Les données mockées ont été désactivées pour que tu puisses tester la
            nouvelle API sécurisée.
          </p>
          <Button className="mt-4" variant="secondary" asChild>
            <Link href="/login">Aller à la connexion</Link>
          </Button>
        </div>
      )}
      {isLoading && (
        <div className="space-y-4 rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Chargement du feed...
        </div>
      )}
      {!isUnauthorized && !isForbidden && (
        <AnimatePresence initial={false}>
          {posts?.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}
