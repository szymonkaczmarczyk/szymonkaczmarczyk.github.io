import { Icon } from './Icon';
import { SiteFooter } from './SiteFooter';
import styles from './SubpageShell.module.css';

export function SubpageShell({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <>
      <header className={`shell ${styles.bar}`}>
        <a className="button button--ghost" href="/">
          <span className={`button__icon ${styles.backIcon}`}>
            <Icon name="arrow" size={18} />
          </span>
          wróć na stronę główną
        </a>
      </header>
      <main id="tresc" className={`shell ${styles.main}`}>
        <p className="label">{label}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
