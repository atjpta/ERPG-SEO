import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@vueuse/nuxt', '@vueuse/motion/nuxt', '@nuxtjs/i18n', '@nuxtjs/seo'],

  // UI primitives (v-button, v-modal...) resolve by filename only, e.g.
  // `v-button.vue` -> <VButton>. Everything else keeps the default
  // directory-prefixed name, e.g. `landing/hero-section.vue` -> <LandingHeroSection>.
  components: [{ path: '~/components/ui', pathPrefix: false }, '~/components'],
  devtools: { enabled: true },

  app: {
    // Set by the GitHub Pages deploy workflow to "/<repo-name>/" since project
    // pages are served from a subpath.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Google Fonts — Inter (body) + Sora (headings, see main.css). Loaded
        // as a <link>, not a CSS @import, so it fetches in parallel instead
        // of blocking on the stylesheet and doesn't trip Lightning CSS's
        // "@import must precede other rules" ordering check.
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700;800&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // https://nuxtseo.com — fills in sitemap.xml, robots.txt, and JSON-LD
  // schema.org from `site` below. Set the real production URL before deploying.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: 'Landing Page Base',
    defaultLocale: 'en',
  },
  compatibilityDate: '2026-01-01',

  // Static generation (`nuxt generate`) — every route is prerendered to real
  // HTML at build time, so crawlers get full content with no JS execution
  // needed. Deploys as plain static files (see .github/workflows/deploy.yml).
  nitro: {
    preset: 'static',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
      },
    },
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    vueI18n: 'i18n.config.ts',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'vi', language: 'vi-VN', name: 'Tiếng Việt' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },

  // Dynamic per-page OG images need sharp/playwright — out of scope for a
  // lean base template. Ship a static `public/og-image.png` (1200x630)
  // instead and set it per-page via `useSeoMeta({ ogImage: ... })`.
  ogImage: {
    enabled: false,
  },
})
