# Groupomania – Modernization Blueprint

## 1. Vision Produit
- **Positionnement** : réseau social d’entreprise moderne, mobile-first, collaboratif et sécurisé.
- **Objectifs portfolio** : démontrer maîtrise de la stack JS moderne (Next.js 14, TypeScript, Tailwind, Design System, API sécurisée, CI/CD), UX riche (profils, réactions, notifications, PWA).
- **Personas clés** : employés (feed, interactions sociales), modérateurs (outils admin), RH/communication (mise en avant d’annonces).

## 2. Architecture Cible
| Domaine | Stack / Outils | Notes |
| --- | --- | --- |
| **Frontend** | Next.js 14 (App Router) + React 19 + TypeScript + Tailwind + Radix UI | Rendu hybride (SSR/SSG/ISR), routing file-system. |
| **State/Data** | TanStack Query pour données serveur, Zustand pour état UI local, React Hook Form + Zod | Cache, optimistic updates, validation typée. |
| **Backend** | Node 20 + NestJS-like structure (Express + services) ou direct NestJS | Modules Auth, Posts, Users, Notifications. |
| **DB** | MongoDB Atlas (Mongoose + schemas zodifiés), potentiel Redis (caching sessions) | Collections : users, posts, comments, notifications, reactions. |
| **Stockage fichiers** | Cloudinary ou AWS S3 + CDN | Signature côté serveur, transformations d’images. |
| **Infra** | Docker compose (frontend, api, mongo, minio mock) + CI GitHub Actions + déploiement Vercel / Render | Tests, lint, build, scan. |
| **Observabilité** | Sentry (front/back), Log aggregation (Winston), metrics (OpenTelemetry) | Tableaux de bord pour portfolio. |

## 3. Modules Fonctionnels
1. **Authentification & Profil**
   - Login/signup multi-step, 2FA optionnel, récupération mot de passe.
   - Pages profil : bio, compétences, stats, timeline, champs custom.
   - Settings : préférences, notifications, sécurité.
2. **Feed & Interactions**
   - Création posts riche (éditeur TipTap, uploads drag & drop, planification).
   - Reactions multiples (like, applaud, idea) + commentaires threadés.
   - Recherche + filtres (tags, popularité, équipe).
   - Temps réel : websockets/SSE pour feed live, presence indicators.
3. **Admin/Moderation**
   - Dashboard modérateur (signalements, suppression, droits).
   - Logs d’audit, exports CSV, analytics.
4. **Notifications & PWA**
   - In-app notifications unifiées (toast + centre).
   - Push navigateur + e-mail.
   - Mode offline + caching via service worker.
5. **Pages marketing**
   - Landing, feature tour, blog, FAQ.
   - Brand kit, guidelines, assets.

## 4. Roadmap Technique
1. **Foundations**
   - Migrer repo vers monorepo (Turborepo ou Nx) : apps `web` (Next) et `api`.
   - Configurer TypeScript strict, ESLint (Airbnb + custom), Prettier, Husky + lint-staged.
   - Installer testing stack : Vitest/RTL, Playwright, Supertest.
2. **Frontend refactor**
   - Mettre en place design system avec Tailwind + tokens (light/dark).
   - Construire layout Next (App Router, metadata, fonts).
   - Implémenter modules auth + feed MVP avec TanStack Query.
3. **Backend refactor**
   - Réécrire API avec architecture services (controller/service/repo).
   - Ajouter validation Zod, middlewares erreurs/logging, rate limiting.
   - Brancher Cloudinary + gestion fichiers.
4. **Features avancées**
   - Reactions étendues, commentaires, profils, notifications.
   - Temps réel (Socket.IO/Nest Gateway) + worker queue (BullMQ).
5. **Ops & Portfolio**
   - Docker + docker-compose, GitHub Actions (lint/test/build/deploy).
   - Documentation (README, ADR, cas d’usage, captures).
   - Page portfolio détaillant la refonte, métriques, vidéos.

## 5. Décisions Techniques Clés
- **Monorepo** : facilite partage types (API/Front), scripts, CI unique.
- **Next.js vs Vite** : Next choisi pour SSR/ISR, SEO, API routes, middlewares.
- **TanStack Query** : remplace Redux global, meilleure DX pour data server.
- **Zod partout** : schémas partagés, dérive types, runtime validation.
- **Cloud Storage** : scalabilité + transformation automatique images.

## 6. Risques & Mitigation
- *Amplitude du scope* → découper en slices livrables ; prioriser MVP + showcase features.
- *Migration données* → scripts de migration, environnements staging.
- *Sécurité* → lint secrets, secrets manager, pentest de base.
- *Performance* → audits Lighthouse, tests charge k6, CDN assets.

## 7. Livrables Portfolio
- Application déployée (prod + staging) avec jeux de données démo.
- Storybook hébergé (Chromatic) montrant design system.
- Documentation : README enrichi, architecture.md, playbook modération, tests.
- Article Medium / page portfolio racontant la transformation (problèmes, solutions, stack).
- Captures haute-fidélité + vidéo Loom walkthrough.

---
Cette feuille de route servira de fil conducteur : chaque étape aura ses PRs, tickets et livrables afin de pouvoir montrer la progression et les choix techniques dans ton portfolio.
