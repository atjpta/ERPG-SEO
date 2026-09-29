<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { z } from 'zod'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const { fieldValidator } = useZodForm()

const form = useForm({
  defaultValues: { name: '', email: '', message: '' },
  onSubmit: ({ value }) => {
    // Replace with a real submit — an API route, a form service, etc.
    console.log('Contact form submitted:', value)
    toast.success(t('contact.success'))
    form.reset()
  },
})
</script>

<template>
  <section id="contact" v-motion-slide-visible-bottom class="mx-auto max-w-xl px-6 py-24">
    <div class="text-center">
      <p class="text-primary text-sm font-semibold">
        {{ t('contact.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {{ t('contact.title') }}
      </h2>
      <p class="text-base-content/70 mt-4">
        {{ t('contact.subtitle') }}
      </p>
    </div>

    <form class="mt-10 flex flex-col gap-4" @submit.prevent="form.handleSubmit">
      <form.Field name="name" :validators="{ onChange: fieldValidator(z.string().min(1)) }">
        <template #default="{ field }">
          <label class="floating-label">
            <span>{{ t('contact.name') }}</span>
            <input
              class="input w-full"
              :value="field.state.value"
              @input="field.handleChange(($event.target as HTMLInputElement).value)"
            >
          </label>
          <p v-if="field.state.meta.errors[0]" class="text-error text-sm">
            {{ field.state.meta.errors[0] }}
          </p>
        </template>
      </form.Field>

      <form.Field
        name="email"
        :validators="{ onChange: fieldValidator(z.string().min(1).email()) }"
      >
        <template #default="{ field }">
          <label class="floating-label">
            <span>{{ t('contact.email') }}</span>
            <input
              type="email"
              class="input w-full"
              :value="field.state.value"
              @input="field.handleChange(($event.target as HTMLInputElement).value)"
            >
          </label>
          <p v-if="field.state.meta.errors[0]" class="text-error text-sm">
            {{ field.state.meta.errors[0] }}
          </p>
        </template>
      </form.Field>

      <form.Field name="message" :validators="{ onChange: fieldValidator(z.string().min(10)) }">
        <template #default="{ field }">
          <label class="floating-label">
            <span>{{ t('contact.message') }}</span>
            <textarea
              class="textarea w-full"
              rows="4"
              :value="field.state.value"
              @input="field.handleChange(($event.target as HTMLTextAreaElement).value)"
            />
          </label>
          <p v-if="field.state.meta.errors[0]" class="text-error text-sm">
            {{ field.state.meta.errors[0] }}
          </p>
        </template>
      </form.Field>

      <VButton
        type="submit"
        class="from-primary via-secondary to-accent text-primary-content mt-2 rounded-full border-none bg-linear-to-r"
        :loading="form.state.isSubmitting"
      >
        {{ t('contact.submit') }}
      </VButton>
    </form>
  </section>
</template>
