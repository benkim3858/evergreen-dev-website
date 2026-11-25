<template>
  <div class="contact-form-wrapper">
    <h3 class="form-title">{{ $t('contact.form.title') }}</h3>
    <form class="contact-form" novalidate @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label :for="`${uid}-name`">{{ $t('contact.form.name') }} *</label>
          <input
            :id="`${uid}-name`"
            v-model.trim="form.name"
            type="text"
            autocomplete="name"
            maxlength="60"
            :placeholder="$t('contact.form.namePlaceholder')"
            :disabled="isSubmitting"
          >
        </div>
        <div class="form-group">
          <label :for="`${uid}-company`">{{ $t('contact.form.company') }}</label>
          <input
            :id="`${uid}-company`"
            v-model.trim="form.company"
            type="text"
            autocomplete="organization"
            maxlength="80"
            :placeholder="$t('contact.form.companyPlaceholder')"
            :disabled="isSubmitting"
          >
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label :for="`${uid}-email`">{{ $t('contact.form.email') }}</label>
          <input
            :id="`${uid}-email`"
            v-model.trim="form.email"
            type="email"
            autocomplete="email"
            maxlength="120"
            :placeholder="$t('contact.form.emailPlaceholder')"
            :disabled="isSubmitting"
          >
        </div>
        <div class="form-group">
          <label :for="`${uid}-phone`">{{ $t('contact.form.phone') }}</label>
          <input
            :id="`${uid}-phone`"
            v-model.trim="form.phone"
            type="tel"
            autocomplete="tel"
            maxlength="20"
            :placeholder="$t('contact.form.phonePlaceholder')"
            :disabled="isSubmitting"
          >
        </div>
      </div>
      <p class="field-hint">{{ $t('contact.form.contactHint') }}</p>

      <div class="form-row">
        <div class="form-group">
          <label :for="`${uid}-budget`">{{ $t('contact.form.budget') }}</label>
          <select :id="`${uid}-budget`" v-model="form.budget" :disabled="isSubmitting">
            <option value="">{{ $t('contact.form.budgetPlaceholder') }}</option>
            <option v-for="key in BUDGETS" :key="key" :value="key">{{ $t(`contact.form.budgets.${key}`) }}</option>
          </select>
        </div>
        <div class="form-group">
          <label :for="`${uid}-schedule`">{{ $t('contact.form.schedule') }}</label>
          <select :id="`${uid}-schedule`" v-model="form.schedule" :disabled="isSubmitting">
            <option value="">{{ $t('contact.form.schedulePlaceholder') }}</option>
            <option v-for="key in SCHEDULES" :key="key" :value="key">{{ $t(`contact.form.schedules.${key}`) }}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label :for="`${uid}-message`">{{ $t('contact.form.message') }} *</label>
        <textarea
          :id="`${uid}-message`"
          v-model="form.message"
          rows="6"
          maxlength="4000"
          :placeholder="$t('contact.form.messagePlaceholder')"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <fieldset class="consent-box">
        <legend>{{ $t('contact.form.privacy.title') }}</legend>
        <dl class="privacy-table">
          <dt>{{ $t('contact.form.privacy.itemsLabel') }}</dt>
          <dd>{{ $t('contact.form.privacy.items') }}</dd>
          <dt>{{ $t('contact.form.privacy.purposeLabel') }}</dt>
          <dd>{{ $t('contact.form.privacy.purpose') }}</dd>
          <dt>{{ $t('contact.form.privacy.retentionLabel') }}</dt>
          <dd>{{ $t('contact.form.privacy.retention') }}</dd>
        </dl>
        <p class="consent-note">{{ $t('contact.form.privacy.refuse') }}</p>
        <label class="check-row">
          <input v-model="form.privacy" type="checkbox" :disabled="isSubmitting">
          <span>{{ $t('contact.form.privacy.agree') }}</span>
        </label>
      </fieldset>

      <fieldset class="consent-box">
        <legend>{{ $t('contact.form.marketing.title') }}</legend>
        <p class="consent-note">{{ $t('contact.form.marketing.description') }}</p>
        <dl class="privacy-table">
          <dt>{{ $t('contact.form.privacy.itemsLabel') }}</dt>
          <dd>{{ $t('contact.form.marketing.items') }}</dd>
          <dt>{{ $t('contact.form.privacy.purposeLabel') }}</dt>
          <dd>{{ $t('contact.form.marketing.purpose') }}</dd>
          <dt>{{ $t('contact.form.privacy.retentionLabel') }}</dt>
          <dd>{{ $t('contact.form.marketing.retention') }}</dd>
        </dl>
        <div class="check-group">
          <label v-for="ch in CHANNELS" :key="ch" class="check-row">
            <input v-model="form.marketing[ch]" type="checkbox" :disabled="isSubmitting">
            <span>{{ $t(`contact.form.marketing.channels.${ch}`) }}</span>
          </label>
        </div>
      </fieldset>

      <!-- 스팸 방지: 사람에게는 보이지 않는 칸이다. 값이 있으면 Web3Forms 가 스팸으로 버린다 -->
      <input v-model="botcheck" type="checkbox" class="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">

      <p v-if="formError" class="submit-result error" role="alert">
        <Icon name="mdi:alert-circle" />
        {{ formError }}
      </p>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <Icon v-if="isSubmitting" name="mdi:loading" class="spin" />
        <Icon v-else name="mdi:send" />
        {{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
      </button>

      <Transition name="fade">
        <div
          v-if="submitResult"
          class="submit-result"
          :class="{ success: submitResult.success, error: !submitResult.success }"
          role="status"
        >
          <Icon :name="submitResult.success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
          {{ submitResult.message }}
        </div>
      </Transition>
    </form>
  </div>
</template>

<script setup lang="ts">
/**
 * 견적 문의 폼 (2026-11-25 CMP-158). /contact 와 홈 하단이 같은 폼을 쓴다.
 *
 * 받는 것: 이름, 회사, 메일 또는 전화(둘 중 하나는 꼭), 문의 내용, 예산 범위, 희망 일정.
 * 개인정보 수집·이용 동의는 필수, 광고성 정보 수신 동의는 문자·메일·카카오톡을 따로 고르는 선택 항목이다(정보통신망법 제50조).
 * 동의 기록(매체별 동의 여부, 동의 시각, 안내문 판)은 문의 메일에 함께 남는다. 메일이 곧 동의 기록이다.
 */
const BUDGETS = ['under5m', 'from5to15m', 'from15to40m', 'over40m', 'undecided'] as const
const SCHEDULES = ['within1m', 'from1to3m', 'after3m', 'undecided'] as const
const CHANNELS = ['sms', 'email', 'kakao'] as const

// 메일 본문은 받는 쪽(에버 오피스)이 읽으므로 화면 언어와 관계없이 한국어로 적는다
const BUDGET_KO: Record<string, string> = {
  under5m: '500만원 미만',
  from5to15m: '500만 ~ 1,500만원',
  from15to40m: '1,500만 ~ 4,000만원',
  over40m: '4,000만원 이상',
  undecided: '아직 정하지 않음'
}
const SCHEDULE_KO: Record<string, string> = {
  within1m: '1개월 안에 시작',
  from1to3m: '1~3개월 안에 시작',
  after3m: '3개월 이후',
  undecided: '아직 정하지 않음'
}
const PRIVACY_VERSION = 'evegdev-quote-2026-11-25b'

const { t } = useI18n()
const { isSubmitting, submitResult, submitForm, resetForm } = useContactForm()
const uid = useId()

const blank = () => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  budget: '',
  schedule: '',
  message: '',
  privacy: false,
  marketing: { sms: false, email: false, kakao: false } as Record<(typeof CHANNELS)[number], boolean>
})

