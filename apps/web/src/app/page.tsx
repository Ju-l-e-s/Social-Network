import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileHeader } from "@/components/profile/profile-header";
import { PostFeed } from "@/components/post/post-feed";
import { MessageCenter } from "@/components/messages/message-center";
import { Hero } from "@/components/layout/hero";
import { Features } from "@/components/layout/features";

export default function Home() {
  return (
    <>
      <div className="scroll-container">
        <main className="pb-16 pt-6">
          <div className="scroll-section">
            <Hero />
          </div>

          <section
            id="demo"
            className="scroll-section mx-auto mt-14 max-w-6xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <Badge>Démo en direct</Badge>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Fil, messages privés et profils sur la même page.
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Publiez, likez, envoyez un message et changez un profil sans quitter l’accueil.
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/login">Accès employé</Link>
              </Button>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <ProfileHeader />
                <PostFeed />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Messages privés
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Threads prêts, envoi instantané, auto-scroll et bulles lisibles en clair/sombre.
                </p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <MessageCenter />
                </div>
              </div>
            </div>
          </section>

          <div className="scroll-section">
            <Features />
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
