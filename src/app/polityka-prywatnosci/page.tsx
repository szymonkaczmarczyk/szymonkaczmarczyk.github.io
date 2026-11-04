import type { Metadata } from 'next';
import { SubpageShell } from '@/components/SubpageShell';
import { owner } from '@/data/strona';

export const metadata: Metadata = {
  title: 'polityka prywatności - Szymon Kaczmarczyk',
  description: 'jak portfolio Szymona Kaczmarczyka obchodzi się z danymi - bez cookies, bez analityki i bez formularzy',
  alternates: { canonical: '/polityka-prywatnosci/' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/polityka-prywatnosci/',
    title: 'polityka prywatności - Szymon Kaczmarczyk',
    description: 'jak portfolio Szymona Kaczmarczyka obchodzi się z danymi - bez cookies, bez analityki i bez formularzy',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Szymon Kaczmarczyk - portfolio' }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <SubpageShell label="informacje prawne" title="polityka prywatności">
      <p>to prywatne portfolio programisty. nie prowadzę przez nie działalności gospodarczej i nie zbieram danych, poza tym, co opisuję niżej.</p>
      <h2>administrator danych</h2>
      <p>administratorem jest {owner.name}, kontakt: {owner.email}.</p>
      <h2>jakie dane zbieram</h2>
      <p>strona nie używa cookies, analityki, formularzy ani zewnętrznych czcionek. wszystkie pliki, także nagrania i zdjęcia, ładują się z tego samego serwera.</p>
      <h2>hosting</h2>
      <p>stronę udostępnia GitHub Pages (GitHub, Inc., USA). serwer może zapisywać techniczne logi, w tym adres IP, żeby strona działała i była bezpieczna. GitHub uczestniczy w programie EU-US Data Privacy Framework i opisuje to w swojej polityce prywatności.</p>
      <h2>strony na żywo</h2>
      <p>sekcja „na żywo” pokazuje zrzuty ekranu zapisane na tej stronie. dopiero kliknięcie w link otwiera zewnętrzną stronę w nowej karcie, a ona działa według własnej polityki prywatności.</p>
      <h2>kontakt mailowy</h2>
      <p>jeśli napiszesz e-mail, przetwarzam twój adres i treść wiadomości tylko po to, żeby odpowiedzieć (art. 6 ust. 1 lit. f RODO), do końca naszej rozmowy, a potem najdłużej 12 miesięcy, chyba że poprosisz o wcześniejsze usunięcie.</p>
      <h2>twoje prawa</h2>
      <ul>
        <li>dostęp do danych, ich sprostowanie, usunięcie lub ograniczenie przetwarzania</li>
        <li>sprzeciw wobec przetwarzania i przeniesienie danych</li>
        <li>skarga do Prezesa Urzędu Ochrony Danych Osobowych</li>
      </ul>
      <p>żeby skorzystać z tych praw, napisz na {owner.email}.</p>
    </SubpageShell>
  );
}
