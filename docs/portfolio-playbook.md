+++
# Portfolio Playbook – Groupomania

## Story Arc
1. **Problème** : application héritée React 18 + Express non sécurisée, UI datée, absence de CI/CD.
2. **Hypothèse produit** : transformer Groupomania en plateforme interne premium pour mettre en valeur les compétences fullstack/UX.
3. **Solution** :
   - Nouvelle interface Next.js 14 (App Router, design system Tailwind, data layer TanStack Query).
   - API Express + TypeScript structurée (Zod, middlewares typed, MongoDB).
   - Chaîne qualité (ESLint strict, TS, CI GitHub Actions) + docs.
4. **Impact attendu** : démo en ligne + Storybook + article Medium montrant le processus complet.

## Captures & Assets (à produire)
- Hero marketing + feed authentifié (mode clair/sombre).
- Flow onboarding (login/signup) – mobile & desktop.
- Modules clés : création de post riche, notifications, dashboards modération.
- Screen CI (Actions passing), logs API, diagrammes architecture.
- Graphique des métriques (temps réponse API, Web Vitals).

## Démo & Pitch
- **Live URL** : Vercel pour `web/`, Render/Atlas pour `api/`.
- **Données démo** : script seed (`npm run seed`) permettant d’injecter profils/posts cohérents.
- **Walkthrough vidéo** : 3–4 minutes (Contexte ➜ Stack ➜ UX ➜ Résultats ➜ Next steps).

## Article / Case Study plan
1. **Introduction** – pourquoi moderniser Groupomania, enjeux business.
2. **Diagnostic** – limites identifiées (techniques, UX, ops).
3. **Architecture cible** – diagrammes, choix stack, trade-offs.
4. **Delivery** – highlight de features (feed real-time, design system, PWA).
5. **Qualité & Ops** – tests, CI, monitoring.
6. **Résultats / apprentissages** – métriques, retours utilisateurs, backlog suivant.

## Backlog de finition
- Brancher `web` sur `api` (auth/session, posts, upload Cloudinary).
- Storybook + Chromatic pour le design system.
- Tests : Vitest (unit), Supertest (API), Playwright (E2E).
- Docker + docker-compose + scripts seeds.
- Landing marketing + page FAQ + resources kit.

Utilise ce playbook pour piloter la fin de projet et raconter l’histoire dans ton portfolio sans mentionner d’outils externes.
