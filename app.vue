<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

// Sets <html lang>/dir and hreflang <link rel="alternate"> tags per locale —
// required for search engines to serve the right language variant.
const head = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: head.value.meta,
  // @vueuse/motion sets the initial state (opacity:0, translated) as an
  // inline style on the prerendered HTML, revealed by its IntersectionObserver
  // once JS runs. Without JS the reveal never fires, so this is a safety net
  // for that edge case, not a workaround for crawlers — search engines index
  // the text regardless of opacity.
  noscript: [
    {
      innerHTML:
        '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
    },
  ],
}))
</script>

<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <Toaster rich-colors position="top-right" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
