'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, savesData } from '@/lib/media';
import { Icon } from './Icon';
import styles from './AutoVideo.module.css';

type AutoVideoProps = {
  source: string;
  alt: string;
  label: string;
  sizes: string;
  eager?: boolean;
  hasCompactSource?: boolean;
  className?: string;
  onTime?: (seconds: number) => void;
};

const lazyThresholds = { visible: 0.5, hidden: 0.15 };
const eagerThresholds = { visible: 0.01, hidden: 0 };

export function AutoVideo({ source, alt, label, sizes, eager = false, hasCompactSource = false, className, onTime }: AutoVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [hasSource, setHasSource] = useState(false);
  const [wantsPlayback, setWantsPlayback] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const autoplays = !prefersReducedMotion() && !savesData();
    const { visible, hidden } = eager ? eagerThresholds : lazyThresholds;
    let pageLoaded = document.readyState === 'complete';
    let wantsStart = false;
    const start = () => {
      if (!autoplays || pausedByUser.current) return;
      if (!pageLoaded) {
        wantsStart = true;
        return;
      }
      setHasSource(true);
      setWantsPlayback(true);
    };
    const startAfterLoad = () => {
      pageLoaded = true;
      if (wantsStart) start();
    };
    window.addEventListener('load', startAfterLoad, { once: true });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= visible) {
          start();
        } else if (!entry.isIntersecting || entry.intersectionRatio <= hidden) {
          wantsStart = false;
          setWantsPlayback(false);
        }
      },
      { threshold: [0, hidden, visible] },
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', startAfterLoad);
    };
  }, [eager]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasSource) return;
    if (wantsPlayback) video.play().catch(() => setWantsPlayback(false));
    else video.pause();
  }, [hasSource, wantsPlayback]);

  const toggle = () => {
    if (wantsPlayback) {
      pausedByUser.current = true;
      setWantsPlayback(false);
      return;
    }
    pausedByUser.current = false;
    setHasSource(true);
    setWantsPlayback(true);
  };

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ''}`} data-playing={isPlaying}>
      <picture>
        <source type="image/webp" srcSet={`${source}-720.webp 720w, ${source}-1440.webp 1440w`} sizes={sizes} />
        <img
          className={styles.poster}
          src={`${source}.jpg`}
          width={1440}
          height={900}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTime ? (event) => onTime(event.currentTarget.currentTime) : undefined}
      >
        {hasSource && (
          <>
            {hasCompactSource && <source src={`${source}-720.mp4`} type="video/mp4" media="(max-width: 767px)" />}
            <source src={`${source}.mp4`} type="video/mp4" />
            <source src={`${source}.webm`} type="video/webm" />
          </>
        )}
      </video>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={wantsPlayback}
        aria-label={wantsPlayback ? `zatrzymaj nagranie ${label}` : `odtwórz nagranie ${label}`}
        onClick={toggle}
      >
        <Icon name={wantsPlayback ? 'pause' : 'play'} size={16} />
      </button>
    </div>
  );
}
