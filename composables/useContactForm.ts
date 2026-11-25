/**
 * 견적 문의 전송 (Web3Forms)
 *
 * 정적 사이트라 제출을 받는 서버가 없어서 Web3Forms(무료, 월 250건)가 문의를 메일로 바꿔 보낸다.
 * 받는 주소는 access key 를 만든 메일이다. 메일의 From 은 notify@web3forms.com 이고,
 * Reply-To 는 아래 replyto(문의자가 적은 메일)다. 에버 오피스 배정기가 이 메일을 클라이언트 응대 이슈로 만든다.
 *
 * fields 의 키와 값은 메일 본문 표에 그대로 한 줄씩 들어간다.
 */
export interface QuoteSubmission {
  subject: string
  replyTo?: string
  fields: Record<string, string>
}

interface SubmitResult {
  success: boolean
  message: string
}

export const useContactForm = () => {
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const isSubmitting = ref(false)
  const submitResult = ref<SubmitResult | null>(null)

  const submitForm = async (data: QuoteSubmission): Promise<SubmitResult> => {
    isSubmitting.value = true
    submitResult.value = null

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: config.public.web3formsKey,
          subject: data.subject,
          from_name: 'Evergreen Dev Website',
          ...(data.replyTo ? { replyto: data.replyTo } : {}),
          ...data.fields
        })
      })

      const result = await response.json()

      if (result.success) {
        submitResult.value = { success: true, message: t('contact.messages.success') }
      } else {
        throw new Error(result.message || 'Form submission failed')
      }
    } catch {
      submitResult.value = { success: false, message: t('contact.messages.error') }
    } finally {
      isSubmitting.value = false
    }

    return submitResult.value
  }

  const resetForm = () => {
    submitResult.value = null
  }

  return {
    isSubmitting,
    submitResult,
    submitForm,
    resetForm
  }
}
