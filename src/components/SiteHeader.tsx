import { navigation } from '@/data/strona';
import { Icon } from './Icon';
import styles from './SiteChrome.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.headerInner}`}>
        <a className={styles.brand} href="#tresc">
          szymon kaczmarczyk
        </a>
        <nav className={styles.nav} aria-label="sekcje strony">
          {navigation.map((item) => (
            <a key={item.href} className={styles.navLink} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={`button button--solid ${styles.headerCta}`} href="#kontakt">
          napisz do mnie
          <span className="button__icon">
            <Icon name="arrow" size={16} />
          </span>
        </a>
      </div>
    </header>
  );
}
