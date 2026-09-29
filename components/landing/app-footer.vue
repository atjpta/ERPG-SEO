<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-base-200">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <img src="/logo2.png" alt="ERPG" class="h-7 w-auto">
          <p class="text-base-content/60 mt-2 text-sm lg:text-base">
            {{ t('footer.tagline') }}
          </p>
        </div>
        <nav class="flex gap-4">
          <NuxtLink
            :to="localePath('/privacy-policy')"
            class="link link-hover text-base-content/70 text-sm lg:text-base"
          >
            {{ t('footer.privacyPolicy') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/terms-of-service')"
            class="link link-hover text-base-content/70 text-sm lg:text-base"
          >
            {{ t('footer.termsOfService') }}
          </NuxtLink>
        </nav>
      </div>
      <p class="text-base-content/60 text-sm lg:text-base">
        © {{ year }} ERPG. {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
