# Landing Page Base

A batteries-included base template for SEO-driven landing pages: **Nuxt 4 + TypeScript**, static generation (`nuxt generate`), Tailwind CSS 4 + DaisyUI 5, i18n (English/Vietnamese), and the [Nuxt SEO](https://nuxtseo.com) module suite (sitemap, robots.txt, JSON-LD) wired up out of the box.

Use it as the starting point for a new landing page: clone, swap the copy in `i18n/locales/`, reorder or restyle the sections in `components/landing/`, and ship.

## Why static generation

This is a **statically generated** site (`nuxt generate`), not a client-rendered SPA. Every route is prerendered to full HTML at build time — search engine crawlers get complete content immediately, with no JavaScript execution required. That's the difference between "SEO meta tags on an empty shell" and actually-crawlable pages.

If a page later needs data that can't be known at build time (a live inventory count, a personalized greeting), fetch it client-side inside that component — the rest of the page stays static.

## Stack

- Nuxt 4 + Vue 3 + TypeScript
- Static generation (`nitro.preset: 'static'`) — deploys as plain files, no Node server required
- Tailwind CSS 4 + DaisyUI 5
- `@nuxtjs/i18n` (locales in `i18n/locales/`)
- `@nuxtjs/seo` (sitemap, robots.txt, JSON-LD schema.org — configured via `site` in `nuxt.config.ts`)
- `@tanstack/vue-form` + Zod (the contact form's validation pattern)
- `@vueuse/core` / `@vueuse/nuxt`
- DaisyUI theme switching via `theme-change`, persisted per visitor
- Package manager: **yarn**

## Getting started

Requires Node.js LTS (**>= 22**). `.nvmrc` is set to `lts/*`, so `nvm use` picks it up automatically.

```bash
git clone git@github.com:atjpta/nuxt-bootstrap-boilerplate.git my-landing-page
cd my-landing-page
yarn install
cp .env.example .env
yarn dev
```

Or use it as a starting point for a new project instead of cloning history:

```bash
npx degit atjpta/nuxt-bootstrap-boilerplate my-landing-page
cd my-landing-page
yarn install
cp .env.example .env
yarn dev
```

Before deploying, set the real production URL — it drives the sitemap, canonical URLs, and Open Graph tags:

```bash
# .env
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Agent skills

This project ships with [Nuxt/Vue/Vite best-practice skills](https://skills.sh/onmax/nuxt-skills) pinned in `skills-lock.json`, for coding agents (Claude Code and others) that support the [Skills CLI](https://skills.sh) — covers `nuxt`, `vue`, `vite`, `nitro`, `nuxt-i18n`, `nuxt-seo`, `nuxt-modules`, and `pinia`. The vendored content itself (`.agents/`, `.claude/skills/`) is gitignored — restore it after cloning with:

```bash
npx skills experimental_install
```

## What's included

- **Sections** (`components/landing/`) — hero, features, testimonials, pricing, FAQ, CTA, and a validated contact form. Each reads its copy from i18n keys; reorder them in `pages/index.vue` or split them across multiple pages.
- **Header/footer** — sticky header with in-page anchor nav, locale switcher, and theme switcher; a simple footer.
- **UI kit** (`components/ui/`) — a `v-button` primitive following the "thin DaisyUI wrapper, not an abstraction" approach: pass DaisyUI modifier classes directly (`class="btn-primary btn-sm"`), no `variant`/`size` props.
- **Contact form** — `@tanstack/vue-form` + Zod via `composables/useZodForm.ts`, with error messages mapped through i18n (`validation.*` keys). The submit handler is a placeholder — wire it to your backend or a form service (Formspree, Resend, etc.).
- **Theming** — DaisyUI themes (`light`, `dark`, `corporate` by default — edit the list in `assets/css/main.css`) switchable at runtime, persisted to `localStorage` via `theme-change`.
- **i18n** — English and Vietnamese out of the box; add a key to both locale files together. `strategy: 'prefix_except_default'` means English is unprefixed (`/`) and other locales are prefixed (`/vi`).
- **SEO** — `useSeoMeta` per page, `useLocaleHead()` for `<html lang>` + hreflang alternates, and `@nuxtjs/seo` auto-generating `sitemap.xml`, `robots.txt`, and JSON-LD from the `site` config. See [CLAUDE.md](./CLAUDE.md) for the full set of conventions this project follows.

## Scripts

| Command          | Description                                     |
| ---------------- | ----------------------------------------------- |
| `yarn dev`       | Start the dev server                            |
| `yarn generate`  | Static-generate the site to `.output/public`    |
| `yarn preview`   | Preview the generated static output             |
| `yarn build`     | Build for a Node server (SSR) instead of static |
| `yarn lint`      | Lint and auto-fix                               |
| `yarn format`    | Format with Prettier                            |
| `yarn typecheck` | Type-check without emitting                     |

## Commit convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope?): subject`.

| Type       | Use for                                        |
| ---------- | ---------------------------------------------- |
| `feat`     | a new feature                                  |
| `fix`      | a bug fix                                      |
| `docs`     | documentation only                             |
| `style`    | formatting, no code change                     |
| `refactor` | code change that's neither a fix nor a feature |
| `perf`     | performance improvement                        |
| `test`     | adding or fixing tests                         |
| `build`    | build system or dependencies                   |
| `ci`       | CI configuration                               |
| `chore`    | anything else (tooling, config)                |

```
feat(hero): add secondary CTA button
fix(contact): correct email validator message
```

This is enforced automatically — see **Git hooks** below.

## Git hooks

[Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) + [commitlint](https://commitlint.js.org/) run on every commit (set up automatically by `yarn install` via the `prepare` script):

- **`pre-commit`** — runs `eslint --fix` and `prettier --write` on staged files only.
- **`commit-msg`** — rejects commit messages that don't follow the convention above.

## CI/CD

Two GitHub Actions workflows live in `.github/workflows/`:

- **`ci.yml`** — on every push/PR to `main`/`master`: install, `yarn lint:check`, `yarn typecheck`, `yarn generate`.
- **`deploy.yml`** — on every push to `main`/`master`: static-generates the site (with `NUXT_APP_BASE_URL`/`NUXT_PUBLIC_SITE_URL` set for GitHub Pages' subpath hosting) and deploys `.output/public/` via the official Pages Actions.

**One-time setup after your first push:** in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. After that, every push to `main`/`master` redeploys automatically.

Deploying to a custom domain or a different host (Vercel, Netlify, Cloudflare Pages) instead of GitHub Pages: drop the `NUXT_APP_BASE_URL` override (those hosts serve from the domain root) and point the host at `yarn generate` / `.output/public`.

## Docker

This project runs in Docker. The `Dockerfile` is a two-stage build: a Node stage runs `yarn generate` (so `NUXT_PUBLIC_SITE_URL`/`NUXT_APP_BASE_URL` are baked into the prerendered HTML at build time, same as any other deploy target), then an `nginx:alpine` stage serves the static output from `.output/public` — no Node server runs at runtime.

```bash
docker build -t erpg-seo --build-arg NUXT_PUBLIC_SITE_URL=https://your-domain.com .
docker run -p 8080:80 erpg-seo
```

Or with Compose (reads `NUXT_PUBLIC_SITE_URL` from the environment, defaults to `https://example.com`):

```bash
NUXT_PUBLIC_SITE_URL=https://your-domain.com docker compose up --build
```

The site is then served at `http://localhost:8080`. `docker/nginx.conf` serves each prerendered route as a real file (no SPA fallback), maps `404.html` to real 404 responses, and long-caches the hashed `_nuxt/` assets.

### Health check (Coolify)

The image exposes `GET /health` — a fixed `200 ok` response with no disk I/O, and the `Dockerfile` declares a `HEALTHCHECK` against it, which `docker ps` and Coolify both read directly. If deploying on [Coolify](https://coolify.io), set **Health Check Path** to `/health` in the app's settings (Coolify's default `/` would also work here since every route is a real prerendered file, but `/health` avoids serving a full page just to check liveness).

## License

[MIT](./LICENSE)
