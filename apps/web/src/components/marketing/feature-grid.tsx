import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ComponentType } from "react";
import { Bot, LayoutDashboard, MessageCircle, ShieldCheck, Users } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  badge: string;
  accent?: "brand" | "emerald" | "amber";
};

const quickLinks = [
  {
    title: "Fil d’actualité",
    description: "Publier, liker, commenter, ajouter une image.",
  },
  {
    title: "Messages privés",
    description: "Threads prêts, envoi instantané, auto-scroll.",
  },
  {
    title: "Profils",
    description: "Rôle, bio, avatar, badges et équipes.",
  },
  {
    title: "Équipe simulée",
    description: "Tout est déjà peuplé pour simuler une vraie équipe.",
  },
];

const modules: Feature[] = [
  {
    title: "Fil & réactions",
    description: "Posts, likes, commentaires, images et fallback visuel si l’API images tombe.",
    icon: LayoutDashboard,
    badge: "Fil + likes",
  },
  {
    title: "Messages privés",
    description: "Threads préremplis, envoi local, auto-scroll et bulles lisibles en clair comme en sombre.",
    icon: MessageCircle,
    badge: "MP",
    accent: "amber",
  },
  {
    title: "Profils & équipes",
    description: "Rôles, départements, badges, permissions visibles pour membres et admins.",
    icon: Users,
    badge: "Profils",
    accent: "brand",
  },
  {
    title: "Gouvernance & sécurité",
    description: "Rappels visuels des droits, sections dédiées à la modération et à la sécurité.",
    icon: ShieldCheck,
    badge: "Sécurité",
  },
  {
    title: "Automations légères",
    description: "Pré-chargement, états de chargement, transitions fluides pour les actions.",
    icon: Bot,
    badge: "UX",
  },
];

export function FeatureGrid() {
  return (
    <section id="design" className="mx-auto mt-24 max-w-6xl px-4">
      <div className="mb-10 flex flex-col gap-3 text-center sm:text-left">
        <Badge>Ce que vous pouvez tester</Badge>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Accédez directement au fil, aux MP et aux profils.
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Tout est déjà peuplé pour simuler une vraie équipe.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((item) => (
          <Card
            key={item.title}
            className="flex flex-col gap-2 bg-white dark:bg-slate-900"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 text-center sm:text-left">
        <Badge tone="success">Modules inclus</Badge>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Fil, messages privés, profils, sécurité et automations déjà câblés.
        </h3>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map(({ title, description, icon: Icon, badge, accent }) => (
          <Card
            key={title}
            className="group flex flex-col gap-4 bg-white transition hover:-translate-y-1 hover:shadow-card dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <Badge
                tone={accent === "amber" ? "warning" : accent === "emerald" ? "success" : "neutral"}
              >
                {badge}
              </Badge>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Démo directe
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-inner dark:border-slate-700 dark:bg-slate-800"
                aria-hidden
              >
                <Icon className="h-6 w-6 text-brand" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
