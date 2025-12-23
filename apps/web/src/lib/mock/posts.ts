import type { Post } from "@/lib/api/client";

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      firstName: "Camille",
      lastName: "Laurent",
      role: "Product Design Lead",
      avatarColor: "#fb7185",
    },
    message:
      "Lancement du programme \"Culture d'équipe\" 🧡 : rituels de feedback, mentoring croisé et nouveaux templates Notion. Qui veut contribuer aux ateliers ?",
    likes: 48,
    reactions: [
      { label: "👏", count: 12 },
      { label: "🔥", count: 6 },
    ],
    createdAt: "2024-05-13T09:24:00.000Z",
    tags: ["#culture", "#designops"],
  },
  {
    id: "2",
    author: {
      firstName: "Théo",
      lastName: "Nguyen",
      role: "Engineering Manager",
      avatarColor: "#a855f7",
    },
    message:
      "Nouvelle release back-end : feed en temps réel, file d'attente BullMQ pour les notifs et audits Sentry branchés ✅",
    likes: 67,
    reactions: [
      { label: "🚀", count: 20 },
      { label: "💡", count: 4 },
    ],
    createdAt: "2024-05-12T15:10:00.000Z",
    tags: ["#release", "#backend"],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    author: {
      firstName: "Maya",
      lastName: "Ben Amar",
      role: "People Partner",
      avatarColor: "#38bdf8",
    },
    message:
      "📣 Onboarding saison 2024 : 25 nouvelles recrues sur 3 pays. On recherche des buddies prêts à partager leurs tips – volunteer dans les commentaires ✨",
    likes: 34,
    reactions: [
      { label: "🤝", count: 8 },
      { label: "🌱", count: 5 },
    ],
    createdAt: "2024-05-10T08:00:00.000Z",
    tags: ["#onboarding", "#people"],
  },
];
