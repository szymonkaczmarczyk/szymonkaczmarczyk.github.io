'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/media';
import styles from './HeroLiquid.module.css';

const words = ['strony', 'motion', 'kod', 'testy'];
const entranceDuration = 1500;

export function HeroLiquid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = rootRef.current;
    const stage = layer?.parentElement;
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!layer || !stage || !canvas || !track || prefersReducedMotion()) return;

    let stopScene = () => {};
    let cancelled = false;
    let timer = 0;
    const launch = () => {
      timer = window.setTimeout(() => {
        import('@/lib/liquidScene').then(({ startLiquidScene }) => {
          if (!cancelled) stopScene = startLiquidScene({ stage, layer, canvas, track });
        });
      }, Math.max(0, entranceDuration - performance.now()));
    };
    if (document.readyState === 'complete') launch();
    else window.addEventListener('load', launch, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('load', launch);
      stopScene();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.liquid} aria-hidden="true">
      <div className={styles.words}>
        <div ref={trackRef} className={styles.track}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.sequence}>
              {words.map((word) => (
                <span key={word} className={styles.word}>
                  {word}
                  <span className={styles.dot}>.</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
