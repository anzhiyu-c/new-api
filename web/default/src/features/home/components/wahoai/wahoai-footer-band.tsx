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
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function WahoAIFooterBand() {
  const { t } = useTranslation()

  return (
    <section className='waho-footer-band'>
      <div className='waho-footer-inner'>
        <AnimateInView>
          <h2 className='waho-footer-title'>
            <span>{t('Stable')}</span>
            <span>{t('AI Access')}</span>
          </h2>
        </AnimateInView>
        <AnimateInView delay={100}>
          <div className='waho-footer-copy'>
            <p>
              {t(
                'Bring teams, channels, and cost controls into one AI access layer so production traffic stays clear, measurable, and ready to scale.'
              )}
            </p>
            <div className='waho-footer-system'>
              <span>{t('Gateway ready')}</span>
              <strong>99.99%</strong>
              <span>{t('uptime')}</span>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
