import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  loadGoogleAnalytics,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  trackPageView,
  type AnalyticsConsent,
} from '../lib/analytics'

type Language = 'vi' | 'en'

const consentText = {
  vi: {
    title: 'Cho phép sử dụng Analytics?',
    description:
      'Ví Giấy Tờ muốn dùng Google Analytics để hiểu cách mọi người sử dụng website và cải thiện trải nghiệm. Analytics không thu thập nội dung giấy tờ hay dữ liệu bạn lưu trong ứng dụng.',
    accept: 'Bật Analytics',
    decline: 'Không bật',
  },
  en: {
    title: 'Allow Analytics?',
    description:
      'Vi Giay To would like to use Google Analytics to understand how people use this website and improve the experience. Analytics does not collect document contents or data you store in the app.',
    accept: 'Enable Analytics',
    decline: 'Keep it off',
  },
} as const

function getFocusableButtons(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLButtonElement>('button:not([disabled])'))
}

export default function AnalyticsConsent({ language }: { language: Language }) {
  const location = useLocation()
  const [consent, setConsent] = useState<AnalyticsConsent | null>(readAnalyticsConsent)
  const dialogRef = useRef<HTMLDivElement>(null)
  const acceptButtonRef = useRef<HTMLButtonElement>(null)
  const text = consentText[language]

  useEffect(() => {
    if (consent !== null) return

    acceptButtonRef.current?.focus()

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return

      const buttons = getFocusableButtons(dialogRef.current)
      if (buttons.length === 0) return

      const firstButton = buttons[0]
      const lastButton = buttons[buttons.length - 1]

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault()
        lastButton.focus()
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault()
        firstButton.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [consent])

  useEffect(() => {
    if (consent !== 'granted') return

    const pagePath = `${location.pathname}${location.search}`
    let cancelled = false

    void loadGoogleAnalytics()
      .then(() => {
        if (!cancelled) trackPageView(pagePath)
      })
      .catch(() => {
        // A blocked or unavailable Google tag must not affect the landing page.
      })

    return () => {
      cancelled = true
    }
  }, [consent, location.pathname, location.search])

  const chooseConsent = (choice: AnalyticsConsent) => {
    saveAnalyticsConsent(choice)
    setConsent(choice)
  }

  if (consent !== null) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="analytics-consent-title"
        aria-describedby="analytics-consent-description"
        className="w-full max-w-lg rounded-3xl border border-white/20 bg-zinc-950/95 p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-indigo-200/30 bg-indigo-400/20">
            <span className="material-symbols-outlined text-indigo-100" aria-hidden="true">
              analytics
            </span>
          </div>
          <div>
            <h2 id="analytics-consent-title" className="text-lg font-bold text-white sm:text-xl">
              {text.title}
            </h2>
            <p id="analytics-consent-description" className="mt-2 text-sm leading-relaxed text-white/70">
              {text.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            ref={acceptButtonRef}
            type="button"
            className="analytics-consent-accept rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400 active:scale-[0.98]"
            onClick={() => chooseConsent('granted')}
          >
            {text.accept}
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20 active:scale-[0.98]"
            onClick={() => chooseConsent('denied')}
          >
            {text.decline}
          </button>
        </div>
      </div>
    </div>
  )
}
