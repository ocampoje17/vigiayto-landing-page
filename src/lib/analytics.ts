export const ANALYTICS_CONSENT_STORAGE_KEY = 'vigiayto-analytics-consent-v1'

export type AnalyticsConsent = 'granted' | 'denied'

const MEASUREMENT_ID = 'G-QL0RJ8863V'
const GOOGLE_TAG_SCRIPT_ID = 'vigiayto-google-tag'

type GtagCommand = 'config' | 'consent' | 'event' | 'js'
type Gtag = (command: GtagCommand, ...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: IArguments[]
    gtag?: Gtag
  }
}

let googleTagLoadPromise: Promise<void> | undefined

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const consent = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    return consent === 'granted' || consent === 'denied' ? consent : null
  } catch {
    return null
  }
}

export function saveAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent)
  } catch {
    // The current session still honors the choice when storage is unavailable.
  }
}

function getGtag(): Gtag {
  window.dataLayer ??= []

  const gtag: Gtag = function gtag() {
    // Google reads gtag commands from the native arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }

  window.gtag = gtag
  return gtag
}

/**
 * Basic Consent Mode: this function is only called after an explicit opt-in,
 * so no Google script or request is created for visitors who decline.
 */
export function loadGoogleAnalytics(): Promise<void> {
  if (googleTagLoadPromise) return googleTagLoadPromise

  const gtag = getGtag()
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  gtag('config', MEASUREMENT_ID, { send_page_view: false })

  googleTagLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_TAG_SCRIPT_ID) as HTMLScriptElement | null

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Google Analytics.')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.id = GOOGLE_TAG_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        resolve()
      },
      { once: true },
    )
    script.addEventListener(
      'error',
      () => {
        googleTagLoadPromise = undefined
        reject(new Error('Unable to load Google Analytics.'))
      },
      { once: true },
    )
    document.head.append(script)
  })

  return googleTagLoadPromise
}

export function trackPageView(pagePath: string) {
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: document.title,
  })
}
