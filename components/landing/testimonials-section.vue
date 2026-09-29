<script setup lang="ts">
interface Testimonial {
  quote: string
  name: string
  role: string
}

const { t, tm, rt } = useI18n()

type MessageNode = NonNullable<Parameters<typeof rt>[0]>

const testimonials = computed<Testimonial[]>(() =>
  (tm('testimonials.items') as Array<Record<string, MessageNode>>).map(item => ({
    quote: rt(item.quote as MessageNode),
    name: rt(item.name as MessageNode),
    role: rt(item.role as MessageNode),
  })),
)
</script>

<template>
  <section id="testimonials" class="mx-auto max-w-6xl px-6 py-24">
    <div class="mx-auto max-w-2xl text-center">
      <p class="text-primary text-sm font-semibold lg:text-base">
        {{ t('testimonials.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {{ t('testimonials.title') }}
      </h2>
    </div>

    <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <figure
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.name"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
        class="card bg-base-200 shadow-[4px_4px_0_0_var(--color-base-content)]"
      >
        <blockquote class="card-body gap-4">
          <p class="text-base-content/80 lg:text-lg">
            “{{ testimonial.quote }}”
          </p>
          <footer class="mt-2 flex items-center gap-3">
            <div
              class="from-primary via-secondary to-accent flex h-10 w-10 shrink-0 items-center justify-center bg-linear-to-br text-sm font-semibold text-white"
            >
              {{ testimonial.name.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold lg:text-lg">
                {{ testimonial.name }}
              </p>
              <p class="text-base-content/60 text-sm lg:text-base">
                {{ testimonial.role }}
              </p>
            </div>
          </footer>
        </blockquote>
      </figure>
    </div>
  </section>
</template>
