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
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { WahoAIHeroScene } from './wahoai-hero-scene'

interface WahoAIHeroProps {
  isAuthenticated: boolean
}

export function WahoAIHero(props: WahoAIHeroProps) {
  const { t } = useTranslation()

  return (
    <section className='waho-hero'>
      <div className='waho-hero-bg' aria-hidden />
      <div className='waho-hero-grid' aria-hidden />
      <span className='waho-hero-ring' aria-hidden />
      <WahoAIHeroScene />

      <div className='waho-hero-copy'>
        <div className='waho-eyebrow'>
          <span className='waho-live-dot' aria-hidden />
          {t('AI API Relay Operating System')}
        </div>
        <h1 className='waho-hero-title'>WahoAI</h1>
        <p className='waho-hero-subtitle'>
          {t(
            'Route every model request through one stable control plane with health checks, automatic fallback, and token settlement built in.'
          )}
        </p>
        <Button
          className='waho-hero-action group h-11 rounded-full px-5 text-sm font-semibold'
          render={
            <Link to={props.isAuthenticated ? '/dashboard' : '/sign-up'} />
          }
        >
          {props.isAuthenticated ? t('Go to Dashboard') : t('Get Started')}
          <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
        </Button>
      </div>

      <div className='waho-hero-bottom'>
        <p className='waho-hero-note'>
          {t(
            'Model access, usage settlement, channel health, and key security in one'
          )}{' '}
          <em>WahoAI</em> {t('control plane.')}
        </p>
        <div className='waho-hero-chips' aria-label={t('Gateway features')}>
          <span className='waho-chip'>{t('OpenAI compatible')}</span>
          <span className='waho-chip'>{t('SSE stream')}</span>
          <span className='waho-chip'>{t('auto fallback')}</span>
        </div>
        <div className='waho-hero-stats' aria-label={t('Gateway pulse')}>
          <div>
            <strong>40+</strong>
            <span>{t('providers')}</span>
          </div>
          <div>
            <strong>142ms</strong>
            <span>{t('request p95')}</span>
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
