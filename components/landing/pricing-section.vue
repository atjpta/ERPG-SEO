<script setup lang="ts">
interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  badge?: string
}

const { t, tm, rt } = useI18n()

const planKeys = ['starter', 'pro', 'enterprise'] as const

type MessageNode = Parameters<typeof rt>[0]

const plans = computed<Plan[]>(() =>
  planKeys.map((key) => {
    const plan = tm(`pricing.plans.${key}`) as Record<string, MessageNode | MessageNode[]>
    return {
      name: rt(plan.name as MessageNode),
      price: rt(plan.price as MessageNode),
      description: rt(plan.description as MessageNode),
      features: (plan.features as MessageNode[]).map(f => rt(f)),
      badge: plan.badge ? rt(plan.badge as MessageNode) : undefined,
    }
  }),
)
</script>

<template>
  <section id="pricing" class="bg-base-200 px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-primary text-sm font-semibold">
          {{ t('pricing.eyebrow') }}
        </p>
        <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {{ t('pricing.title') }}
        </h2>
        <p class="text-base-content/70 mt-4">
          {{ t('pricing.subtitle') }}
        </p>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-3">
        <div
          v-for="(plan, index) in plans"
          :key="plan.name"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="card bg-base-100 border"
          :class="plan.badge ? 'border-primary border-2' : 'border-base-300'"
        >
          <div class="card-body gap-4">
            <div
              v-if="plan.badge"
              class="from-primary via-secondary to-accent badge border-none bg-linear-to-r text-white"
            >
              {{ plan.badge }}
            </div>
            <h3 class="text-lg font-semibold">
              {{ plan.name }}
            </h3>
            <p class="text-base-content/70 text-sm">
              {{ plan.description }}
            </p>
            <p class="text-3xl font-bold">
              {{ plan.price
              }}<span class="text-base-content/50 text-sm font-normal">{{
                t('pricing.perMonth')
              }}</span>
            </p>
            <ul class="flex flex-col gap-2 text-sm">
              <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
                <span class="text-primary">✓</span>{{ feature }}
              </li>
            </ul>
            <a
              href="#contact"
              class="btn mt-2 rounded-full"
              :class="
                plan.badge
                  ? 'from-primary via-secondary to-accent text-primary-content border-none bg-linear-to-r'
                  : 'btn-outline btn-primary'
              "
            >
              {{ t('pricing.cta') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
