<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'pricing', href: '#pricing' },
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
    class="bg-base-100/80 sticky top-0 z-20 backdrop-blur transition-transform duration-300"
    :class="{ '-translate-y-full': isHidden }"
  >
    <div class="navbar mx-auto max-w-6xl">
      <div class="flex-1">
        <NuxtLink :to="localePath('/')" class="font-display text-lg font-bold">
          Landing Page Base
        </NuxtLink>
      </div>
      <nav class="hidden gap-6 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.key"
          :href="link.href"
          class="link link-hover text-sm"
        >
          {{ t(`nav.${link.key}`) }}
        </a>
      </nav>
      <div class="flex flex-none items-center gap-2 pl-4">
        <LandingLocaleSwitcher />
        <LandingThemeSwitcher />
        <a
          href="#contact"
          class="btn btn-sm from-primary via-secondary to-accent text-primary-content rounded-full border-none bg-linear-to-r"
        >
          {{ t('nav.cta') }}
        </a>
      </div>
    </div>
  </header>
</template>
