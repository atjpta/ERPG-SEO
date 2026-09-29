<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'download', href: '#download' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'faq', href: '#faq' },
]

// Hide the header while scrolling down, reveal it again on scroll up — always
// visible while still near the top so it doesn't flicker on tiny scroll jitter.
const { directions, arrivedState } = useScroll(window, { throttle: 100 })
const isHidden = computed(() => !arrivedState.top && directions.bottom)
</script>

<template>
  <header
    class="bg-base-100 sticky top-0 z-20 transition-transform duration-300"
    :class="{ '-translate-y-full': isHidden }"
  >
    <div class="navbar mx-auto max-w-6xl">
      <div class="flex-1">
        <NuxtLink :to="localePath('/')" aria-label="ERPG" class="flex items-center">
          <img src="/logo2.png" alt="ERPG" class="h-8 w-auto">
        </NuxtLink>
      </div>
      <nav class="hidden gap-6 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="localePath('/') + link.href"
          class="link link-hover text-sm lg:text-base"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>
      <div class="flex flex-none items-center gap-2 pl-4">
        <LandingLocaleSwitcher />
        <LandingThemeSwitcher />
        <NuxtLink
          :to="localePath('/') + '#download'"
          class="btn btn-sm from-primary via-secondary to-accent text-primary-content shadow-pixel border-none bg-linear-to-r"
        >
          {{ t('nav.cta') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
