"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const features = [
  {
    name: "Entrer dans la démo",
    description: "Cliquez sur “Ouvrir la démo”, le fil prérempli se charge.",
  },
  {
    name: "Publier & liker",
    description: "Ajoutez un post et likez quelques contenus.",
  },
  {
    name: "Modifier un profil",
    description:
      "Changez rôle, bio, avatar, observez badges et états de chargement.",
  },
  {
    name: "Tester les messages privés",
    description:
      "Ouvrez un thread, envoyez un message, vérifiez le rendu en clair/sombre.",
  },
];

export function Features() {
  return (
    <section id="parcours" className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <Badge tone="warning">Parcours démo</Badge>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            4 étapes, ≈ 3 minutes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Découvrez les fonctionnalités clés de Groupomania en suivant ces étapes simples.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                    <Check className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
