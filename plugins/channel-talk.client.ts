import {
  loadScript,
  boot,
  showMessenger,
  hideMessenger,
  shutdown,
  setPage,
  track
} from '@channel.io/channel-web-sdk-loader'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const pluginKey = config.public.channelPluginKey as string

  if (!pluginKey) {
    console.warn('[Channel Talk] Plugin key is not configured. Skipping initialization.')
    return {
      provide: {
        channelTalk: {
          show: () => {},
          hide: () => {},
          shutdown: () => {},
          setPage: (_page: string) => {},
          track: (_eventName: string, _eventProperty?: Record<string, any>) => {},
          isInitialized: false
        }
      }
    }
  }

  // Load Channel Talk SDK
  loadScript()

  // Boot Channel Talk
  boot({
    pluginKey: pluginKey,
    hideChannelButtonOnBoot: false,
    hidePopup: true,
    language: 'ko',
    zIndex: 9999999,
    appearance: 'system'
  }, (error, user) => {
    if (error) {
      console.error('[Channel Talk] Boot failed:', error)
    } else {
      console.log('[Channel Talk] Boot success:', user?.id)
    }
  })

  return {
    provide: {
      channelTalk: {
        show: () => showMessenger(),
        hide: () => hideMessenger(),
        shutdown: () => shutdown(),
        setPage: (page: string) => setPage(page),
        track: (eventName: string, eventProperty?: Record<string, any>) => track(eventName, eventProperty),
        isInitialized: true
      }
    }
  }
})
