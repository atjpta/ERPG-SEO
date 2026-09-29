<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImage: '/logo2.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <LandingHeroSection />
    <LandingFeaturesSection />
    <LandingTestimonialsSection />
    <LandingDownloadSection />
    <LandingFaqSection />
    <LandingCtaSection />
    <LandingContactSection />
  </div>
</template>
