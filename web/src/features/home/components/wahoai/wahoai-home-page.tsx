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
import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconTelegram, IconWeChat } from '@/assets/brand-icons'

import { AssetSystemSection } from './asset-system-section'
import { ProviderFeed } from './provider-feed'
import { TelemetrySection } from './telemetry-section'
import { useWahoAIGsapStory } from './use-wahoai-gsap-story'
import {
  SUPPORT_TELEGRAM_ID,
  SUPPORT_TELEGRAM_URL,
  SUPPORT_WECHAT_ID,
  SUPPORT_WECHAT_QR_SRC,
  WahoAIFooterBand,
} from './wahoai-footer-band'
import { WahoAIHero } from './wahoai-hero'
import { WorkspaceSection } from './workspace-section'

interface WahoAIHomePageProps {
  isAuthenticated: boolean
}

export function WahoAIHomePage(props: WahoAIHomePageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false)
  const { t } = useTranslation()
  useWahoAIGsapStory(rootRef)

  useEffect(() => {
    if (!isSupportDialogOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSupportDialogOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSupportDialogOpen])

  return (
    <div className='waho-home' ref={rootRef}>
      <div className='waho-grain' aria-hidden />
      <button
        aria-controls='waho-support-dialog'
        aria-expanded={isSupportDialogOpen}
        aria-haspopup='dialog'
        className='waho-floating-support'
        type='button'
        onClick={() => setIsSupportDialogOpen(true)}
      >
        <MessageCircle className='size-5' aria-hidden />
        <span>{t('Contact support')}</span>
      </button>
      {isSupportDialogOpen ? (
        <div
          className='waho-support-modal'
          role='presentation'
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsSupportDialogOpen(false)
            }
          }}
        >
          <div
            aria-labelledby='waho-support-dialog-title'
            aria-modal='true'
            className='waho-support-dialog'
            id='waho-support-dialog'
            role='dialog'
          >
            <button
              aria-label={t('Close')}
              className='waho-support-dialog-close'
              type='button'
              onClick={() => setIsSupportDialogOpen(false)}
            >
              <X className='size-4' aria-hidden />
            </button>
            <span className='waho-support-dialog-kicker'>
              {t('Support contacts')}
            </span>
            <h2 id='waho-support-dialog-title'>{t('Contact support')}</h2>
            <p>
              {t(
                'For account setup, model access, recharge, or integration questions, reach support through WeChat or Telegram.'
              )}
            </p>
            <div className='waho-support-dialog-grid'>
              <div className='waho-support-dialog-qr'>
                <img
                  src={SUPPORT_WECHAT_QR_SRC}
                  alt={t('WeChat support QR code')}
                  width={180}
                  height={180}
                />
              </div>
              <div className='waho-support-dialog-details'>
                <span>{t('Scan to add WeChat support')}</span>
                <div className='waho-support-dialog-contact'>
                  <IconWeChat className='size-4' aria-hidden />
                  <span>{t('WeChat')}</span>
                  <strong>{SUPPORT_WECHAT_ID}</strong>
                </div>
                <a
                  className='waho-support-dialog-contact'
                  href={SUPPORT_TELEGRAM_URL}
                  target='_blank'
                  rel='noreferrer'
                >
                  <IconTelegram className='size-4' aria-hidden />
                  <span>{t('Telegram')}</span>
                  <strong>{SUPPORT_TELEGRAM_ID}</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className='waho-story-spine' aria-hidden>
        <span className='waho-story-spine-track' />
        <span className='waho-story-spine-fill' />
        {Array.from({ length: 6 }, (_, index) => (
          <i className='waho-story-dot' key={index} />
        ))}
      </div>
      <WahoAIHero isAuthenticated={props.isAuthenticated} />
      <ProviderFeed />
      <AssetSystemSection />
      <TelemetrySection />
      <WorkspaceSection />
      <WahoAIFooterBand />
    </div>
  )
}
