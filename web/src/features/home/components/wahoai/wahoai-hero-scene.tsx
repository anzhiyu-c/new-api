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

const HERO_ENGINE_SRC = '/brand/wahoai-hero-engine.png'

export function WahoAIHeroScene() {
  return (
    <div className='waho-hero-scene' aria-hidden>
      <span className='waho-art-orbit waho-art-orbit-a' />
      <span className='waho-art-orbit waho-art-orbit-b' />
      <span className='waho-art-bead waho-art-bead-a' />
      <span className='waho-art-bead waho-art-bead-b' />
      <span className='waho-engine-glow' />
      <img
        src={HERO_ENGINE_SRC}
        alt=''
        className='waho-hero-engine'
        width={1054}
        height={1492}
        loading='eager'
        decoding='async'
      />
    </div>
  )
}
