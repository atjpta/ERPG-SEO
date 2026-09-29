<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
</script>

<template>
  <label class="toggle text-base-content">
    <input type="checkbox" data-toggle-theme="light,dark" aria-label="Toggle theme">
    <Sun class="h-4 w-4" />
    <Moon class="h-4 w-4" />
  </label>
</template>
