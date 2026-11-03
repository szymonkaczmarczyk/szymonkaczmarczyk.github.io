'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { RecordedWork } from '@/data/prace';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';
import { AutoVideo } from './AutoVideo';
import { Icon } from './Icon';
import styles from './WorkIndex.module.css';

type PreviewMover = { x: (value: number) => void; y: (value: number) => void };

export function WorkIndex({ works }: { works: RecordedWork[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const moverRef = useRef<PreviewMover | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    let cancelled = false;
    import('gsap').then(({ gsap }) => {
      const preview = previewRef.current;
      if (cancelled || !preview) return;
      moverRef.current = {
        x: gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3.out' }),
        y: gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3.out' }),
      };
      setPreviewEnabled(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video || !previewEnabled) return;
    if (!hoveredSlug) {
      video.pause();
      return;
    }
    if (!video.src.endsWith(`/prace/${hoveredSlug}.mp4`)) {
      setPreviewPlaying(false);
      video.src = `/prace/${hoveredSlug}.mp4`;
    }
    video.play().catch(() => {});
  }, [hoveredSlug, previewEnabled]);

  const followPointer = (event: PointerEvent) => {
    moverRef.current?.x(event.clientX);
    moverRef.current?.y(event.clientY);
  };

  const refreshScrollPositions = () => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
  };

  const toggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
    setHoveredSlug(null);
  };

  const previewVisible = previewEnabled && hoveredSlug !== null && hoveredSlug !== openSlug;

  return (
    <div className={styles.index}>
      <ol
        className={styles.list}
        onPointerMove={previewEnabled ? followPointer : undefined}
        onPointerLeave={() => setHoveredSlug(null)}
      >
        {works.map((work) => {
          const isOpen = openSlug === work.slug;
          const buttonId = `indeks-${work.slug}`;
          const panelId = `indeks-${work.slug}-nagranie`;
          return (
            <li key={work.slug} className={styles.row} data-open={isOpen} data-reveal>
              <h3 className={styles.heading}>
                <button
                  id={buttonId}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(work.slug)}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse') return;
                    setHoveredSlug(work.slug);
                    setPreviewSlug(work.slug);
                  }}
                >
                  <span className={styles.name}>{work.name}</span>
                  <span className={styles.kind}>{work.kind}</span>
                  <span className={styles.stack}>{work.stack.join(', ')}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon name="plus" size={20} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.panel}
                inert={!isOpen}
                onTransitionEnd={(event) => {
                  if (event.target === event.currentTarget) refreshScrollPositions();
                }}
              >
                <div className={styles.panelInner}>
                  <div className={styles.panelContent}>
                    {isOpen && (
                      <AutoVideo
                        source={`/prace/${work.slug}`}
                        alt={`${work.name} - kadr z nagrania: ${work.kind}`}
                        label={work.name}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className={styles.panelVideo}
                      />
                    )}
                    <p className={styles.summary}>{work.summary}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div ref={previewRef} className={styles.preview} data-visible={previewVisible} aria-hidden="true">
        <div className={styles.previewCard}>
          {previewEnabled && previewSlug && (
            <img className={styles.previewPoster} src={`/prace/${previewSlug}-720.webp`} width={720} height={450} alt="" />
          )}
          <video
            ref={previewVideoRef}
            className={styles.previewVideo}
            data-playing={previewPlaying}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onPlaying={() => setPreviewPlaying(true)}
          />
        </div>
      </div>
    </div>
  );
}
