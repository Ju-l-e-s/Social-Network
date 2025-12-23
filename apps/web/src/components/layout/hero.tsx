"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 sm:pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge tone="success">Démo directe</Badge>
            <Badge>Pas de compte</Badge>
            <Badge tone="warning">Mode sombre via toggle</Badge>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            Le réseau social d'entreprise qui connecte vos équipes.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Groupomania est une plateforme moderne et intuitive pour la communication interne. Partagez, échangez et collaborez en toute simplicité.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#demo">
                Voir la démo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#parcours">Comment ça marche ?</Link>
            </Button>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Link href="#demo">
              <div className="animate-bounce rounded-full bg-white/20 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-900 dark:text-slate-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-16"
        >
          <div className="aspect-w-16 aspect-h-9">
            <video
              className="rounded-2xl shadow-2xl"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
