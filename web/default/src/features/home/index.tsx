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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { Markdown } from '@/components/ui/markdown'
import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { WahoAIHomePage } from './components/wahoai/wahoai-home-page'
import { WahoAIHeaderLogo } from './components/wahoai/wahoai-logo'
import { useHomePageContent } from './hooks'
import './wahoai-home.css'

const GOOGLE_ADS_ID = 'AW-18164689347'
const GOOGLE_ADS_CONVERSION_SEND_TO =
  'AW-18164689347/P_MzCKjhg68cEMPTzNVD'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __newApiHomeGoogleAdsConversionTracked?: boolean
  }
}

function ensureGoogleAdsTag() {
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
}

function trackHomeGoogleAdsConversion() {
  if (window.__newApiHomeGoogleAdsConversionTracked) return

  ensureGoogleAdsTag()
  window.gtag?.('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    value: 1.0,
    currency: 'USD',
  })
  window.__newApiHomeGoogleAdsConversionTracked = true
}

export function Home() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { content, isLoaded, isUrl } = useHomePageContent()

  useEffect(() => {
    trackHomeGoogleAdsConversion()
  }, [])

  if (!isLoaded) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground'>{t('Loading...')}</div>
        </main>
      </PublicLayout>
    )
  }

  if (content) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='overflow-x-hidden'>
          {isUrl ? (
            <iframe
              src={content}
              className='h-screen w-full border-none'
              title={t('Custom Home Page')}
            />
          ) : (
            <div className='container mx-auto py-8'>
              <Markdown className='custom-home-content'>{content}</Markdown>
            </div>
          )}
        </main>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout
      showMainContainer={false}
      logo={<WahoAIHeaderLogo />}
      siteName='WahoAI'
      hideSiteName
      headerProps={{ variant: 'large' }}
    >
      <WahoAIHomePage isAuthenticated={isAuthenticated} />
      <Footer />
    </PublicLayout>
  )
}
