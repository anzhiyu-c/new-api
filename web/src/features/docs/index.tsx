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
import {
  AppWindow,
  ArrowRight,
  BookText,
  Bot,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileCode2,
  KeyRound,
  MessageSquareText,
  MonitorDown,
  PlugZap,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type GuideSlug = 'claude-code' | 'codex' | 'openclaw' | 'hermes'

type Guide = {
  slug: GuideSlug
  title: string
  description: string
  icon: LucideIcon
  badge: string
}

type DocsProps = {
  slug?: string
}

type StepCard = {
  title: string
  description: string
  icon: LucideIcon
}

type Field = {
  label: string
  value: string
  helper?: string
}

const guides: Guide[] = [
  {
    slug: 'claude-code',
    title: 'Claude Code',
    description: 'CC Switch 快速导入、手动安装、环境变量和验证步骤。',
    icon: BookText,
    badge: '推荐新手',
  },
  {
    slug: 'codex',
    title: 'Codex',
    description: 'Codex App、Codex CLI、CC Switch 导入和 config.toml 样例。',
    icon: Bot,
    badge: 'OpenAI 兼容',
  },
  {
    slug: 'openclaw',
    title: 'OpenClaw',
    description: 'Custom Provider、Base URL、模型前缀和验证命令。',
    icon: Workflow,
    badge: '开发工作流',
  },
  {
    slug: 'hermes',
    title: 'Hermes',
    description: 'Hermes Agent 的 Custom endpoint、config.yaml 和排错要点。',
    icon: Bot,
    badge: 'Agent',
  },
]

const quickSteps: StepCard[] = [
  {
    icon: KeyRound,
    title: '创建或复制令牌',
    description: '进入控制台的令牌管理，为不同客户端准备独立 API Key。',
  },
  {
    icon: MessageSquareText,
    title: '优先使用一键导入',
    description:
      '在令牌右侧聊天菜单选择 CC Switch、Cherry Studio 等模板，减少手填错误。',
  },
  {
    icon: PlugZap,
    title: '确认 Base URL',
    description:
      'Claude Code 使用站点根路径；OpenAI 兼容客户端通常使用带 /v1 的地址。',
  },
  {
    icon: CheckCircle2,
    title: '跑一次验证命令',
    description:
      '保存后先执行版本、模型列表或最小聊天请求，确认鉴权和模型可用。',
  },
]

const clientTemplates = [
  'CC Switch Claude Code',
  'CC Switch Codex',
  'Cherry Studio',
  'Lobe Chat',
  'OpenCat',
  'AI as Workspace',
  'AMA 问天',
]

const getGuidePath = (slug: GuideSlug) =>
  slug === 'claude-code' ? '/docs' : `/docs/${slug}`

function normalizeSlug(slug?: string): GuideSlug {
  if (slug === 'codex' || slug === 'openclaw' || slug === 'hermes') {
    return slug
  }

  return 'claude-code'
}

function getServerAddress() {
  if (typeof window === 'undefined') {
    return 'https://your-domain.example'
  }

  return window.location.origin.replace(/\/+$/, '')
}

function FieldCard(props: Field) {
  const { t } = useTranslation()

  return (
    <div className='bg-background rounded-lg border px-3 py-2'>
      <p className='text-muted-foreground text-xs'>{t(props.label)}</p>
      <p className='mt-1 font-mono text-sm font-medium break-all'>
        {props.value}
      </p>
      {props.helper ? (
        <p className='text-muted-foreground mt-2 text-xs'>{t(props.helper)}</p>
      ) : null}
    </div>
  )
}

function CodeBlock(props: { code: string; note?: string }) {
  const { t } = useTranslation()

  return (
    <div className='rounded-xl border bg-zinc-950 p-4 text-zinc-100'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 flex-1'>
          <pre className='overflow-x-auto text-sm leading-6 break-all whitespace-pre-wrap'>
            <code>{props.code}</code>
          </pre>
          {props.note ? (
            <p className='mt-2 text-xs leading-5 text-zinc-400'>
              {t(props.note)}
            </p>
          ) : null}
        </div>
        <Badge variant='secondary' className='shrink-0'>
          {t('复制')}
        </Badge>
      </div>
    </div>
  )
}

function GuideSection(props: {
  id: string
  title: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const Icon = props.icon

  return (
    <Card id={props.id} className='scroll-mt-24'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icon className='h-5 w-5' />
          {t(props.title)}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>{props.children}</CardContent>
    </Card>
  )
}

function CcSwitchGuide(props: {
  appName: 'Claude' | 'Codex'
  baseUrl: string
  modelHint: string
}) {
  const { t } = useTranslation()

  return (
    <GuideSection
      id='cc-switch'
      title='推荐：用 CC Switch 一键导入'
      icon={AppWindow}
    >
      <p className='text-muted-foreground leading-7'>
        {t(
          'CC Switch 适合不想手动改环境变量或配置文件的用户。先安装客户端，再到本站令牌管理页点击对应的一键导入入口。'
        )}
      </p>
      <div className='flex flex-wrap gap-3'>
        <Button
          variant='outline'
          render={
            <a
              href='https://github.com/farion1231/cc-switch/releases/latest'
              target='_blank'
              rel='noreferrer'
            />
          }
        >
          {t('CC Switch 下载地址')}
          <ExternalLink className='ml-1 h-4 w-4' />
        </Button>
        <Button render={<Link to='/dashboard' />}>
          {t('前往令牌管理')}
          <ArrowRight className='ml-1 h-4 w-4' />
        </Button>
      </div>
      <div className='grid gap-3 md:grid-cols-3'>
        {[
          ['1', '令牌管理', '创建或复制 API Key'],
          ['2', '聊天下拉菜单', '选择 CC Switch Claude Code 或 Codex'],
          ['3', '直接导入', '浏览器拉起 CC Switch 并写入配置'],
        ].map((step) => (
          <div key={step[0]} className='bg-muted/40 rounded-xl border p-4'>
            <div className='mb-3 flex items-center gap-2'>
              <span className='bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold'>
                {step[0]}
              </span>
              <p className='font-medium'>{t(step[1])}</p>
            </div>
            <p className='text-muted-foreground text-sm leading-6'>
              {t(step[2])}
            </p>
          </div>
        ))}
      </div>
      <div className='bg-muted/40 rounded-2xl border p-4'>
        <div className='bg-background mb-3 flex items-center justify-between rounded-xl border px-4 py-3'>
          <div className='flex items-center gap-2'>
            <AppWindow className='h-4 w-4' />
            <p className='font-medium'>{t('CC Switch 配置示意')}</p>
          </div>
          <Badge>{t('新增服务')}</Badge>
        </div>
        <div className='grid gap-3 md:grid-cols-2'>
          <FieldCard label='Name' value={`AI Gateway - ${props.appName}`} />
          <FieldCard label='Base URL' value={props.baseUrl} />
          <FieldCard label='API Key' value='sk-... 你的本站令牌' />
          <FieldCard label='Model' value={props.modelHint} />
        </div>
      </div>
      <ol className='text-muted-foreground list-decimal space-y-2 pl-5 text-sm leading-6'>
        <li>{t('打开本站「令牌管理」，找到要使用的 API Key。')}</li>
        <li>
          {t('点击该令牌右侧「聊天」下拉菜单，选择对应的 CC Switch 项。')}
        </li>
        <li>{t('浏览器会拉起 CC Switch，并自动写入 Base URL 和当前令牌。')}</li>
        <li>{t('默认模型可在 CC Switch 中按需调整。')}</li>
      </ol>
    </GuideSection>
  )
}

function ClaudeGuide(props: { serverAddress: string }) {
  const { t } = useTranslation()
  const baseUrl = props.serverAddress

  return (
    <div className='space-y-6'>
      <div>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Badge>{t('推荐新手')}</Badge>
          <Badge variant='secondary'>Claude Code</Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('Claude Code 配置手册')}
        </h1>
        <p className='text-muted-foreground mt-3 leading-7'>
          {t(
            'Claude Code 接入本站时使用 Claude 风格根路径。新手优先走 CC Switch；手动配置时不要在 ANTHROPIC_BASE_URL 后追加 /v1。'
          )}
        </p>
      </div>
      <Card className='border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20'>
        <CardContent className='pt-6 text-sm leading-7'>
          {t(
            '如果你觉得门槛高，优先走 CC Switch：安装客户端 → 令牌管理 → 聊天下拉菜单 → 选择 CC Switch Claude Code → 自动导入。手动命令只作为备用方式。'
          )}
        </CardContent>
      </Card>
      <CcSwitchGuide
        appName='Claude'
        baseUrl={baseUrl}
        modelHint='claude-opus-4-7'
      />
      <GuideSection id='manual' title='备用：手动安装与配置' icon={Terminal}>
        <p className='text-muted-foreground leading-7'>
          {t('已经熟悉终端的用户可以直接按下面步骤操作。')}
        </p>
        <CodeBlock
          code={`node -v\nnpm -v\ngit --version`}
          note='三条命令都能输出版本号再继续。'
        />
        <CodeBlock
          code='npm install -g @anthropic-ai/claude-code'
          note='安装 Claude Code 官方 npm 包。'
        />
        <CodeBlock
          code={`export ANTHROPIC_BASE_URL="${baseUrl}"\nexport ANTHROPIC_AUTH_TOKEN="你的API_KEY"`}
          note='macOS / Linux 当前终端临时生效；长期使用可写入 ~/.zshrc 或 ~/.bashrc。'
        />
        <CodeBlock
          code={`$env:ANTHROPIC_BASE_URL="${baseUrl}"\n$env:ANTHROPIC_AUTH_TOKEN="你的API_KEY"`}
          note='Windows PowerShell 当前窗口临时生效。'
        />
      </GuideSection>
      <GuideSection id='verify' title='验证是否跑通' icon={CheckCircle2}>
        <CodeBlock
          code='claude -v'
          note='能看到 claude-code 版本号说明安装成功。'
        />
        <p className='text-muted-foreground leading-7'>
          {t(
            '进入任意项目目录后执行 claude。如果提示鉴权失败，优先检查 API Key 是否完整、Base URL 是否没有多余 /v1。'
          )}
        </p>
      </GuideSection>
    </div>
  )
}

function CodexGuide(props: { serverAddress: string }) {
  const { t } = useTranslation()
  const baseUrl = `${props.serverAddress}/v1`
  const configToml = `model = "gpt-5.3-codex"\nmodel_provider = "newapi"\napproval_policy = "on-request"\nsandbox_mode = "workspace-write"\n\n[model_providers.newapi]\nname = "AI Gateway"\nbase_url = "${baseUrl}"\nenv_key = "OPENAI_API_KEY"\nwire_api = "responses"`

  return (
    <div className='space-y-6'>
      <div>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Badge>Codex</Badge>
          <Badge variant='secondary'>App / CLI</Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('Codex 配置手册')}
        </h1>
        <p className='text-muted-foreground mt-3 leading-7'>
          {t('Codex 使用 OpenAI 兼容地址，Base URL 必须带 /v1。')}
        </p>
      </div>
      <CcSwitchGuide
        appName='Codex'
        baseUrl={baseUrl}
        modelHint='gpt-5.3-codex'
      />
      <GuideSection id='codex-app' title='先下载 Codex App' icon={MonitorDown}>
        <p className='text-muted-foreground leading-7'>
          {t(
            'OpenAI 官方 Codex App 支持桌面端。想少碰命令行，可以先安装 App；喜欢终端再补 CLI。'
          )}
        </p>
        <div className='flex flex-wrap gap-3'>
          <Button
            variant='outline'
            render={
              <a
                href='https://developers.openai.com/codex/app'
                target='_blank'
                rel='noreferrer'
              />
            }
          >
            {t('Codex App 下载地址')}
            <ExternalLink className='ml-1 h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            render={
              <a
                href='https://developers.openai.com/codex/ide'
                target='_blank'
                rel='noreferrer'
              />
            }
          >
            {t('Codex IDE 插件')}
            <ExternalLink className='ml-1 h-4 w-4' />
          </Button>
        </div>
      </GuideSection>
      <GuideSection id='cli' title='备用：Codex CLI 安装' icon={Terminal}>
        <CodeBlock code='npm install -g @openai/codex' />
        <CodeBlock
          code={`export OPENAI_BASE_URL="${baseUrl}"\nexport OPENAI_API_KEY="你的API_KEY"`}
          note='macOS / Linux 当前终端临时生效。'
        />
        <CodeBlock
          code={`$env:OPENAI_BASE_URL="${baseUrl}"\n$env:OPENAI_API_KEY="你的API_KEY"`}
          note='Windows PowerShell 当前窗口临时生效。'
        />
      </GuideSection>
      <GuideSection
        id='config-toml'
        title='config.toml 配置样例'
        icon={FileCode2}
      >
        <p className='text-muted-foreground leading-7'>
          {t(
            '如果需要固定默认模型和服务商，可以把下面内容写入 ~/.codex/config.toml。API Key 建议放在系统环境变量里。'
          )}
        </p>
        <CodeBlock code={configToml} />
      </GuideSection>
      <GuideSection id='verify' title='验证是否跑通' icon={CheckCircle2}>
        <CodeBlock
          code={`codex --version\ncodex`}
          note='进入项目目录后运行，选择模型或直接开始任务。'
        />
        <p className='text-muted-foreground leading-7'>
          {t(
            '如果提示模型不可用，先确认当前账号分组可见 gpt-5.3-codex；如果提示网络或鉴权失败，检查 OPENAI_BASE_URL 是否带 /v1。'
          )}
        </p>
      </GuideSection>
    </div>
  )
}

