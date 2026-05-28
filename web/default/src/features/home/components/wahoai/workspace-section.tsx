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
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

const WORKSPACES = [
  {
    label: '01 / API Sandbox',
    step: '01',
    title: 'One-minute integration',
    description:
      'Use an OpenAI-compatible endpoint so teams can point existing apps at WahoAI with minimal code changes.',
    status: 'Compatible endpoint',
    metric: '60 sec setup',
    code: [
      ['base_url', ' https://api.wahoai.com'],
      ['endpoint', ' /v1/responses'],
      ['model', ' gpt-4.1'],
      ['response', ' 200 OK / 142ms'],
    ],
  },
  {
    label: '02 / Route Ops',
    step: '02',
    title: 'Channel health',
    description:
      'Expose upstream health, fallback state, and latency distribution to reinforce the core promise of stable relay routing.',
    status: 'Healthy route',
    metric: '3 providers',
    code: [
      ['openai-east', ' healthy / 128ms'],
      ['claude-proxy', ' healthy / 151ms'],
      ['gemini-main', ' standby / 203ms'],
      ['routing', ' auto selected'],
    ],
  },
  {
    label: '03 / Cost Center',
    step: '03',
    title: 'Cost settlement',
    description:
      'Make usage transparency, quota control, and team-level cost ownership feel tangible before users enter the dashboard.',
    status: 'Settled usage',
    metric: 'Live cost',
    code: [
      ['tokens', ' 1,842,991 today'],
      ['cost', ' $42.18 today'],
      ['quota', ' 68% remaining'],
      ['settlement', ' completed'],
    ],
  },
]

export function WorkspaceSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 20%'],
  })
  const progressScale = useTransform(scrollYProgress, [0.08, 0.86], [0, 1])

  return (
    <section className='waho-section waho-section-stack' ref={ref}>
      <motion.span
        className='waho-workspace-progress'
        aria-hidden
        style={reduceMotion ? undefined : { scaleX: progressScale }}
      />
      <div className='waho-section-head waho-section-head-workspace'>
        <AnimateInView>
          <span className='waho-label'>{t('Operator Workspace')}</span>
          <h2 className='waho-title waho-title-workspace'>
            <span>{t('Integration')}</span>
            <span>{t('Workflow')}</span>
          </h2>
        </AnimateInView>
        <AnimateInView delay={80}>
          <div className='waho-section-copy'>
            <p>
              {t(
                'From first request to daily operations, WahoAI keeps connection, routing, and settlement in one readable workflow for developers and admins.'
              )}
            </p>
            <div className='waho-workflow-steps' aria-label={t('Workflow steps')}>
              <span>
                <strong>01</strong>
                {t('Connect')}
              </span>
              <span>
                <strong>02</strong>
                {t('Route')}
              </span>
              <span>
                <strong>03</strong>
                {t('Settle')}
              </span>
            </div>
          </div>
        </AnimateInView>
      </div>

      <div className='waho-workflow-board'>
        <div className='waho-workflow-board-head'>
          <div>
            <span className='waho-label'>{t('API Journey')}</span>
            <strong>{t('3 steps to production relay')}</strong>
          </div>
          <div className='waho-workflow-ready'>
            <span>{t('Ready endpoint')}</span>
            <strong>/v1/responses</strong>
          </div>
        </div>
        <div className='waho-workflow-grid'>
          <aside className='waho-workflow-rail-panel'>
            <span className='waho-label'>{t('Live relay path')}</span>
            <strong>{t('Request Lifecycle')}</strong>
            <div className='waho-flow-path' aria-hidden>
              <span>{t('Connect')}</span>
              <i />
              <span>{t('Route')}</span>
              <i />
              <span>{t('Settle')}</span>
            </div>
            <div className='waho-flow-metrics'>
              <div>
                <span>{t('Request in')}</span>
                <strong>142ms</strong>
              </div>
              <div>
                <span>{t('Fallback ready')}</span>
                <strong>ON</strong>
              </div>
              <div>
                <span>{t('Cost visible')}</span>
                <strong>$42.18</strong>
              </div>
            </div>
          </aside>
          <div className='waho-workspace-wrap'>
            {WORKSPACES.map((workspace, index) => (
              <WorkspaceCard
                index={index}
                key={workspace.label}
                workspace={workspace}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Workspace = (typeof WORKSPACES)[number]

function WorkspaceCard(props: {
  index: number
  workspace: Workspace
}) {
  const { t } = useTranslation()

  return (
    <AnimateInView delay={props.index * 90}>
      <article className='waho-workspace-card'>
        <div className='waho-workspace-copy'>
          <div className='waho-workspace-stepmark'>
            <span>{props.workspace.step}</span>
            <i />
          </div>
          <div>
            <span className='waho-label'>{props.workspace.label}</span>
            <h3>{t(props.workspace.title)}</h3>
            <p>{t(props.workspace.description)}</p>
            <div className='waho-workspace-badges'>
              <span>{t(props.workspace.status)}</span>
              <span>{t(props.workspace.metric)}</span>
            </div>
          </div>
        </div>
        <div className='waho-sandbox'>
          {props.workspace.code.map(([command, value]) => (
            <div className='waho-sandbox-line' key={`${command}-${value}`}>
              <span className='waho-code-blue'>{command}</span>
              <span>{value}</span>
            </div>
          ))}
          <span className='waho-sandbox-cursor' aria-hidden />
        </div>
      </article>
    </AnimateInView>
  )
}
