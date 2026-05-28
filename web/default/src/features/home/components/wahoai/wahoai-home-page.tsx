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
import { AssetSystemSection } from './asset-system-section'
import { ProviderFeed } from './provider-feed'
import { TelemetrySection } from './telemetry-section'
import { useWahoAIGsapStory } from './use-wahoai-gsap-story'
import { WahoAIFooterBand } from './wahoai-footer-band'
import { WahoAIHero } from './wahoai-hero'
import { WorkspaceSection } from './workspace-section'

interface WahoAIHomePageProps {
  isAuthenticated: boolean
}

export function WahoAIHomePage(props: WahoAIHomePageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  useWahoAIGsapStory(rootRef)

  return (
    <div className='waho-home' ref={rootRef}>
      <div className='waho-grain' aria-hidden />
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