function OpenClawGuide(props: { serverAddress: string }) {
  const { t } = useTranslation()
  const baseUrl = `${props.serverAddress}/v1`

  return (
    <div className='space-y-6'>
      <div>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Badge>OpenClaw</Badge>
          <Badge variant='secondary'>OpenAI-compatible</Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('OpenClaw 配置手册')}
        </h1>
        <p className='text-muted-foreground mt-3 leading-7'>
          {t(
            'OpenClaw 接本站时走 OpenAI 兼容接口。最容易填错的是模型名前缀，默认模型建议写成 newapi/模型ID。'
          )}
        </p>
      </div>
      <GuideSection
        id='quick-copy'
        title='复制给 OpenClaw 的配置说明'
        icon={Copy}
      >
        <div className='grid gap-3 md:grid-cols-2'>
          <FieldCard label='Base URL' value={baseUrl} />
          <FieldCard label='默认模型' value='newapi/gpt-5.3-codex' />
          <FieldCard label='API' value='openai-completions' />
          <FieldCard label='Endpoint ID' value='newapi' />
        </div>
      </GuideSection>
      <GuideSection id='setup' title='手动接入步骤' icon={Workflow}>
        <p className='text-muted-foreground leading-7'>
          {t(
            '先在本站创建或复制令牌，再运行 OpenClaw 的接入向导。模型 ID 可以在模型广场查看，或通过 /v1/models 接口查询。'
          )}
        </p>
        <CodeBlock
          code='npm install -g openclaw@latest'
          note='已安装过 OpenClaw 的用户可跳过。'
        />
        <CodeBlock
          code={`export NEWAPI_API_KEY="你的API_KEY"\nopenclaw onboard`}
          note='Windows PowerShell 使用 $env:NEWAPI_API_KEY="你的API_KEY"。'
        />
        <ol className='text-muted-foreground list-decimal space-y-2 pl-5 text-sm leading-6'>
          <li>{t('Provider 选择 Custom Provider 或 OpenAI-compatible。')}</li>
          <li>{t('Base URL 填带 /v1 的本站地址。')}</li>
          <li>{t('API Key 填本站令牌，或读取环境变量。')}</li>
          <li>{t('Endpoint ID 填 newapi。')}</li>
        </ol>
      </GuideSection>
      <GuideSection id='verify' title='验证是否跑通' icon={CheckCircle2}>
        <CodeBlock code={`openclaw models status\nopenclaw doctor`} />
        <p className='text-muted-foreground leading-7'>
          {t(
            '如果模型列表为空，先检查 API Key 是否属于当前站点令牌；如果模型调用报错，优先检查默认模型是否带了 newapi/ 前缀。'
          )}
        </p>
      </GuideSection>
    </div>
  )
}

