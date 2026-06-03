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

const modelPriceRows = [
  {
    name: 'GPT-5.5',
    provider: 'OpenAI · gpt-5.5',
    multiplier: '0.3x',
    inputPrice: '$1.40',
    outputPrice: '$4.20',
    savings: '72%-86%',
    officialInput: '$5.00',
    officialOutput: '$30.00',
  },
  {
    name: 'Claude Opus 4.8',
    provider: 'Anthropic · claude-opus-4.8',
    multiplier: '4x',
    inputPrice: '$4.00',
    outputPrice: '$20.00',
    savings: '20%',
    officialInput: '$5.00',
    officialOutput: '$25.00',
  },
  {
    name: 'Gemini 3.5 Flash',
    provider: 'Google · gemini-3.5-flash',
    multiplier: '1x',
    inputPrice: '$0.51',
    outputPrice: '$2.06',
    savings: '66%-77%',
    officialInput: '$1.50',
    officialOutput: '$9.00',
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
              {t('Mainstream model pricing')}
            </div>
            <h1 className='waho-hero-title'>
              <span>{t('Save up to')}</span>
              <strong>86%</strong>
            </h1>
            <p className='waho-hero-subtitle'>
              {t('Compare OpenAI, Claude, and Gemini pricing per 1M tokens.')}
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

          <div
            className='waho-rate-card'
            aria-label={t('Model price comparison')}
          >
            <div className='waho-rate-card-head'>
              <span>{t('Model price comparison')}</span>
              <strong>{t('YuyuAPI model pricing')}</strong>
              <p>
                {t(
                  'Prices are shown per 1M tokens and compare official unit prices against WahoAI routing discounts.'
                )}
              </p>
            </div>
            <div className='waho-rate-table-wrap'>
              <table className='waho-rate-table'>
                <thead>
                  <tr>
                    <th>{t('Model')}</th>
                    <th>{t('Multiplier')}</th>
                    <th>{t('Input price')}</th>
                    <th>{t('Output price')}</th>
                    <th>{t('vs official')}</th>
                  </tr>
                </thead>
                <tbody>
                  {modelPriceRows.map((row) => (
                    <tr key={row.name}>
                      <th scope='row'>
                        <strong>{row.name}</strong>
                        <span>{row.provider}</span>
                      </th>
                      <td>
                        <span className='waho-rate-multiplier'>
                          {row.multiplier}
                        </span>
                      </td>
                      <td>
                        <strong className='waho-rate-price'>
                          {row.inputPrice}
                        </strong>
                        <span>/ 1M tokens</span>
                      </td>
                      <td>
                        <strong className='waho-rate-price'>
                          {row.outputPrice}
                        </strong>
                        <span>/ 1M tokens</span>
                      </td>
                      <td>
                        <span className='waho-rate-save'>
                          {t('Save discount')} {row.savings}
                        </span>
                        <span>
                          {t('Official')} {row.officialInput} /{' '}
                          {row.officialOutput}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='waho-hero-bottom'>
        <p className='waho-hero-note'>
          {t('Same mainstream model access.')}{' '}
          <em>{t('Lower routed price.')}</em> {t('Stable relay.')}
        </p>
        <div className='waho-hero-chips' aria-label={t('Gateway features')}>
          <span className='waho-chip'>{t('mainstream models')}</span>
          <span className='waho-chip'>{t('per-model rates')}</span>
          <span className='waho-chip'>{t('stable relay')}</span>
        </div>
        <div className='waho-hero-stats' aria-label={t('Gateway pulse')}>
          <div>
            <strong>86%</strong>
            <span>{t('saved')}</span>
          </div>
          <div>
            <strong>3</strong>
            <span>{t('models compared')}</span>
          </div>
          <div>
            <strong>1M</strong>
            <span>{t('token pricing')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
