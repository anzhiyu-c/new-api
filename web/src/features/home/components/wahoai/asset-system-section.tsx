import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
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
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

const ASSETS = [
  {
    title: 'Smart Route Lines',
    description:
      'Route each request across healthy upstream channels with policy-aware fallback.',
    visual: 'routes',
  },
  {
    title: 'Provider Health Nodes',
    description:
      'Track upstream capacity, key status, and regional availability before traffic moves.',
    visual: 'orbit',
  },
  {
    title: 'Usage Signal Cards',
    description:
      'Keep cost, quota, latency, and stream status close to the teams operating the gateway.',
    visual: 'terminal',
  },
]

const CAPABILITIES = [
  {
    number: '01',
    title: 'Unified model routing',
    description:
      'Normalize OpenAI, Claude, Gemini, Azure, Bedrock, and other upstream services into one operable API gateway.',
    metric: '40+',
    metricLabel: 'providers',
  },
  {
    number: '02',
    title: 'Usage settlement',
    description:
      'Track spend by model, group, subscription, and key so operators can price and control usage clearly.',
    metric: '$0.00084',
    metricLabel: 'request cost',
  },
  {
    number: '03',
    title: 'Key safety control',
    description:
      'Centralize API keys, rate limits, permissions, audit logs, and abnormal request controls.',
    metric: 'Shield',
    metricLabel: 'audit / limit',
  },
]

export function AssetSystemSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 18%'],
  })
  const stageY = useTransform(scrollYProgress, [0, 1], [42, -36])
  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.96, 1, 0.985]
  )
  const laneScale = useTransform(scrollYProgress, [0.08, 0.72], [0, 1])

  return (
    <section className='waho-section waho-section-white' ref={ref}>
      <motion.span
        className='waho-scroll-lane'
        aria-hidden
        style={reduceMotion ? undefined : { scaleX: laneScale }}
      />
      <div className='waho-section-head waho-section-head-route'>
        <AnimateInView>
          <span className='waho-label'>{t('Unified Control Plane')}</span>
          <h2 className='waho-title waho-title-route'>
            <span>{t('Routing')}</span>
            <span>{t('Control')}</span>
          </h2>
          <div className='waho-title-tabs' aria-label={t('Routing layers')}>
            <span>{t('Policy')}</span>
            <span>{t('Health')}</span>
            <span>{t('Settlement')}</span>
          </div>
        </AnimateInView>
        <AnimateInView delay={80}>
          <div className='waho-section-copy'>
            <p>
              {t(
                'WahoAI turns many upstream model services into one calm operating layer: route by policy, watch health in real time, and keep usage settlement visible from the first request.'
              )}
            </p>
            <div className='waho-head-cluster'>
              <div className='waho-head-stat'>
                <strong>40+</strong>
                <span>{t('connected providers')}</span>
              </div>
              <div
                className='waho-route-panel'
                aria-label={t('Routing layers')}
              >
                <div>
                  <span>{t('Policy Engine')}</span>
                  <strong>{t('model + group')}</strong>
                </div>
                <div>
                  <span>{t('Health Probe')}</span>
                  <strong>142ms</strong>
                </div>
                <div>
                  <span>{t('Cost Ledger')}</span>
                  <strong>{t('settled')}</strong>
                </div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>

      <motion.div
        className='waho-asset-strip'
        style={reduceMotion ? undefined : { y: stageY, scale: stageScale }}
      >
        {ASSETS.map((asset, index) => (
          <AnimateInView key={asset.title} delay={index * 80}>
            <article className='waho-asset'>
              <h3>{t(asset.title)}</h3>
              <p>{t(asset.description)}</p>
              <AssetVisual type={asset.visual} />
            </article>
          </AnimateInView>
        ))}
      </motion.div>

      <div className='waho-services'>
        {CAPABILITIES.map((item, index) => (
          <AnimateInView key={item.number} delay={index * 90}>
            <article className='waho-service'>
              <div className='waho-service-num'>{item.number}</div>
              <div>
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </div>
              <div className='waho-service-mini'>
                <strong>{item.metric}</strong>
                <span>{t(item.metricLabel)}</span>
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}

function AssetVisual(props: { type: string }) {
  if (props.type === 'routes') {
    return (
      <svg viewBox='0 0 220 150' aria-hidden>
        <path
          d='M10 98C60 34 102 130 156 62S210 35 236 54'
          fill='none'
          stroke='#168cff'
          strokeLinecap='round'
          strokeWidth='8'
          opacity='.35'
        />
        <path
          d='M20 120C88 68 116 96 178 28'
          fill='none'
          stroke='#62efff'
          strokeDasharray='10 10'
          strokeLinecap='round'
          strokeWidth='4'
        />
      </svg>
    )
  }

  if (props.type === 'orbit') {
    return (
      <svg viewBox='0 0 220 150' aria-hidden>
        <circle
          cx='120'
          cy='76'
          r='48'
          fill='none'
          stroke='#168cff'
          opacity='.25'
        />
        <circle cx='120' cy='76' r='24' fill='#e8f8ff' />
        <circle cx='74' cy='60' r='9' fill='#b501a7' />
        <circle cx='162' cy='45' r='7' fill='#16c172' />
        <circle cx='157' cy='105' r='10' fill='#168cff' />
      </svg>
    )
  }

  return (
    <svg viewBox='0 0 220 150' aria-hidden>
      <rect x='40' y='30' width='150' height='92' rx='8' fill='#0b1018' />
      <rect x='58' y='53' width='70' height='8' rx='4' fill='#168cff' />
      <rect x='58' y='73' width='112' height='8' rx='4' fill='#64748b' />
      <rect x='58' y='93' width='92' height='8' rx='4' fill='#16c172' />
    </svg>
  )
}
