import { FeaturedWorks } from '@/components/FeaturedWorks';
import { HeroLiquid } from '@/components/HeroLiquid';
import { Icon } from '@/components/Icon';
import { LiveCard } from '@/components/LiveCard';
import { Showreel } from '@/components/Showreel';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WorkIndex } from '@/components/WorkIndex';
import { liveSites, recordedWorks } from '@/data/prace';
import { owner } from '@/data/strona';
import styles from './page.module.css';

const featuredWorks = recordedWorks.filter((work) => work.featured);
const indexedWorks = recordedWorks.filter((work) => !work.featured);

const focusAreas = [
  { title: 'interfejsy, które żyją', text: 'ruch, typografia i czysty, minimalny design' },
  { title: 'automatyzacja', text: 'skrypty, boty i workflowy AI do wszystkiego, co robię więcej niż dwa razy' },
  { title: 'e-commerce od środka', text: 'sklepy, marketplace’y, integracje i to, co sprawia, że ludzie kupują' },
  { title: 'sieci i bezpieczeństwo', text: 'jak internet działa pod spodem - sieci, bezpieczeństwo, infrastruktura' },
];

const toolbox = ['TypeScript', 'Python', 'Next.js', 'Astro', 'React', 'GSAP', 'PostgreSQL', 'Docker', 'Linux', 'Figma'];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="tresc">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroStage}>
            <HeroLiquid />
            <div className={`shell ${styles.heroCopy}`}>
              <h1 id="hero-title" className={styles.heroTitle} data-liquid-avoid>
                <span className={styles.line}>
                  <span>buduję strony,</span>
                </span>
                <span className={styles.line}>
                  <span>
                    które się <span className="bubble" data-liquid-pill>ruszają</span>
                  </span>
                </span>
              </h1>
              <div className={styles.heroAside}>
                <p className={`lead ${styles.heroLead}`} data-liquid-avoid>
                  web development i marketing w jednym. każdy projekt prowadzę sam - od projektu i kodu po testy i dokumentację.
                </p>
                <div className={styles.heroActions} data-liquid-avoid>
                  <a className="button button--solid" href="#prace">
                    zobacz prace
                    <span className="button__icon">
                      <Icon name="arrow" size={18} />
                    </span>
                  </a>
                  <a className="button button--ghost" href="#kontakt">
                    napisz do mnie
                    <span className="button__icon">
                      <Icon name="mail" size={18} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Showreel />
        </section>

        <section id="prace" className={`shell ${styles.section}`} aria-labelledby="prace-title">
          <header className={styles.sectionHeader}>
            <p className="label label--section" data-reveal>
              <span className="label__number">01</span>
              prace z localhosta
            </p>
            <h2 id="prace-title" data-reveal>
              prawdziwe strony, nagrane na moim <span className="bubble bubble--sky">komputerze</span>
            </h2>
            <p className="lead" data-reveal>
              kilkanaście sekund z każdego projektu uruchomionego lokalnie. nagranie rusza samo, kiedy do niego dojedziesz.
            </p>
          </header>
          <FeaturedWorks works={featuredWorks} />
        </section>

        <section className={`shell ${styles.section}`} aria-labelledby="indeks-title">
          <header className={styles.indexHeader}>
            <h2 id="indeks-title" data-reveal>
              i {indexedWorks.length} kolejnych
            </h2>
            <p className="lead" data-reveal>
              rozwiń nazwę, żeby obejrzeć nagranie.
            </p>
          </header>
          <WorkIndex works={indexedWorks} />
        </section>

        <section id="na-zywo" className={`shell ${styles.section} ${styles.band}`} aria-labelledby="na-zywo-title">
          <header className={styles.sectionHeader}>
            <p className="label label--section" data-reveal>
              <span className="label__number">02</span>
              w sieci
            </p>
            <h2 id="na-zywo-title" data-reveal>
              opublikowane, działają <span className="bubble bubble--sky">na żywo</span>
            </h2>
            <p className="lead" data-reveal>
              dwie strony, które są już w sieci. każda otwiera się w nowej karcie.
            </p>
          </header>
          <div className={styles.liveList}>
            {liveSites.map((site) => (
              <LiveCard key={site.slug} site={site} />
            ))}
          </div>
        </section>

        <section id="o-mnie" className={`shell ${styles.section} ${styles.about}`} aria-labelledby="o-mnie-title">
          <div className={styles.aboutIntro}>
            <p className="label label--section" data-reveal>
              <span className="label__number">03</span>
              o mnie
            </p>
            <h2 id="o-mnie-title" data-reveal>
              uczę się, <span className="bubble bubble--sky">budując</span>
            </h2>
            <figure className={styles.portrait} data-reveal>
              <span className={styles.portraitFrame}>
                <picture>
                  <source srcSet="/o-mnie/szymon.webp" type="image/webp" />
                  <img
                    className={styles.portraitImage}
                    src="/o-mnie/szymon.jpg"
                    width={368}
                    height={460}
                    loading="lazy"
                    decoding="async"
                    alt="Szymon Kaczmarczyk w czarnym swetrze siedzi na drewnianej ławce, w tle przeszklona kawiarnia wieczorem"
                  />
                </picture>
              </span>
              <span className={styles.portraitDrop} aria-hidden="true" />
              <figcaption className={styles.portraitCaption}>{owner.name.toLowerCase()}</figcaption>
            </figure>
          </div>
          <div className={styles.aboutBody}>
            <p className={styles.aboutLead} data-reveal>
              jestem gdzieś między web developmentem a marketingiem. lubię budować rzeczy, w które ludzie naprawdę klikają, i sprawdzać, dlaczego klikają.
            </p>
            <p className="lead" data-reveal>
              każdy projekt zaczyna się od pytania „ciekawe, jak to działa”. teraz wchodzę głębiej w sieci, bezpieczeństwo i systemy, które się skalują.
            </p>
            <ul className={styles.focusList}>
              {focusAreas.map((area) => (
                <li key={area.title} className={styles.focusItem} data-reveal>
                  <h3 className={styles.focusTitle}>{area.title}</h3>
                  <p>{area.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.toolbox} data-reveal>
              <span className={styles.toolboxLabel}>na co dzień: </span>
              {toolbox.join(', ')}
            </p>
          </div>
        </section>

        <section id="kontakt" className={`shell ${styles.section} ${styles.contact}`} aria-labelledby="kontakt-title">
          <p className="label label--section" data-reveal>
            <span className="label__number">04</span>
            kontakt
          </p>
          <h2 id="kontakt-title" className={styles.contactTitle} data-reveal>
            masz pomysł na stronę, która ma się <span className="bubble">ruszać</span>?
          </h2>
          <div className={styles.contactRow} data-reveal>
            <p className="lead">napisz kilka zdań o projekcie. odpowiem z pomysłem na pierwszy krok.</p>
            <div className={styles.contactActions}>
              <a className="button button--solid" href={`mailto:${owner.email}`}>
                {owner.email}
                <span className="button__icon">
                  <Icon name="mail" size={18} />
                </span>
              </a>
              <a className="button button--ghost" href={owner.github} target="_blank" rel="noopener noreferrer">
                github
                <span className="button__icon">
                  <Icon name="github" size={18} />
                </span>
                <span className="visually-hidden">(otwiera się w nowej karcie)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
