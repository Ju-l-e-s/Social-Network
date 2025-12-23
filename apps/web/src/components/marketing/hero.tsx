import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="vision" className="mx-auto mt-10 max-w-6xl px-4">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="success">Démo directe</Badge>
            <Badge>Pas de compte</Badge>
            <Badge tone="warning">Mode sombre</Badge>
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Groupomania – Démo de réseau social d’entreprise
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 lg:max-w-2xl">
            Fil, messages privés et profils déjà remplis. Testez l’app sans compte ni configuration.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/app">
                Ouvrir la démo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#design">Parcours démo</Link>
            </Button>
            <span className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100">
              <Sparkles className="h-4 w-4 text-brand" />
              Accès direct · ≈ 3 minutes · Mode sombre géré par le système
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
