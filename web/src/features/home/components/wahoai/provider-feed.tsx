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

const PROVIDER_FEED = [
  { name: 'OpenAI', status: 'ACTIVE', value: '99.9%', label: 'success rate' },
  { name: 'Claude', status: 'STABLE', value: '142ms', label: 'p95 latency' },
  { name: 'Gemini', status: 'ROUTED', value: '1.8M', label: 'tokens today' },
  { name: 'DeepSeek', status: 'ACTIVE', value: '$42.18', label: 'cost today' },
  { name: 'Qwen', status: 'STABLE', value: '34', label: 'healthy keys' },
  { name: 'Azure', status: 'ROUTED', value: '8', label: 'regions online' },
  { name: 'Bedrock', status: 'ACTIVE', value: '0.04%', label: 'error rate' },
  { name: 'Vertex', status: 'STABLE', value: '203ms', label: 'fallback p95' },
  { name: 'OpenRouter', status: 'ROUTED', value: '68%', label: 'quota left' },
  { name: 'Replicate', status: 'ACTIVE', value: 'SSE', label: 'stream ready' },
]

export function ProviderFeed() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const cards = [
    ...PROVIDER_FEED.map((item) => ({ ...item, id: `primary-${item.name}` })),
    ...PROVIDER_FEED.map((item) => ({ ...item, id: `secondary-${item.name}` })),
  ]
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const trackX = useTransform(scrollYProgress, [0, 1], ['2%', '-34%'])
  const progressScale = useTransform(scrollYProgress, [0.14, 0.86], [0, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.42], [34, 0])

  return (
    <section
      className='waho-feed'
      aria-label={t('Provider status feed')}
      ref={ref}
    >
      <div className='waho-feed-inner'>
        <motion.div
          className='waho-feed-copy'
          style={reduceMotion ? undefined : { y: copyY }}
        >
          <div className='waho-feed-header'>
            <div>
              <span className='waho-label'>{t('Live Provider Routing')}</span>
              <h2 className='waho-feed-title'>
                <span>{t('Clean upstream')}</span>
                <span>{t('routing in motion')}</span>
              </h2>
              <p>{t('Scroll to inspect routing state')}</p>
            </div>
            <div className='waho-feed-console' aria-hidden>
              <div className='waho-feed-console-head'>
                <span>{t('Route monitor')}</span>
                <strong>{t('Live')}</strong>
              </div>
              <div className='waho-feed-console-grid'>
                <span>{t('healthy pool')}</span>
                <strong>34</strong>
                <span>{t('auto failover')}</span>
                <strong>203ms</strong>
                <span>{t('cost guard')}</span>
                <strong>$42.18</strong>
              </div>
            </div>
          </div>
        </motion.div>
        <div className='waho-feed-rail' aria-hidden>
          <motion.span
            style={reduceMotion ? undefined : { scaleX: progressScale }}
          />
        </div>
        <motion.div
          className='waho-feed-track'
          style={reduceMotion ? undefined : { x: trackX }}
        >
          {cards.map((item) => (
            <article className='waho-feed-card' key={item.id}>
              <div className='waho-feed-top'>
                <span>{item.name}</span>
                <span>{item.status}</span>
              </div>
              <strong>{item.value}</strong>
              <small>{t(item.label)}</small>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
