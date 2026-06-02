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

  return false
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
