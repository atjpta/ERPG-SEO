<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.filter(l => l.code !== locale.value))
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
      {{ locale.toUpperCase() }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-10 w-32 p-2 shadow-sm">
      <li v-for="l in availableLocales" :key="l.code">
        <NuxtLink :to="switchLocalePath(l.code)">{{ l.name ?? l.code }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
