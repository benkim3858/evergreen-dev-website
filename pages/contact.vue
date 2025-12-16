<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title text-center">{{ $t('contact.pageTitle') }}</h2>
      <p class="section-subtitle text-center">
        {{ $t('contact.subtitle') }}
      </p>

      <div class="contact-container">
        <!-- Contact Info & Options -->
        <div class="contact-sidebar">
          <div class="contact-card">
            <h3 class="card-title">
              <Icon name="mdi:email-outline" />
              {{ $t('contact.cards.email.title') }}
            </h3>
            <p class="card-desc">{{ $t('contact.cards.email.description') }}</p>
            <a :href="`mailto:${contacts.email}`" class="contact-link">
              {{ contacts.email }}
            </a>
            <span class="response-time">
              <Icon name="mdi:clock-outline" />
              {{ $t('contact.responseTime') }}
            </span>
          </div>

          <div class="contact-card">
            <h3 class="card-title">
              <Icon name="mdi:chat-outline" />
              {{ $t('contact.cards.chat.title') }}
            </h3>
            <p class="card-desc">{{ $t('contact.cards.chat.description') }}</p>
            <button @click="openChannelTalk" class="btn btn-chat">
              <Icon name="mdi:message-text" />
              {{ $t('contact.cards.chat.button') }}
            </button>
          </div>

          <div class="contact-card">
            <MeetingScheduler />
          </div>

          <div class="contact-card">
            <h3 class="card-title">
              <Icon name="mdi:link-variant" />
              {{ $t('contact.cards.social.title') }}
            </h3>
            <div class="social-links">
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :title="link.name"
              >
                <Icon :name="link.icon" />
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <h3 class="form-title">{{ $t('contact.form.title') }}</h3>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="name">{{ $t('contact.form.name') }} *</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :placeholder="$t('contact.form.namePlaceholder')"
                  required
                >
              </div>
              <div class="form-group">
                <label for="email">{{ $t('contact.form.email') }} *</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :placeholder="$t('contact.form.emailPlaceholder')"
                  required
                >
              </div>
            </div>

            <div class="form-group">
              <label for="projectType">{{ $t('contact.form.projectType') }}</label>
              <select id="projectType" v-model="formData.projectType">
                <option value="">{{ $t('contact.form.projectTypePlaceholder') }}</option>
                <option value="web">{{ $t('contact.form.projectTypes.web') }}</option>
                <option value="mobile">{{ $t('contact.form.projectTypes.mobile') }}</option>
                <option value="ecommerce">{{ $t('contact.form.projectTypes.ecommerce') }}</option>
                <option value="consulting">{{ $t('contact.form.projectTypes.consulting') }}</option>
                <option value="maintenance">{{ $t('contact.form.projectTypes.maintenance') }}</option>
                <option value="other">{{ $t('contact.form.projectTypes.other') }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="budget">{{ $t('contact.form.budget') }}</label>
              <select id="budget" v-model="formData.budget">
                <option value="">{{ $t('contact.form.budgetPlaceholder') }}</option>
                <option value="small">{{ $t('contact.form.budgets.small') }}</option>
                <option value="medium">{{ $t('contact.form.budgets.medium') }}</option>
                <option value="large">{{ $t('contact.form.budgets.large') }}</option>
                <option value="enterprise">{{ $t('contact.form.budgets.enterprise') }}</option>
                <option value="discuss">{{ $t('contact.form.budgets.discuss') }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">{{ $t('contact.form.message') }} *</label>
              <textarea
                id="message"
                v-model="formData.message"
                :placeholder="$t('contact.form.messagePlaceholder')"
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting"
            >
              <Icon v-if="isSubmitting" name="mdi:loading" class="spin" />
              <Icon v-else name="mdi:send" />
              {{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>

            <Transition name="fade">
              <div
                v-if="submitResult"
                class="submit-result"
                :class="{ success: submitResult.success, error: !submitResult.success }"
              >
                <Icon :name="submitResult.success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                {{ submitResult.message }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { contacts, socialLinks } = useContactInfo()
const { isSubmitting, submitResult, submitForm, resetForm } = useContactForm()
const { $channelTalk } = useNuxtApp()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description'),
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image',
})

const formData = ref({
  name: '',
  email: '',
  message: '',
  projectType: '',
  budget: ''
})

const handleSubmit = async () => {
  const result = await submitForm({
    name: formData.value.name,
    email: formData.value.email,
    message: `[프로젝트 유형: ${formData.value.projectType || '미선택'}]
[예상 예산: ${formData.value.budget || '미선택'}]

${formData.value.message}`,
    projectType: formData.value.projectType
  })

  if (result.success) {
    formData.value = {
      name: '',
      email: '',
      message: '',
      projectType: '',
      budget: ''
    }
  }
}

const openChannelTalk = () => {
  if ($channelTalk?.isInitialized) {
    $channelTalk.show()
  } else {
    window.open('mailto:' + contacts.email, '_blank')
  }
}
</script>

<style scoped>
.section {
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
}

/* Subtle background accent for the section */
.section::before {
  content: '';
  position: absolute;
  top: 20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(74, 243, 255, 0.05) 0%, transparent 70%);
  z-index: -1;
  pointer-events: none;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--text-color-light);
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(100, 255, 218, 0.1);
}

.section-subtitle {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 4rem;
  font-size: 1.1rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-card {
  background: rgba(11, 16, 33, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(74, 243, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: slideInLeft 0.6s ease backwards;
}

.contact-card:nth-child(1) { animation-delay: 0.1s; }
.contact-card:nth-child(2) { animation-delay: 0.2s; }
.contact-card:nth-child(3) { animation-delay: 0.3s; }
.contact-card:nth-child(4) { animation-delay: 0.4s; }

.contact-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 243, 255, 0.3);
  box-shadow: 0 10px 30px -10px rgba(74, 243, 255, 0.15);
}

.contact-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.03), transparent);
  transform: translateX(-100%);
  transition: 0.5s;
}

.contact-card:hover::after {
  transform: translateX(100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--accent-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-desc {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-color-light);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.contact-link:hover {
  color: var(--accent-color);
}

.contact-link:hover::after {
  width: 100%;
}

.response-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.6;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-chat {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid rgba(74, 243, 255, 0.3);
  border-radius: 8px;
  color: var(--accent-color);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  justify-content: center;
}

.btn-chat:hover {
  background: rgba(74, 243, 255, 0.2);
  box-shadow: 0 0 20px rgba(74, 243, 255, 0.2);
  border-color: var(--accent-color);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(74, 243, 255, 0.1);
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.contact-form-wrapper {
  background: rgba(11, 16, 33, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px -10px rgba(2, 12, 27, 0.5);
  animation: slideInRight 0.8s ease backwards 0.2s;
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
  background: var(--accent-color);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--accent-color);
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
  background: var(--accent-color);
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
  .contact-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-sidebar {
    order: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .contact-card {
    height: 100%;
  }

  .contact-form-wrapper {
    order: 1;
    padding: 2rem;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 6rem 0;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .contact-sidebar {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .submit-btn {
    width: 100%;
  }
}
</style>
```