function HermesGuide(props: { serverAddress: string }) {
  const { t } = useTranslation()
  const baseUrl = `${props.serverAddress}/v1`
  const configYaml = `model:\n  provider: custom\n  default: gpt-5.3-codex\n  base_url: ${baseUrl}\n  api_key: \${NEWAPI_API_KEY}\n\nagent:\n  name: Hermes\n  default_persona: default`

  return (
    <div className='space-y-6'>
      <div>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Badge>Hermes</Badge>
          <Badge variant='secondary'>Custom endpoint</Badge>
        </div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('Hermes 配置手册')}
        </h1>
        <p className='text-muted-foreground mt-3 leading-7'>
          {t(
            'Hermes Agent 支持自定义 OpenAI 兼容服务。本站配置只需要 Base URL、API Key 和模型 ID。'
          )}
        </p>
      </div>
      <GuideSection id='fields' title='推荐填写项' icon={KeyRound}>
        <div className='grid gap-3 md:grid-cols-2'>
          <FieldCard
            label='Provider'
            value='Custom endpoint / OpenAI-compatible'
          />
          <FieldCard label='Base URL' value={baseUrl} />
          <FieldCard label='API Key' value='本站令牌 sk-...' />
          <FieldCard label='Model' value='gpt-5.3-codex' />
        </div>
        <p className='text-muted-foreground text-sm leading-6'>
          {t(
            '如果账号分组没有 gpt-5.3-codex，可在模型广场选择当前可用模型，把模型 ID 原样填进去。'
          )}
        </p>
      </GuideSection>
      <GuideSection id='interactive' title='交互式配置' icon={Terminal}>
        <CodeBlock
          code={`export NEWAPI_API_KEY="你的API_KEY"\nhermes model`}
          note='Windows PowerShell 使用 $env:NEWAPI_API_KEY="你的API_KEY"。'
        />
      </GuideSection>
      <GuideSection id='config-yaml' title='config.yaml 写法' icon={FileCode2}>
        <p className='text-muted-foreground leading-7'>
          {t(
            '如果想手动维护配置，可以把下面内容写入 Hermes 配置文件，再把令牌放到环境变量或 .env 中。'
          )}
        </p>
        <CodeBlock code={configYaml} />
      </GuideSection>
      <GuideSection id='verify' title='验证是否跑通' icon={CheckCircle2}>
        <CodeBlock code={`hermes --version\nhermes chat`} />
        <p className='text-muted-foreground leading-7'>
          {t(
            '如果提示 401，检查 API Key；如果提示 404 或模型不存在，检查 Base URL 是否带 /v1，以及模型 ID 是否属于当前账号可用分组。'
          )}
        </p>
      </GuideSection>
    </div>
  )
}

