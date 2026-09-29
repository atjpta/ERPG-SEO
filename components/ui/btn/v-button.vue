<script setup lang="ts">
import type { Component } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  loading?: boolean
  icon?: Component | string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const { loading, icon } = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    :type="type ?? 'button'"
    :disabled="(attrs.disabled as boolean) || loading"
    class="btn relative"
  >
    <span :class="{ invisible: loading }" class="inline-flex items-center gap-2">
      <img v-if="typeof icon === 'string'" :src="icon" class="h-4 w-4" alt="">
      <component :is="icon" v-else-if="icon" class="h-4 w-4" />
      <slot />
    </span>
    <span v-if="loading" class="loading loading-spinner loading-sm absolute inset-0 m-auto" />
  </button>
</template>
