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
import { IconTelegram, IconWeChat } from '@/assets/brand-icons'
import { AnimateInView } from '@/components/animate-in-view'

const SUPPORT_WECHAT_QR_SRC = 'https://be.dexcloud.live/wechat-qr.png'
const SUPPORT_WECHAT_ID = 'even2020519'
const SUPPORT_TELEGRAM_ID = '@jasonless'

export function WahoAIFooterBand() {
  const { t } = useTranslation()

  return (
    <section className='waho-footer-band' id='support'>
      <div className='waho-footer-inner'>
        <AnimateInView>
          <h2 className='waho-footer-title'>
            <span>{t('Need help?')}</span>
            <span>{t('Talk to us')}</span>
          </h2>
        </AnimateInView>
        <AnimateInView delay={100}>
          <div className='waho-footer-copy'>
            <p>
              {t(
                'For account setup, model access, recharge, or integration questions, reach support through WeChat or Telegram.'
              )}
            </p>
            <div
              className='waho-support-card'
              aria-label={t('Support contacts')}
            >
              <div className='waho-support-qr'>
                <img
                  src={SUPPORT_WECHAT_QR_SRC}
                  alt={t('WeChat support QR code')}
                  width={180}
                  height={180}
                  loading='lazy'
                />
              </div>
              <div className='waho-support-details'>
                <span className='waho-support-label'>
                  {t('Scan to add WeChat support')}
                </span>
                <div className='waho-support-contact'>
                  <IconWeChat className='size-4' aria-hidden />
                  <span>{t('WeChat')}</span>
                  <strong>{SUPPORT_WECHAT_ID}</strong>
                </div>
                <a
                  className='waho-support-contact'
                  href='https://t.me/jasonless'
                  target='_blank'
                  rel='noreferrer'
                >
                  <IconTelegram className='size-4' aria-hidden />
                  <span>{t('Telegram')}</span>
                  <strong>{SUPPORT_TELEGRAM_ID}</strong>
                </a>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