function CommonSetup(props: { serverAddress: string }) {
  const { t } = useTranslation()
  const fields: Field[] = [
    {
      label: '站点根路径',
      value: props.serverAddress,
      helper: '用于 Claude Code 的 ANTHROPIC_BASE_URL。',
    },
    {
      label: 'OpenAI 兼容地址',
      value: `${props.serverAddress}/v1`,
      helper:
        '用于 Codex、OpenClaw、Hermes、Cherry Studio 等 OpenAI-compatible 客户端。',
    },
    {
      label: 'API Key',
      value: 'sk-... 你的本站令牌',
      helper: '在控制台 → 令牌管理中创建或复制。',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('通用配置规则')}</CardTitle>
        <CardDescription>
          {t('先分清根路径和 /v1 地址，绝大多数接入问题都来自这里。')}
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-3 md:grid-cols-3'>
        {fields.map((field) => (
          <FieldCard key={field.label} {...field} />
        ))}
      </CardContent>
    </Card>
  )
}

function renderGuide(slug: GuideSlug, serverAddress: string) {
  if (slug === 'codex') {
    return <CodexGuide serverAddress={serverAddress} />
  }

  if (slug === 'openclaw') {
    return <OpenClawGuide serverAddress={serverAddress} />
  }

  if (slug === 'hermes') {
    return <HermesGuide serverAddress={serverAddress} />
  }

  return <ClaudeGuide serverAddress={serverAddress} />
}

