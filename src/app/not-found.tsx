import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { SubpageShell } from '@/components/SubpageShell';

export const metadata: Metadata = {
  title: 'nie ma takiej strony - Szymon Kaczmarczyk',
  description: 'ta strona nie istnieje albo zmieniła adres. wróć do portfolio Szymona Kaczmarczyka i obejrzyj nagrania prac',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SubpageShell label="błąd 404" title="ta strona odpłynęła">
      <p>adres nie istnieje albo się zmienił. prace czekają na stronie głównej.</p>
      <a className="button button--solid" href="/#prace">
        zobacz prace
        <span className="button__icon">
          <Icon name="arrow" size={18} />
        </span>
      </a>
    </SubpageShell>
  );
}
