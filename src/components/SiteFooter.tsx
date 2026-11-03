import { navigation, owner } from '@/data/strona';
import styles from './SiteChrome.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.footerInner}`}>
        <div className={styles.footerColumns}>
          <nav className={styles.footerNav} aria-label="mapa strony">
            {navigation.map((item) => (
              <a key={item.href} href={`/${item.href}`}>
                {item.label}
              </a>
            ))}
            <a href="/#kontakt">kontakt</a>
          </nav>
          <nav className={styles.footerNav} aria-label="informacje prawne">
            <a href="/polityka-prywatnosci/">polityka prywatności</a>
            <a href="/regulamin/">regulamin</a>
            <a href={owner.github} target="_blank" rel="noopener noreferrer">
              github
              <span className="visually-hidden"> (otwiera się w nowej karcie)</span>
            </a>
          </nav>
        </div>
        <p className={styles.footerWordmark} aria-hidden="true">
          szymon kaczmarczyk
        </p>
        <p className={styles.footerNote}>© 2026 Szymon Kaczmarczyk</p>
      </div>
    </footer>
  );
}
