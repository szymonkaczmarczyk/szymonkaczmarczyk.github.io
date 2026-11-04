import type { Metadata } from 'next';
import { SubpageShell } from '@/components/SubpageShell';
import { owner } from '@/data/strona';

export const metadata: Metadata = {
  title: 'regulamin - Szymon Kaczmarczyk',
  description: 'zasady korzystania z portfolio Szymona Kaczmarczyka - prawa do nagrań, linki do stron zewnętrznych i kontakt',
  alternates: { canonical: '/regulamin/' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/regulamin/',
    title: 'regulamin - Szymon Kaczmarczyk',
    description: 'zasady korzystania z portfolio Szymona Kaczmarczyka - prawa do nagrań, linki do stron zewnętrznych i kontakt',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Szymon Kaczmarczyk - portfolio' }],
  },
};

export default function TermsPage() {
  return (
    <SubpageShell label="informacje prawne" title="regulamin">
      <h2>właściciel strony</h2>
      <p>stronę prowadzi prywatnie {owner.name}.</p>
      <h2>charakter strony</h2>
      <p>portfolio ma charakter informacyjny i niekomercyjny. nie sprzedaje usług przez internet i nie zawiera umów na odległość.</p>
      <h2>prawa autorskie</h2>
      <p>kod źródłowy strony jest dostępny na licencji MIT. nagrania, plakaty, zdjęcia i teksty należą do właściciela strony i nie są objęte tą licencją. kopiowanie ich poza dozwolony użytek wymaga zgody.</p>
      <h2>strony zewnętrzne</h2>
      <p>podglądy na żywo i linki prowadzą do stron, które mają własne regulaminy i polityki prywatności.</p>
      <h2>kontakt</h2>
      <p>pytania i uwagi: {owner.email}.</p>
    </SubpageShell>
  );
}
