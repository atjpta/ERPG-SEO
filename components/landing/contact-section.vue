<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { z } from 'zod'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const { fieldValidator } = useZodForm()
const {
  public: { web3formsKey },
} = useRuntimeConfig()

const isLoading = ref(false)

const form = useForm({
  defaultValues: { name: '', email: '', message: '' },
  onSubmit: async ({ value }) => {
    isLoading.value = true
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `ERPG contact form — ${value.name}`,
          name: value.name,
          email: value.email,
          message: value.message,
        }),
      })

      if (!response.ok) {
        toast.error(t('contact.error'))
        return
      }

      toast.success(t('contact.success'))
      form.reset()
    } catch {
      toast.error(t('contact.error'))
    } finally {
      isLoading.value = false
    }
  },
})
</script>

<template>
  <section id="contact" v-motion-slide-visible-bottom class="mx-auto max-w-xl px-6 py-24">
    <div class="text-center">
      <p class="text-primary text-sm font-semibold lg:text-base">
        {{ t('contact.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {{ t('contact.title') }}
      </h2>
      <p class="text-base-content/70 mt-4 lg:text-lg">
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
            />
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
            />
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
        class="from-primary via-secondary to-accent text-primary-content shadow-pixel mt-2 border-none bg-linear-to-r"
        :loading="isLoading"
      >
        {{ t('contact.submit') }}
      </VButton>
    </form>
  </section>
</template>
