import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "#vision" },
  { label: "Démo en direct", href: "#demo" },
  { label: "Parcours", href: "#parcours" },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          href="/"
        >
          Groupomania
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="hover:text-slate-900 dark:hover:text-slate-50">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="md" asChild>
            <Link href="/login">Accès employé</Link>
          </Button>
          <Button size="md" asChild>
            <Link href="#demo">Ouvrir la démo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
