<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    v-motion-fade-visible
    class="from-primary via-secondary to-accent text-primary-content bg-linear-to-br px-6 py-20 text-center"
  >
    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
      {{ t('cta.title') }}
    </h2>
    <p class="mt-4 opacity-90">
      {{ t('cta.subtitle') }}
    </p>
    <a href="#contact" class="btn btn-lg mt-8 rounded-full bg-white text-black hover:bg-white/90">{{
      t('cta.button')
    }}</a>
  </section>
</template>
