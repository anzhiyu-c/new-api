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
import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isGsapRegistered = false

export function useWahoAIGsapStory(
  rootRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    if (reducedMotionQuery.matches) return

    if (!isGsapRegistered) {
      gsap.registerPlugin(ScrollTrigger)
      isGsapRegistered = true
    }

    const ctx = gsap.context(() => {
      gsap.set('.waho-story-spine-fill', {
        scaleY: 0,
        transformOrigin: 'top center',
      })

      gsap.to('.waho-story-spine-fill', {
        ease: 'none',
        scaleY: 1,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
        },
      })

      const chapters = [
        '.waho-hero',
        '.waho-feed',
        '.waho-section-white',
        '.waho-section-dark',
        '.waho-section-stack',
        '.waho-footer-band',
      ]
      const dots = gsap.utils.toArray<HTMLElement>('.waho-story-dot')

      chapters.forEach((selector, index) => {
        const chapter = root.querySelector(selector)
        const dot = dots[index]
        if (!chapter || !dot) return

        ScrollTrigger.create({
          trigger: chapter,
          start: 'top center',
          end: 'bottom center',
          toggleClass: { targets: dot, className: 'is-active' },
        })
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.waho-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
        .to(
          '.waho-hero-title',
          {
            autoAlpha: 0.58,
            ease: 'none',
            scale: 0.86,
            yPercent: -8,
          },
          0
        )
        .to(
          '.waho-hero-scene',
          {
            ease: 'none',
            scale: 0.94,
            yPercent: -18,
          },
          0
        )
        .to(
          '.waho-hero-grid',
          {
            autoAlpha: 0.42,
            ease: 'none',
            yPercent: 16,
          },
          0
        )
        .to(
          '.waho-hero-bottom',
          {
            autoAlpha: 0.72,
            ease: 'none',
            yPercent: -20,
          },
          0.08
        )

      gsap.fromTo(
        '.waho-feed-console',
        { autoAlpha: 0, scale: 0.95, y: 34 },
        {
          autoAlpha: 1,
          ease: 'power3.out',
          scale: 1,
          scrollTrigger: {
            trigger: '.waho-feed-copy',
            start: 'top 78%',
            end: 'top 34%',
            scrub: 0.75,
          },
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-feed-card',
        { autoAlpha: 0.56, rotationX: -8, y: 44 },
        {
          autoAlpha: 1,
          ease: 'power2.out',
          rotationX: 0,
          scrollTrigger: {
            trigger: '.waho-feed-track',
            start: 'top 86%',
            end: 'top 34%',
            scrub: 0.9,
          },
          stagger: 0.035,
          y: 0,
        }
      )

      gsap.utils.toArray<HTMLElement>('.waho-title').forEach((title) => {
        const lines = title.querySelectorAll('span')
        gsap.fromTo(
          lines,
          { autoAlpha: 0, yPercent: 36 },
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            stagger: 0.08,
            yPercent: 0,
          }
        )
      })

      gsap.fromTo(
        '.waho-title-tabs span, .waho-route-panel div, .waho-head-stat',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-section-head-route',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.055,
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-asset',
        { autoAlpha: 0, scale: 0.96, y: 52 },
        {
          autoAlpha: 1,
          ease: 'power3.out',
          scale: 1,
          scrollTrigger: {
            trigger: '.waho-asset-strip',
            start: 'top 78%',
            end: 'top 34%',
            scrub: 0.85,
          },
          stagger: 0.08,
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-service',
        { autoAlpha: 0, x: -34 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-services',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.11,
          x: 0,
        }
      )

      gsap.fromTo(
        '.waho-telemetry-chips span',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-monitor-copy',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.07,
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-dashboard-shell',
        { rotateX: 8, scale: 0.92, y: 70 },
        {
          ease: 'none',
          rotateX: 0,
          scale: 1,
          scrollTrigger: {
            trigger: '.waho-section-dark',
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.9,
          },
          y: -8,
        }
      )

      gsap.fromTo(
        '.waho-workflow-board',
        { autoAlpha: 0.86, scale: 0.985, y: 64 },
        {
          autoAlpha: 1,
          ease: 'power3.out',
          scale: 1,
          scrollTrigger: {
            trigger: '.waho-section-head-workspace',
            start: 'top 72%',
            end: 'bottom 34%',
            scrub: 0.8,
          },
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-flow-path span, .waho-flow-metrics div',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-workflow-rail-panel',
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.07,
          y: 0,
        }
      )

      gsap.fromTo(
        '.waho-workspace-card',
        { autoAlpha: 0.76, y: 36 },
        {
          autoAlpha: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-workflow-board',
            start: 'top 74%',
            end: 'bottom 48%',
            scrub: 0.75,
          },
          stagger: 0.08,
          y: 0,
        }
      )

      gsap.utils.toArray<HTMLElement>('.waho-workspace-card').forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('.waho-sandbox-line'),
          { autoAlpha: 0.38, x: -12 },
          {
            autoAlpha: 1,
            duration: 0.42,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
            stagger: 0.06,
            x: 0,
          }
        )
      })

      gsap.fromTo(
        '.waho-footer-title span, .waho-footer-copy > *',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waho-footer-band',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.08,
          y: 0,
        }
      )
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
