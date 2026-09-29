<script setup lang="ts">
import { Monitor, Apple, Smartphone } from '@lucide/vue'

const { t } = useI18n()

const platforms = [
  { key: 'pc', icon: Monitor, href: '#' },
  { key: 'ios', icon: Apple, href: '#' },
  { key: 'android', icon: Smartphone, href: '#' },
]
</script>

<template>
  <section id="download" class="bg-base-200 px-6 py-24">
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-primary text-sm font-semibold">
        {{ t('download.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {{ t('download.title') }}
      </h2>
      <p class="text-base-content/70 mt-4">
        {{ t('download.subtitle') }}
      </p>

      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        <a
          v-for="(platform, index) in platforms"
          :key="platform.key"
          v-motion
          :href="platform.href"
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="card bg-base-100 border-base-300 hover:border-primary/40 border transition-colors"
        >
          <div class="card-body items-center gap-3 py-8">
            <div
              class="from-primary via-secondary to-accent flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br"
            >
              <component :is="platform.icon" class="text-primary-content h-6 w-6" />
            </div>
            <p class="font-semibold">
              {{ t(`hero.platforms.${platform.key}`) }}
            </p>
            <span class="btn btn-sm btn-outline btn-primary rounded-full">
              {{ t('download.cta') }}
            </span>
          </div>
        </a>
      </div>

      <p class="text-base-content/50 mt-8 text-sm">
        {{ t('download.note') }}
      </p>
    </div>
  </section>
</template>
