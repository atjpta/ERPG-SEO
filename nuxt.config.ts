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
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        // The pixel font (DeArPix) is self-hosted from public/fonts/ and
        // declared via @font-face in main.css — no Google Fonts <link>
        // needed here.
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // https://nuxtseo.com — fills in sitemap.xml, robots.txt, and JSON-LD
  // schema.org from `site` below. Set the real production URL before deploying.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: 'ERPG',
    defaultLocale: 'en',
  },

  runtimeConfig: {
    public: {
      // Web3Forms access key tied to the destination inbox — get one free at
      // https://web3forms.com (no account needed, key is emailed instantly).
      // Exposed to the client because the contact form submits directly to
      // Web3Forms' API — there's no backend in this static site to hide it
      // behind, and Web3Forms access keys are meant to be public (like a
      // Stripe publishable key), rate-limited and domain-restricted on
      // their end rather than secret.
      web3formsKey: '',
    },
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