export function Docs(props: DocsProps) {
  const { t } = useTranslation()
  const selectedSlug = normalizeSlug(props.slug)
  const selectedGuide =
    guides.find((guide) => guide.slug === selectedSlug) ?? guides[0]
  const serverAddress = useMemo(() => getServerAddress(), [])

  return (
    <PublicLayout showMainContainer={false}>
      <main className='bg-background min-h-screen overflow-hidden'>
        <section className='relative border-b'>
          <div className='bg-primary/10 absolute inset-x-0 top-0 h-64 blur-3xl' />
          <div className='relative container mx-auto px-4 py-16 sm:py-20 lg:py-24'>
            <div className='mx-auto max-w-4xl text-center'>
              <Badge variant='secondary' className='mb-6'>
                {t('站内文档教程')}
              </Badge>
              <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                {t('从令牌到客户端，一页跑通本站接入')}
              </h1>
              <p className='text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8'>
                {t(
                  '这里不是外部跳转链接，而是站内教程：覆盖令牌、模型广场、CC Switch、Claude Code、Codex、OpenClaw、Hermes 和常见排错。'
                )}
              </p>
              <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
                <Button size='lg' render={<Link to='/dashboard' />}>
                  {t('打开控制台')}
                  <ArrowRight className='ml-1 h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  render={<Link to='/pricing' />}
                >
                  {t('查看模型广场')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className='container mx-auto px-4 py-12 sm:py-16'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {quickSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={step.title} className='relative'>
                  <CardHeader>
                    <div className='bg-primary/10 text-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg'>
                      <Icon className='h-5 w-5' />
                    </div>
                    <CardTitle className='flex items-center gap-2'>
                      <span className='text-muted-foreground text-sm'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {t(step.title)}
                    </CardTitle>
                    <CardDescription>{t(step.description)}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        <section className='container mx-auto grid gap-8 px-4 pb-16 lg:grid-cols-[260px_1fr]'>
          <aside className='lg:sticky lg:top-20 lg:self-start'>
            <div className='rounded-xl border p-4'>
              <p className='mb-3 text-sm font-medium'>{t('文档')}</p>
              <nav className='grid gap-2'>
                {guides.map((guide) => {
                  const Icon = guide.icon
                  const active = guide.slug === selectedSlug
                  return (
                    <Link
                      key={guide.slug}
                      to={getGuidePath(guide.slug)}
                      className={`rounded-lg px-3 py-3 no-underline transition-colors ${
                        active
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <Icon className='h-4 w-4' />
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-medium'>
                            {guide.title}
                          </p>
                          <p className='text-muted-foreground truncate text-xs'>
                            {t(guide.badge)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </nav>
              <Separator className='my-4' />
              <div className='space-y-2'>
                <p className='text-muted-foreground text-xs'>
                  {t('聊天应用模板')}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {clientTemplates.map((client) => (
                    <Badge key={client} variant='outline'>
                      {client}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <div className='mb-2 flex flex-wrap gap-2'>
                  <Badge>{t(selectedGuide.badge)}</Badge>
                  <Badge variant='secondary'>{selectedGuide.title}</Badge>
                </div>
                <CardTitle>{selectedGuide.title}</CardTitle>
                <CardDescription>
                  {t(selectedGuide.description)}
                </CardDescription>
              </CardHeader>
            </Card>
            <CommonSetup serverAddress={serverAddress} />
            {renderGuide(selectedSlug, serverAddress)}
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
