<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section v-motion-fade-visible class="relative overflow-hidden px-6 py-24 text-center">
    <div aria-hidden="true" class="bg-gradient-brand absolute inset-0 -z-10" />

    <span
      class="text-gradient border-base-300 inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold"
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
        href="#contact"
        class="btn from-primary via-secondary to-accent text-primary-content rounded-full border-none bg-linear-to-r"
      >
        {{ t('hero.primaryCta') }}
      </a>
      <a href="#features" class="btn btn-ghost rounded-full">{{ t('hero.secondaryCta') }}</a>
    </div>
  </section>
</template>