const form = ref(blank())
const botcheck = ref(false)
const formError = ref('')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[0-9+\-() ]{9,20}$/

// 유입 경로 — plugins/referral.client.ts 가 첫 진입 때 남긴 값
const referral = (): string => {
  try {
    const raw = sessionStorage.getItem('eveg_referral')
    if (!raw) return ''
    const saved = JSON.parse(raw) as { ref?: string; from?: string; landing?: string }
    return [
      saved.ref ? `경로 ${saved.ref}` : '',
      saved.from ? `유입 ${saved.from}` : '',
      saved.landing ? `첫 페이지 ${saved.landing}` : ''
    ].filter(Boolean).join(' / ')
  } catch {
    return ''
  }
}

const kstNow = (): string => {
  const d = new Date(Date.now() + 9 * 3600 * 1000)
  return d.toISOString().replace('T', ' ').slice(0, 19) + ' KST'
}

const validate = (): string => {
  const f = form.value
  if (!f.name) return t('contact.form.errors.name')
  if (!f.email && !f.phone) return t('contact.form.errors.contact')
  if (f.email && !EMAIL_RE.test(f.email)) return t('contact.form.errors.email')
  if (f.phone && !PHONE_RE.test(f.phone)) return t('contact.form.errors.phone')
  if (f.marketing.email && !f.email) return t('contact.form.errors.marketingEmail')
  if ((f.marketing.sms || f.marketing.kakao) && !f.phone) return t('contact.form.errors.marketingPhone')
  if (f.message.trim().length < 5) return t('contact.form.errors.message')
  if (!f.privacy) return t('contact.form.errors.privacy')
  return ''
}

