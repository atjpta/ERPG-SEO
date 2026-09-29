<script setup lang="ts">
const { t, tm, rt } = useI18n()

type MessageNode = Parameters<typeof rt>[0]

interface Section {
  heading: string
  body: string
}

const sections = computed<Section[]>(() =>
  (tm('legal.terms.sections') as Record<string, MessageNode>[]).map(section => ({
    heading: rt(section.heading as MessageNode),
    body: rt(section.body as MessageNode),
  })),
)

useSeoMeta({
  title: () => t('legal.terms.seoTitle'),
  description: () => t('legal.terms.seoDescription'),
  ogTitle: () => t('legal.terms.seoTitle'),
  ogDescription: () => t('legal.terms.seoDescription'),
  ogImage: '/logo2.png',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      {{ t('legal.terms.title') }}
    </h1>
    <p class="text-base-content/60 mt-3 text-sm">
      {{ t('legal.lastUpdated') }}: 2026-09-29
    </p>
    <p class="text-base-content/80 mt-8 leading-relaxed">
      {{ t('legal.terms.intro') }}
    </p>

    <div class="mt-10 flex flex-col gap-8">
      <section v-for="section in sections" :key="section.heading">
        <h2 class="text-xl font-semibold">
          {{ section.heading }}
        </h2>
        <p class="text-base-content/80 mt-2 leading-relaxed">
          {{ section.body }}
        </p>
      </section>
    </div>
  </div>
</template>
