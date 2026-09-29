import type { z } from 'zod'

function issueToI18nKey(issue: z.core.$ZodIssue): {
  key: string
  params?: Record<string, unknown>
} {
  switch (issue.code) {
    case 'invalid_type':
      if (issue.input === undefined) return { key: 'validation.required' }
      return { key: 'validation.invalid' }
    case 'too_small':
      return { key: 'validation.min', params: { min: issue.minimum } }
    case 'too_big':
      return { key: 'validation.max', params: { max: issue.maximum } }
    case 'invalid_format':
      if (issue.format === 'email') return { key: 'validation.email' }
      return { key: 'validation.invalid' }
    default:
      return { key: 'validation.invalid' }
  }
}

export function useZodForm() {
  const { t } = useI18n()

  function fieldValidator(schema: z.ZodTypeAny) {
    return ({ value }: { value: unknown }) => {
      const result = schema.safeParse(value)
      if (result.success) return undefined

      const issue = result.error.issues[0]
      if (!issue) return undefined

      const { key, params } = issueToI18nKey(issue)
      return t(key, params ?? {})
    }
  }

  return { fieldValidator }
}
