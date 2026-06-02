/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

export const GOOGLE_ADS_ID = 'AW-18164689347'
export const GOOGLE_ADS_HOME_CONVERSION_SEND_TO =
  'AW-18164689347/P_MzCKjhg68cEMPTzNVD'
export const GOOGLE_ADS_REGISTER_CONVERSION_SEND_TO =
  'AW-18164689347/AyVYCK2R0LccEMPTzNVD'
const GOOGLE_ADS_REGISTER_CONVERSION_ID = '18164689347'
const GOOGLE_ADS_REGISTER_CONVERSION_LABEL = 'AyVYCK2R0LccEMPTzNVD'
const GOOGLE_ADS_REGISTER_FALLBACK_DELAY_MS = 1200

type GoogleAdsEventParams = {
  send_to: string
  value: number
  currency: string
  event_callback?: () => void
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    gtag_report_conversion?: (url?: string) => false
    __newApiGoogleAdsConversionsTracked?: Record<string, boolean>
  }
}

export function ensureGoogleAdsTag() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args)
    })

  const tagSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  if (!document.querySelector(`script[src="${tagSrc}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = tagSrc
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ADS_ID)
  window.gtag_report_conversion = gtag_report_conversion
}

export function gtag_report_conversion(url?: string): false {
  const startedAt = performance.now()
  const callback = function () {
    if (typeof url !== 'undefined') {
      window.location.href = url
    }
  }

  ensureGoogleAdsTag()
  window.gtag?.('event', 'conversion', {
    send_to: GOOGLE_ADS_REGISTER_CONVERSION_SEND_TO,
    value: 1.0,
    currency: 'USD',
    event_callback: callback,
  })

  window.setTimeout(() => {
    if (!hasRegisterConversionRequest(startedAt)) {
      fireRegisterConversionPixel()
    }
  }, GOOGLE_ADS_REGISTER_FALLBACK_DELAY_MS)

  return false
}

function hasRegisterConversionRequest(startedAt: number) {
  return performance
    .getEntriesByType('resource')
    .some((entry) => {
      if (entry.startTime < startedAt) return false
      return (
        entry.name.includes(
          `/pagead/conversion/${GOOGLE_ADS_REGISTER_CONVERSION_ID}/`
        ) ||
        entry.name.includes(
          `/pagead/1p-conversion/${GOOGLE_ADS_REGISTER_CONVERSION_ID}/`
        )
      )
    })
}

function fireRegisterConversionPixel() {
  const params = new URLSearchParams({
    value: '1.0',
    currency_code: 'USD',
    label: GOOGLE_ADS_REGISTER_CONVERSION_LABEL,
    guid: 'ON',
    script: '0',
    url: window.location.href,
  })
  const image = new Image(1, 1)
  image.alt = ''
  image.referrerPolicy = 'strict-origin-when-cross-origin'
  image.style.display = 'none'
  image.src = `https://www.googleadservices.com/pagead/conversion/${GOOGLE_ADS_REGISTER_CONVERSION_ID}/?${params.toString()}`
  document.body?.appendChild(image)
  window.setTimeout(() => image.remove(), 10000)
}

export function trackGoogleAdsConversion(
  sendTo: string,
  options: {
    onceKey?: string
    eventCallback?: () => void
  } = {}
) {
  const tracked = (window.__newApiGoogleAdsConversionsTracked =
    window.__newApiGoogleAdsConversionsTracked || {})
  if (options.onceKey && tracked[options.onceKey]) return

  ensureGoogleAdsTag()

  const params: GoogleAdsEventParams = {
    send_to: sendTo,
    value: 1.0,
    currency: 'USD',
  }

  if (options.eventCallback) {
    params.event_callback = options.eventCallback
  }

  window.gtag?.('event', 'conversion', params)

  if (options.onceKey) {
    tracked[options.onceKey] = true
  }
}
