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

const BARS = [
  42, 66, 50, 86, 74, 94, 61, 78, 98, 69, 88, 76, 92, 57, 81, 70,
].map((height, index) => ({
  id: `bar-${index + 1}`,
  height,
}))

export function TelemetrySection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 18%'],
  })
  const dashboardY = useTransform(scrollYProgress, [0, 1], [56, -28])
  const dashboardRotate = useTransform(scrollYProgress, [0, 1], [3, -1])
  const dashboardScale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.94, 1, 0.98]
  )
  const barScale = useTransform(scrollYProgress, [0.08, 0.76], [0.18, 1])
  const scanX = useTransform(scrollYProgress, [0, 1], ['-18%', '118%'])

  return (
    <section className='waho-section waho-section-dark' ref={ref}>
      <motion.span
        className='waho-telemetry-scan'
        aria-hidden
        style={reduceMotion ? undefined : { x: scanX }}
      />
      <div className='waho-monitor'>
        <AnimateInView className='waho-monitor-copy'>
          <span className='waho-label'>{t('Gateway Telemetry')}</span>
          <h2 className='waho-title waho-title-telemetry'>
            <span>{t('Live')}</span>
            <span>{t('Operations')}</span>
          </h2>
          <div className='waho-title-meter'>
            <span>{t('current p95')}</span>
            <strong>142ms</strong>
          </div>
          <div
            className='waho-telemetry-chips'
            aria-label={t('Telemetry summary')}
          >
            <span>
              <strong>99.92%</strong>
              {t('success')}
            </span>
            <span>
              <strong>1.8M</strong>
              {t('tokens today')}
            </span>
            <span>
              <strong>$42.18</strong>
              {t('cost today')}
            </span>
          </div>
          <p>
            {t(
              'Watch request volume, success rate, latency, spend, and upstream health together so routing decisions feel observable instead of opaque.'
            )}
          </p>
        </AnimateInView>
        <AnimateInView
          className='waho-dashboard-shell'
          delay={120}
          animation='scale-in'
        >
          <motion.div
            className='waho-dashboard'
            style={
              reduceMotion
                ? undefined
                : {
                    rotate: dashboardRotate,
                    scale: dashboardScale,
                    y: dashboardY,
                  }
            }
          >
            <div className='waho-terminal-head'>
              <span>{t('provider health index')}</span>
              <span>{t('last 24h')}</span>
            </div>
            <div className='waho-bars' aria-hidden>
              {BARS.map((bar, index) => (
                <div
                  className='waho-bar'
                  key={bar.id}
                  style={{
                    height: `${bar.height}%`,
                    animationDelay: `${(index % 5) * -0.2}s`,
                  }}
                >
                  <motion.span
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            scaleY: barScale,
                          }
                    }
                  />
                </div>
              ))}
            </div>
            <div className='waho-metrics'>
              <Metric value='99.92%' label='success' />
              <Metric value='142ms' label='p95 latency' />
              <Metric value='1.8M' label='tokens today' />
            </div>
          </motion.div>
        </AnimateInView>
      </div>
    </section>
  )
}

function Metric(props: { value: string; label: string }) {
  const { t } = useTranslation()

  return (
    <div className='waho-metric'>
      <strong>{props.value}</strong>
      <span>{t(props.label)}</span>
    </div>
  )
}
