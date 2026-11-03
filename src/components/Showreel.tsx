'use client';

import { useState } from 'react';
import { recordedWorks, showreelChapters } from '@/data/prace';
import { AutoVideo } from './AutoVideo';
import styles from './Showreel.module.css';

const chapterWorks = showreelChapters.map((chapter) => ({
  ...chapter,
  work: recordedWorks.find((work) => work.slug === chapter.slug)!,
}));

const chapterAt = (seconds: number) =>
  chapterWorks.reduce((current, chapter, index) => (seconds >= chapter.start ? index : current), 0);

export function Showreel() {
  const [activeChapter, setActiveChapter] = useState(0);
  const { work } = chapterWorks[activeChapter];

  return (
    <figure className={styles.stage} data-screen>
      <div className={styles.screen} data-screen-frame>
        <AutoVideo
          source="/showreel/showreel"
          alt="montaż nagrań pięciu prac: Enklawa Villas, Projekt 195, CeraLab, Kilwater i Tankomapa"
          label="showreel"
          sizes="100vw"
          eager
          hasCompactSource
          className={styles.video}
          onTime={(seconds) => {
            const next = chapterAt(seconds);
            if (next !== activeChapter) setActiveChapter(next);
          }}
        />
      </div>
      <figcaption className={`shell ${styles.caption}`}>
        <span className={styles.chapterList} aria-hidden="true">
          {chapterWorks.map((chapter, index) => (
            <span key={chapter.slug} className={styles.chapterTick} data-active={index === activeChapter} />
          ))}
        </span>
        <span className={styles.nowPlaying}>
          <span key={work.slug} className={styles.nowName}>
            {work.name}
          </span>
          <span className={styles.nowKind}>{work.kind}</span>
        </span>
      </figcaption>
    </figure>
  );
}
