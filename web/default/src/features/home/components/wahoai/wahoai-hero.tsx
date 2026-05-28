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
import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { WahoAIHeroScene } from './wahoai-hero-scene'

interface WahoAIHeroProps {
  isAuthenticated: boolean
}

const rateRows = [
  {
    label: 'Recharge ratio',
    official: '1 RMB = 1 USD',
    wahoai: '1 RMB = 1 USD credit',
  },
  {
    label: 'Usage multiplier',
    official: '1.0x billed',
    wahoai: '0.2x billed',
  },
  {
    label: 'Same GPT request',
    official: 'Pay 100%',
    wahoai: 'Pay 20%',
  },
]

export function WahoAIHero(props: WahoAIHeroProps) {
  const { t } = useTranslation()

  return (
    <section className='waho-hero'>
      <div className='waho-hero-bg' aria-hidden />
      <div className='waho-hero-grid' aria-hidden />
      <span className='waho-hero-ring' aria-hidden />
      <WahoAIHeroScene />

      <div className='waho-hero-copy'>
        <div className='waho-hero-main'>
          <div className='waho-hero-pitch'>
            <div className='waho-eyebrow'>
              <span className='waho-live-dot' aria-hidden />
              {t('GPT all-model relay pricing')}
            </div>
            <h1 className='waho-hero-title'>
              <span>{t('Save up to')}</span>
              <strong>80%</strong>
            </h1>
            <p className='waho-hero-subtitle'>
              {t(
                'Official top-up is charged at 1:1. WahoAI keeps the same GPT all-model access, but bills usage at only 0.2x.'
              )}
            </p>
            <div className='waho-hero-actions'>
              <Button
                className='waho-hero-action group h-11 rounded-full px-5 text-sm font-semibold'
                render={
                  <Link
                    to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
                  />
                }
              >
                {props.isAuthenticated
                  ? t('Go to Dashboard')
                  : t('Start saving now')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='waho-hero-support-action h-11 rounded-full px-5 text-sm font-semibold'
                render={<a href='#support' />}
              >
                <MessageCircle className='mr-1.5 size-4' />
                {t('Ask about rates')}
              </Button>
            </div>
          </div>

          <div className='waho-rate-card' aria-label={t('GPT rate comparison')}>
            <div className='waho-rate-card-head'>
              <span>{t('Official vs WahoAI')}</span>
              <strong>{t('Pay 20%, save 80%')}</strong>
            </div>
            <div className='waho-rate-table' role='table'>
              <div className='waho-rate-row waho-rate-row-head' role='row'>
                <span role='columnheader'>{t('Item')}</span>
                <span role='columnheader'>{t('Official')}</span>
                <span role='columnheader'>WahoAI</span>
              </div>
              {rateRows.map((row) => (
                <div className='waho-rate-row' role='row' key={row.label}>
                  <span className='waho-rate-item' role='cell'>
                    {t(row.label)}
                  </span>
                  <span data-rate-label={t('Official')} role='cell'>
                    {t(row.official)}
                  </span>
                  <strong data-rate-label='WahoAI' role='cell'>
                    {t(row.wahoai)}
                  </strong>
                </div>
              ))}
            </div>
            <div className='waho-rate-example'>
              <span>{t('Savings example')}</span>
              <strong>{t('Official ¥100 usage costs only ¥20 here')}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className='waho-hero-bottom'>
        <p className='waho-hero-note'>
          {t('Same GPT all-model capability.')} <em>{t('Lower rate.')}</em>{' '}
          {t('Stable relay.')}
        </p>
        <div className='waho-hero-chips' aria-label={t('Gateway features')}>
          <span className='waho-chip'>{t('GPT all models')}</span>
          <span className='waho-chip'>{t('0.2x usage rate')}</span>
          <span className='waho-chip'>{t('stable relay')}</span>
        </div>
        <div className='waho-hero-stats' aria-label={t('Gateway pulse')}>
          <div>
            <strong>80%</strong>
            <span>{t('saved')}</span>
          </div>
          <div>
            <strong>5x</strong>
            <span>{t('more usage')}</span>
          </div>
          <div>
            <strong>99.99%</strong>
            <span>{t('uptime')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
