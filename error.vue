<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error.statusCode === 404)
const key = computed(() => (is404.value ? '404' : '500'))

useSeoMeta({
  title: () => t(`error.${key.value}.title`),
  robots: 'noindex',
})

function handleClear() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
    <p class="text-primary text-6xl font-bold">
      {{ error.statusCode }}
    </p>
    <h1 class="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
      {{ t(`error.${key}.title`) }}
    </h1>
    <p class="text-base-content/70 mt-3 max-w-md">
      {{ t(`error.${key}.message`) }}
    </p>
    <button class="btn btn-primary mt-8" @click="handleClear">
      {{ t('error.backHome') }}
    </button>
  </div>
</template>
