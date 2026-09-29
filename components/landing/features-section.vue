<script setup lang="ts">
import { Search, Zap, Languages, Palette, LayoutGrid, Mail } from '@lucide/vue'

const { t } = useI18n()

const features = [
  { key: 'seo', icon: Search },
  { key: 'performance', icon: Zap },
  { key: 'i18n', icon: Languages },
  { key: 'theming', icon: Palette },
  { key: 'components', icon: LayoutGrid },
  { key: 'forms', icon: Mail },
]
</script>

<template>
  <section id="features" class="bg-base-200 px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-primary text-sm font-semibold">
          {{ t('features.eyebrow') }}
        </p>
        <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {{ t('features.title') }}
        </h2>
        <p class="text-base-content/70 mt-4">
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
          class="card bg-base-100 border-base-300 hover:border-primary/40 border transition-colors"
        >
          <div class="card-body gap-3">
            <div
              class="from-primary via-secondary to-accent flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br"
            >
              <component :is="feature.icon" class="text-primary-content h-5 w-5" />
            </div>
            <h3 class="card-title text-base">
              {{ t(`features.items.${feature.key}.title`) }}
            </h3>
            <p class="text-base-content/70 text-sm">
              {{ t(`features.items.${feature.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