const handleSubmit = async () => {
  resetForm()
  formError.value = validate()
  if (formError.value) return

  const f = form.value
  const yes = (v: boolean) => (v ? '동의' : '동의 안 함')
  const who = f.company ? `${f.name} (${f.company})` : f.name

  const fields: Record<string, string> = {
    '이름': f.name,
    '회사': f.company || '-',
    '메일': f.email || '-',
    '전화': f.phone || '-',
    '예산 범위': BUDGET_KO[f.budget] || '선택 안 함',
    '희망 일정': SCHEDULE_KO[f.schedule] || '선택 안 함',
    '문의 내용': f.message.trim(),
    '개인정보 수집·이용 동의(필수)': '동의',
    '광고성 정보 수신 동의 - 문자': yes(f.marketing.sms),
    '광고성 정보 수신 동의 - 메일': yes(f.marketing.email),
    '광고성 정보 수신 동의 - 카카오톡': yes(f.marketing.kakao),
    '동의 시각': kstNow(),
    '동의 안내문 판': PRIVACY_VERSION,
    '문의한 페이지': window.location.pathname,
    '유입 경로': referral() || '-'
  }
  if (botcheck.value) fields.botcheck = 'on'

  const result = await submitForm({
    subject: `[evegdev.com 견적 문의] ${who}`,
    replyTo: f.email || undefined,
    fields
  })

  if (result.success) {
    form.value = blank()
  }
}
</script>

<style scoped>
.contact-form-wrapper {
  position: relative;
  background: rgba(11, 16, 33, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px -10px rgba(2, 12, 27, 0.5);
  animation: slideInRight 0.8s ease backwards 0.2s;
}
/* 카드 전체 회전 그라데이션 테두리 — 홈 '파트너 상담 시작' 버튼과 동일 인터랙션 */
@property --border-angle {
  syntax: "<angle>";
  initial-value: 120deg;
  inherits: false;
}
@keyframes borderAngleRotate {
  to { --border-angle: 480deg; }
}
.contact-form-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(
    from var(--border-angle),
    #64ffda, #4af3ff, #a78bfa, #4af3ff, #64ffda
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderAngleRotate 5s linear infinite;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .contact-form-wrapper::after {
    animation: none;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
}

.form-title {
  color: var(--text-color-light);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 24px;
  background: linear-gradient(180deg, #64ffda, #4af3ff, #a78bfa);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.form-group label {
  color: var(--text-color-light);
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0.2rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-color-light);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(74, 243, 255, 0.05);
  box-shadow: 0 0 0 4px rgba(74, 243, 255, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-color);
  opacity: 0.3;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364ffda' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
}

.form-group select option {
  background: #0b1021;
  color: var(--text-color-light);
  padding: 10px;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  color: var(--bg-color);
  padding: 1.1rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: flex-start;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: 0.5s;
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(74, 243, 255, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #4a5568;
}

.submit-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
}

.submit-result.success {
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
}

.submit-result.error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .contact-form-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .submit-btn {
    width: 100%;
  }
}

.form-row .form-group {
  min-width: 0;
}

.field-hint {
  margin: -0.75rem 0 0;
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.7;
}

.consent-box {
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.consent-box legend {
  padding: 0 0.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color-light);
}

.privacy-table {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.35rem 1rem;
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-color);
}

.privacy-table dt {
  font-weight: 600;
  opacity: 0.9;
}

.privacy-table dd {
  margin: 0;
  opacity: 0.8;
}

.consent-note {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.75;
}

.check-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.check-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: var(--text-color-light);
  cursor: pointer;
}

.check-row input {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: #64ffda;
  cursor: pointer;
}

.botcheck {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

@media (max-width: 640px) {
  .privacy-table {
    grid-template-columns: 1fr;
  }
}
</style>
