'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { LiveSite } from '@/data/prace';
import { Icon } from './Icon';
import styles from './LiveCard.module.css';

type PreviewState = 'poster' | 'loading' | 'live' | 'linked';

const frameWidth = 1440;
const loadTimeoutMs = 12000;

export function LiveCard({ site }: { site: LiveSite }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [state, setState] = useState<PreviewState>(site.allowsEmbedding ? 'poster' : 'linked');
  const host = new URL(site.url).host;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / frameWidth));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state !== 'loading') return;
    const timer = window.setTimeout(() => setState('linked'), loadTimeoutMs);
    return () => window.clearTimeout(timer);
  }, [state]);

  const activate = () => {
    if (state === 'poster') setState('loading');
  };

  const activateOnHover = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') activate();
  };

  const showsFrame = state === 'loading' || state === 'live';

  return (
    <article className={styles.card}>
      <div className={styles.body} data-reveal>
        <h3 className={styles.host}>{host}</h3>
        <p className={styles.kind}>{site.kind}</p>
        <p className={styles.summary}>{site.summary}</p>
        <a className="button button--ghost" href={site.url} target="_blank" rel="noopener noreferrer">
          otwórz stronę
          <span className="button__icon">
            <Icon name="external" size={18} />
          </span>
          <span className="visually-hidden">{host} (otwiera się w nowej karcie)</span>
        </a>
      </div>
      <div
        ref={viewportRef}
        className={styles.viewport}
        data-state={state}
        data-reveal-media
        style={{ '--frame-scale': scale } as CSSProperties}
        onPointerEnter={activateOnHover}
      >
        <picture>
          <source type="image/webp" srcSet={`/live/${site.slug}-720.webp 720w, /live/${site.slug}-1440.webp 1440w`} sizes="(min-width: 1024px) 58vw, 100vw" />
          <img
            className={styles.poster}
            src={`/live/${site.slug}.jpg`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            alt={`${site.name} - pierwszy ekran strony ${host}`}
          />
        </picture>
        {showsFrame && (
          <iframe
            className={styles.frame}
            src={site.url}
            title={`podgląd na żywo: ${site.name} (${host})`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setState('live')}
          />
        )}
        {state === 'poster' && (
          <button type="button" className={styles.overlay} onClick={activate}>
            <span className={styles.badge}>
              <Icon name="cursor" size={16} />
              uruchom podgląd na żywo
            </span>
          </button>
        )}
        {state === 'loading' && (
          <span className={styles.status} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            ładuję {host}
          </span>
        )}
        {state === 'linked' && (
          <a className={styles.overlay} href={site.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            <span className={styles.badge}>
              <Icon name="external" size={16} />
              {host}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
