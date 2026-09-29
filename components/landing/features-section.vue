<script setup lang="ts">
import { Swords, Globe, Sparkles, Shield, Users, Smartphone } from '@lucide/vue'

const { t } = useI18n()

const features = [
  { key: 'combat', icon: Swords },
  { key: 'world', icon: Globe },
  { key: 'pixelArt', icon: Sparkles },
  { key: 'classes', icon: Shield },
  { key: 'guilds', icon: Users },
  { key: 'crossplay', icon: Smartphone },
]
</script>

<template>
  <section id="features" class="bg-base-200 px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-primary text-sm font-semibold lg:text-base">
          {{ t('features.eyebrow') }}
        </p>
        <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {{ t('features.title') }}
        </h2>
        <p class="text-base-content/70 mt-4 lg:text-lg">
          {{ t('features.subtitle') }}
        </p>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="feature.key"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 80 } }"
          class="card bg-base-100 hover-shadow-pixel"
        >
          <div class="card-body gap-3">
            <div
              class="from-primary via-secondary to-accent flex h-11 w-11 items-center justify-center bg-linear-to-br"
            >
              <component :is="feature.icon" class="text-primary-content h-5 w-5" />
            </div>
            <h3 class="card-title text-base lg:text-lg">
              {{ t(`features.items.${feature.key}.title`) }}
            </h3>
            <p class="text-base-content/70 text-sm lg:text-base">
              {{ t(`features.items.${feature.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
