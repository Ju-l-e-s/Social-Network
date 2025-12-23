import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const roadmap = [
  {
    title: "1 — Ouvrir la démo",
    items: [
      "Cliquez sur “Ouvrir la démo”, le fil prérempli se charge.",
    ],
  },
  {
    title: "2 — Publier & liker",
    items: [
      "Ajoutez un post et likez quelques contenus.",
    ],
  },
  {
    title: "3 — Modifier un profil",
    items: [
      "Changez rôle, bio, avatar, observez les badges et états de chargement.",
    ],
  },
  {
    title: "4 — Tester les messages privés",
    items: [
      "Ouvrez un thread, envoyez un message, vérifiez le rendu en clair/sombre.",
    ],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto mt-24 max-w-6xl px-4">
      <div className="mb-10 text-center sm:text-left">
        <Badge tone="warning">Parcours démo</Badge>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Parcours démo (≈ 3 minutes)
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Tout est configuré pour tester : fil, messages privés, profils. Suivez les étapes et vous aurez une vue complète sans onboarding.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {roadmap.map((phase, index) => (
          <Card
            key={phase.title}
            className="relative flex flex-col gap-4 bg-white shadow-subtle dark:bg-slate-900"
          >
            <span className="absolute right-4 top-4 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
              Étape {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {phase.title}
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {phase.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
