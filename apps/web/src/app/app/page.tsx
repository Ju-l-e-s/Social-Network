import { Navigation } from "@/components/layout/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { PostFeed } from "@/components/post/post-feed";
import { Badge } from "@/components/ui/badge";
import { ProfileHeader } from "@/components/profile/profile-header";
import { MessageCenter } from "@/components/messages/message-center";

export default function AppExperience() {
  return (
    <>
      <Navigation />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
        <div className="space-y-3">
          <Badge tone="success">Espace collaboratif</Badge>
          <h1 className="text-3xl font-semibold text-text">
            Aperçu du feed interne Groupomania
          </h1>
          <p className="max-w-2xl text-text-muted">
            Fil interne, profils et messagerie privée en mode démo. Publie un
            post, ajoute une image et discute dans les messages sans créer de
            compte.
          </p>
        </div>
        <ProfileHeader />
        <PostFeed />
        <MessageCenter />
      </main>
      <SiteFooter />
    </>
  );
}
