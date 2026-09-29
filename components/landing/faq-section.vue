<script setup lang="ts">
interface FaqItem {
  question: string
  answer: string
}

const { t, tm, rt } = useI18n()

type MessageNode = NonNullable<Parameters<typeof rt>[0]>

const faqs = computed<FaqItem[]>(() =>
  (tm('faq.items') as Array<Record<string, MessageNode>>).map(item => ({
    question: rt(item.question as MessageNode),
    answer: rt(item.answer as MessageNode),
  })),
)
</script>

<template>
  <section id="faq" v-motion-slide-visible-bottom class="mx-auto max-w-3xl px-6 py-24">
    <div class="text-center">
      <p class="text-primary text-sm font-semibold">
        {{ t('faq.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {{ t('faq.title') }}
      </h2>
    </div>

    <div class="mt-12 flex flex-col gap-3">
      <div
        v-for="faq in faqs"
        :key="faq.question"
        class="collapse-arrow border-base-300 bg-base-100 collapse border"
      >
        <input type="radio" name="faq-accordion">
        <div class="collapse-title font-medium">
          {{ faq.question }}
        </div>
        <div class="collapse-content text-base-content/70 text-sm">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>
