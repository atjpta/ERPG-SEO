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
  <section v-motion-fade-visible class="relative overflow-hidden px-6 py-24 text-center sm:py-32">
    <div aria-hidden="true" class="bg-gradient-brand absolute inset-0 -z-10" />

    <img src="/logo2.png" alt="ERPG" class="mx-auto h-16 w-auto sm:h-20" />

    <span
      class="text-gradient border-base-300 mt-8 inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold"
    >
      {{ t('hero.eyebrow') }}
    </span>
    <h1 class="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
      {{ t('hero.title') }}
    </h1>
    <p class="text-base-content/70 mx-auto mt-6 max-w-2xl text-lg">
      {{ t('hero.subtitle') }}
    </p>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
      <a
        href="#download"
        class="btn btn-lg from-primary via-secondary to-accent text-primary-content rounded-full border-none bg-linear-to-r"
      >
        {{ t('hero.primaryCta') }}
      </a>
      <a href="#features" class="btn btn-lg btn-ghost rounded-full">{{ t('hero.secondaryCta') }}</a>
    </div>

    <div class="mt-12 flex flex-col items-center gap-3">
      <p class="text-base-content/50 text-xs font-semibold tracking-widest uppercase">
        {{ t('hero.platformsLabel') }}
      </p>
      <div class="text-base-content/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span
          v-for="platform in platforms"
          :key="platform.key"
          class="flex items-center gap-1.5 text-sm"
        >
          <component :is="platform.icon" class="h-4 w-4" />
          {{ t(`hero.platforms.${platform.key}`) }}
        </span>
      </div>
    </div>
  </section>
</template>
