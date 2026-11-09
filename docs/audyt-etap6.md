# Audyt etapu 6 - 2026-11-08

Gałąź `astro`, build z 17 stronami (16 w sitemap i strona 404).

## Wyniki pomiarów

| Kontrola | Wynik |
|---|---|
| `astro check` | 0 błędów, 0 ostrzeżeń |
| `npm run check:links` (nowy skrypt `scripts/sprawdz-linki.mjs`) | 17 stron, 423 odnośniki wewnętrzne, kotwice, `srcset`, `og:image` i sitemap - 0 problemów |
| Lighthouse telefon, strona główna | wydajność 97, dostępność 100, dobre praktyki 100, SEO 100 (trzy powtórzenia, pierwszy zimny start dał 88) |
| Lighthouse telefon, `/prace/enklawa/`, `/polityka-prywatnosci/` | 100 w każdej kategorii |
| Lighthouse komputer, te same trzy strony | 100 w każdej kategorii |
| axe-core (WCAG 2.0-2.2 A i AA oraz dobre praktyki), 17 stron, 390 i 1440 px | 0 naruszeń |
| Klawiatura na stronie głównej | 31 przystanków w logicznej kolejności, każdy z widocznym fokusem (karty „więcej prac” obrysowują całą kartę) |
| Przewijanie w bok | brak na 390, 1024 i 1440 px oraz w WebKit (iPhone 13) |
| Strona 404 | status 404, `noindex`, bez canonical |
| Linki zewnętrzne | odloti.com 200, operandi-systems.com 200. GitHub i LinkedIn blokują automatyczne zapytania (503 i 999), adresy są z danych właściciela - do kliknięcia ręcznie przed publikacją |

## Poprawione w trakcie audytu

- strona 404 miała canonical i `og:url` wskazujące na nieistniejące `/404/`. Teraz `BaseLayout` przyjmuje `indexable={false}`: zamiast canonical jest `noindex`
- obraz OG i ikony były jeszcze ze starej strony (limonka, niebieski, krój Baloo, stary slogan). Nowe w stylu v4: papier, nagłówek ze startu z zielonym podkreśleniem, podpis, kadr Enklawy 16:10. Ikona to „sk” w kolorze papieru na zieleni. Pliki: `og.jpg` 1200x630, `favicon.ico` 32x32, `icon-512.png`, `apple-touch-icon.png` 180x180. Źródła w `~/portfolio-narzedzia/v4-grafiki/` (`node render.mjs`)
- stopka pisała „github” i „linkedin” małymi literami, kontakt „GitHub” i „LinkedIn”. Ujednolicone do oryginalnej pisowni
- luźne wartości 44 px i 4 px zastąpione tokenami `--touch-target` i `--space-half`

## Zasady kodu i tekstu

- komentarze w `src` i `scripts`: brak
- pauza `—` i półpauza `–` w źródłach i w `dist`: brak
- średnik jako pauza w tekstach: brak
- kolory: wszystko z tokenów. Jedyny zapis szesnastkowy poza `tokens.css` to `<meta name="theme-color">`, który nie przyjmuje zmiennych CSS
- Title Case: brak. Treść małymi literami, nazwy własne w oryginalnej pisowni
- etykiety przycisków opisują akcję („zobacz projekt Tankomapa”, „napisz wiadomość”, „otwórz stronę odloti”)

## Lista 30 zakazów

| # | Zakaz | Stan |
|---|---|---|
| 1 | gradienty fioletowo-niebieskie | brak gradientów w CSS |
| 2 | trzy kafle funkcji w rzędzie | brak |
| 3 | fałszywe opinie | brak opinii |
| 4 | ikony iskier | brak |
| 5 | „to nie X, to Y” | brak |
| 6 | gradientowe nagłówki | brak |
| 7 | glassmorphism | brak `backdrop-filter` |
| 8 | bezcelowe okna terminala | brak |
| 9 | ogólnikowe hasła | teksty zaakceptowane przez właściciela 2026-11-07, opisy projektów z faktów |
| 10 | nietknięte shadcn/ui | brak, czysty CSS |
| 11 | świecące kule w tle | brak, bez cieni i poświat |
| 12 | emoji w nagłówkach | brak emoji |
| 13 | plakietki nad nagłówkami | brak. Odręczne notki („rozdział 1 z 4”) to tekst, nie plakietka |
| 14 | długie myślniki | brak |
| 15 | ikony lucide wszędzie | brak, tylko strzałki tekstowe |
| 16 | puste bento | brak |
| 17 | trójstopniowy cennik | brak |
| 18 | pojawianie się wszystkiego przy przewijaniu | tekst nigdy nie wjeżdża. Ruch przy przewijaniu tylko na kadrach nagrań i falach |
| 19 | smugi za kursorem | brak, kursor systemowy |
| 20 | ciemny motyw o niskim kontraście | brak ciemnego motywu. Rozdziały kina 5,45:1 i więcej |
| 21 | niespójne odstępy | skala 8 px z tokenów, dwie luźne wartości przeniesione do tokenów |
| 22 | niejasne etykiety przycisków | etykiety z nazwą projektu lub akcji |
| 23 | brak prawdziwych demo | nagrania prawdziwych projektów (na razie zamienniki z istniejących nagrań) |
| 24 | twierdzenia bez dowodów | brak liczb i metryk, każdy projekt ma nagranie lub zrzut |
| 25 | formularze pytające o zbyt wiele | brak formularza, zwykły `mailto` |
| 26 | formularze niedostępne z klawiatury | nie dotyczy, kontakt w pełni z klawiatury |
| 27 | zepsute osadzenia | brak osadzeń, odloti ma plakat i link |
| 28 | fikcyjne dane firmowe | brak |
| 29 | brak polityki prywatności | jest `/polityka-prywatnosci/` |
| 30 | brak regulaminu | jest `/regulamin/` |

## Świadome odstępstwa i otwarte punkty

- WCAG 2.2.2 (wstrzymanie ruchu dłuższego niż 5 s): nagrania grają w stałej pętli bez przycisku pauzy - decyzja właściciela z 2026-11-07. Łagodzenie: przy `prefers-reduced-motion` i `saveData` widać tylko plakat, nagranie wstrzymuje się poza ekranem, nagrania nie mają dźwięku. axe tego kryterium nie wykrywa, więc trzeba je opisać w raporcie końcowym
- LCP na telefonie 2,6 s w symulacji Lighthouse (próg „dobry” to 2,5 s). Główna przyczyna to opóźnienie renderu przez dwa pliki CSS. Wynik wydajności i tak 97
- nagranie Enklawy na biurku (1,9 MB webm) ładuje się od razu na starcie, także na telefonie
- 46 nieużywanych plików `*-pion.*` w `public/video` (19 MB) usunięte 2026-11-08 po audycie
