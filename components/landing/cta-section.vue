<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    v-motion-fade-visible
    class="from-primary via-secondary to-accent text-primary-content bg-linear-to-br px-6 py-20 text-center"
  >
    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
      {{ t('cta.title') }}
    </h2>
    <p class="mt-4 opacity-90 lg:text-lg">
      {{ t('cta.subtitle') }}
    </p>
    <a
      href="#download"
      class="btn btn-lg active:shadow-none active:translate-x-1 active:translate-y-1 mt-8 border-none bg-white text-black shadow-[4px_4px_0_0_#000] transition-transform hover:bg-white/90"
    >{{ t('cta.button') }}</a>
    <p class="mt-4 text-sm opacity-80 lg:text-base">
      {{ t('hero.platformsLabel') }} {{ t('hero.platforms.pc') }} · {{ t('hero.platforms.ios') }} ·
      {{ t('hero.platforms.android') }}
    </p>
  </section>
</template>
