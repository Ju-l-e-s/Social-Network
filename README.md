# Groupomania – refonte full-stack

J’ai repris le projet historique pour moderniser le réseau social d’entreprise maison. Tout tourne dans un monorepo npm (Next.js 14 côté web, Express TypeScript côté API) avec une stack moderne et testable.

## Stack

- **Web** (`apps/web`) : Next.js App Router, React 19, Tailwind 4, TanStack Query, Zustand, Storybook, Vitest + Playwright.
- **API** (`apps/api`) : Express 4 + TypeScript strict, Mongo/Mongoose, Zod, Cloudinary uploads, JWT + middlewares custom.
- **Qualité** : ESLint flat, GitHub Actions (lint + typecheck), scripts seeds pour les démos.

## Installation

```bash
nvm use 20.19.0
npm install    # installe les workspaces

# Front
cd apps/web
cp .env.example .env.local
npm run dev

# API
cd apps/api
cp .env.example .env   # MONGODB_URI + TOKEN_KEY obligatoires
npm run seed           # jeux de données de démo
npm run dev
```

Ports par défaut : web `http://localhost:3000`, API `http://localhost:8000` (healthcheck `/api/health`). La page `/login` consomme directement l’API.

### Comptes de démo

Après `npm run seed`, tu obtiens :

- `camille@groupomania.com` / `Test1234` (admin design ops)
- `theo@groupomania.com` / `Test1234` (member engineering)

Sinon, l’API expose toujours `POST /api/auth/signup` :

```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Camille","lastName":"Laurent","email":"camille@groupomania.com","password":"Test1234"}'
```

## Scripts utiles

- `npm run dev:web` / `npm run dev:api`
- `apps/web`: `npm run lint`, `npm run test:unit`, `npm run test:e2e`, `npm run storybook`
- `apps/api`: `npm run typecheck`, `npm run build`, `npm run seed`

## Roadmap perso

- ✅ Migration React → Next.js + design system Tailwind
- ✅ Nouvelle API modulaire (auth/posts/profils + uploads Cloudinary)
- ✅ Permissions fines côté API/UI (lecture, post, upload, admin)
- 🔜 Modération, notifications temps réel, Docker + CI complète
