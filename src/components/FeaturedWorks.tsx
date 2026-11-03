import type { RecordedWork } from '@/data/prace';
import { AutoVideo } from './AutoVideo';
import styles from './FeaturedWorks.module.css';

const mediaSizes = ['(min-width: 1024px) 56vw, 100vw', '(min-width: 1024px) 32vw, 100vw', '(min-width: 1024px) 40vw, 100vw', '(min-width: 1024px) 56vw, 100vw'];

export function FeaturedWorks({ works }: { works: RecordedWork[] }) {
  return (
    <div className={styles.grid}>
      {works.map((work, index) => (
        <article key={work.slug} className={styles.work} data-slot={index}>
          <div className={styles.media} data-reveal-media>
            <AutoVideo
              source={`/prace/${work.slug}`}
              alt={`${work.name} - kadr z nagrania: ${work.kind}`}
              label={work.name}
              sizes={mediaSizes[index % mediaSizes.length]}
            />
          </div>
          <div className={styles.meta} data-reveal>
            <h3 className={styles.name}>{work.name}</h3>
            <p className={styles.kind}>{work.kind}</p>
            <p className={styles.summary}>{work.summary}</p>
            <p className={styles.stack}>
              <span className="visually-hidden">technologie: </span>
              {work.stack.join(', ')}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
