export const useContactInfo = () => {
  const config = useRuntimeConfig()

  const contacts = {
    email: 'ben@evegdev.com',
    linkedin: 'https://www.linkedin.com/in/ben-kim-87a5a0219',
    github: 'https://github.com/evegdev',
    location: 'Seoul, Korea',
    calendlyUrl: config.public.calendlyUrl || 'https://calendly.com/evergreen-dev/30min'
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: 'mdi:linkedin', url: contacts.linkedin }
  ]

  return {
    contacts,
    socialLinks
  }
}
