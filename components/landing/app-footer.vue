<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-base-200">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="font-display font-bold">
          Landing Page Base
        </p>
        <p class="text-base-content/60 text-sm">
          {{ t('footer.tagline') }}
        </p>
      </div>
      <p class="text-base-content/60 text-sm">
        © {{ year }} Landing Page Base. {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
