<script setup lang="ts">
import { Monitor, Apple, Smartphone } from '@lucide/vue'

const { t } = useI18n()

const platforms = [
  { key: 'pc', icon: Monitor },
  { key: 'ios', icon: Apple },
  { key: 'android', icon: Smartphone },
]
</script>

<template>
  <section v-motion-fade-visible class="relative overflow-hidden px-6 py-24 text-center sm:py-20">
    <div aria-hidden="true" class="bg-gradient-brand absolute inset-0 -z-10" />

    <img src="/logo2.png" alt="ERPG" class="mx-auto h-16 w-auto sm:h-44" />

    <span
      class="text-gradient bg-base-200 mt-8 inline-flex items-center px-4 py-1 text-sm font-semibold lg:text-base"
    >
      {{ t('hero.eyebrow') }}
    </span>
    <h1 class="mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
      {{ t('hero.title') }}
    </h1>
    <p class="text-base-content/70 mx-auto mt-6 max-w-2xl text-lg lg:text-xl">
      {{ t('hero.subtitle') }}
    </p>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-5">
      <a
        href="#download"
        class="btn btn-lg from-primary via-secondary to-accent text-primary-content shadow-pixel border-none bg-linear-to-r"
      >
        {{ t('hero.primaryCta') }}
      </a>
      <a href="#features" class="btn btn-lg bg-base-200 shadow-pixel border-none">{{
        t('hero.secondaryCta')
      }}</a>
    </div>

    <div class="mt-12 flex flex-col items-center gap-3">
      <p class="text-base-content/50 text-xs font-semibold tracking-widest uppercase lg:text-sm">
        {{ t('hero.platformsLabel') }}
      </p>
      <div class="text-base-content/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span
          v-for="platform in platforms"
          :key="platform.key"
          class="flex items-center gap-1.5 text-sm lg:text-base"
        >
          <component :is="platform.icon" class="h-4 w-4" />
          {{ t(`hero.platforms.${platform.key}`) }}
        </span>
      </div>
    </div>
  </section>
</template>
