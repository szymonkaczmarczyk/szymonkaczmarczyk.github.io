'use client';

import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove('js-motion');
      return;
    }

    let teardown = () => {};
    let cancelled = false;
    const usesSmoothScroll = hasFinePointer();

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), usesSmoothScroll ? import('lenis') : null]).then(
      ([{ gsap }, { ScrollTrigger }, lenisModule]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = lenisModule ? new lenisModule.default({ lerp: 0.1, anchors: { offset: -24 } }) : null;
        const advanceLenis = (time: number) => lenis?.raf(time * 1000);
        if (lenis) {
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add(advanceLenis);
          gsap.ticker.lagSmoothing(0);
        }

        const context = gsap.context(() => {
          ScrollTrigger.batch('[data-reveal]', {
            start: 'top 90%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
          });

          ScrollTrigger.batch('[data-reveal-media]', {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { clipPath: 'inset(18% 0% 0% 0% round 20px)' },
                { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.3, ease: 'expo.out', stagger: 0.12, clearProps: 'clipPath', onComplete: () => batch.forEach((element) => element.removeAttribute('data-reveal-media')) },
              ),
          });

          const screen = document.querySelector<HTMLElement>('[data-screen]');
          const screenFrame = screen?.querySelector<HTMLElement>('[data-screen-frame]');
          const screenCaption = screen?.querySelector<HTMLElement>('figcaption');
          if (screen && screenFrame && screenCaption) {
            const contentWidth = () => {
              const style = getComputedStyle(screenCaption);
              return screenCaption.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            const startScale = () => contentWidth() / screenFrame.offsetWidth;
            gsap
              .timeline({
                scrollTrigger: { trigger: screen, start: 'clamp(top 75%)', end: 'top top', scrub: 0.6, invalidateOnRefresh: true },
              })
              .fromTo(
                screenFrame,
                { scale: startScale, borderRadius: () => 20 / startScale() },
                { scale: 1, borderRadius: 0, ease: 'none' },
                0,
              )
              .fromTo(
                screenCaption,
                { y: () => -(1 - startScale()) * screenFrame.offsetHeight },
                { y: 0, ease: 'none' },
                0,
              );
          }
        });
        root.classList.add('motion-ready');

        teardown = () => {
          context.revert();
          gsap.ticker.remove(advanceLenis);
          lenis?.destroy();
        };
      },
    );

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return <>{children}</>;
}
