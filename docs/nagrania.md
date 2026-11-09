# Nagrania do wykonania

Każdy projekt potrzebuje jednego nagrania **poziomego** 16:10. Strona pokazuje je w całości na każdym ekranie, także na telefonie, bez wycinania środka (decyzja właściciela 2026-11-07). Stan na 2026-11-09: 12 projektów nagranych klatka po klatce w 120 kl./s jako przegląd całej strony od góry do dołu, Match Predictor jako rytm (`~/portfolio-narzedzia/nagraj-klatki.mjs`). Kilwater ma też nagranie z telefonu (390x748) na ekran telefonu w ilustracji biurka. odloti i Operandi są nagrane z publicznych stron (`https://odloti.com/` i `https://operandi-systems.com/pl/`), reszta z lokalnych serwerów.

## Jak powstają nagrania

- Bez kursora i kliknięć. Nagranie nie idzie w czasie rzeczywistym: zegar strony jest zatrzymany (Playwright `clock`), a każda klatka to osobny zrzut po przesunięciu zegara, animacji CSS i wideo na stronie dokładnie o 1/120 s. Dzięki temu nie ma zgubionych ani zdublowanych klatek.
- Nagranie to przegląd całej strony: 1,2 s na górze, przejazd do samego dołu z łagodnym startem i hamowaniem, 1,2 s na dole. Bez cofania. Pętla zaczyna się i kończy na tej samej górze strony.
- Tempo 320 px/s. Strona krótsza niż 6 s przejazdu jedzie wolniej (całość w 6 s), dłuższa niż 32 s szybciej (całość w 32 s). W obrębie jednego nagrania tempo się nie zmienia.
- Przed nagraniem jeden szybki przejazd przez całą stronę na rozgrzewkę, żeby wczytały się obrazy z lazy loadingu, a animacje wejścia, liczniki i nagłówki były w stanie końcowym.
- Kroki przygotowania (wybór miasta, drużyn, umowy) dzieją się przed pierwszą klatką (`~/portfolio-narzedzia/przygotowania-v4.mjs`). Projekt z polem `url` w ustawieniach nagrywa się z publicznego adresu bez lokalnego serwera. odloti ma CSP bez `unsafe-inline`, więc przeglądarka nagrywająca ma włączone `bypassCSP` (tylko lokalnie, strona się nie zmienia).
- Eksport na komputer w 120 kl./s (1280 px, mp4 i webm), limit 240 kB na sekundę, nie mniej niż 3 MB. Na telefon (do 767 px) ta sama klatka co druga, czyli 60 kl./s w 640 px (mp4 H.264, 45 kB na sekundę, nie mniej niż 600 kB), bo telefony dekodują to sprzętowo i bez cięcia. Ekran telefonu w ilustracji biurka też 60 kl./s (360 px, do 600 kB). Strona wczytuje wideo dopiero, gdy kadr jest na ekranie (`preload="none"`), i nie odtwarza go przy oszczędzaniu danych.

| Projekt | Przegląd | Długość pliku | mp4 / webm (120 kl./s) |
|---|---|---|---|
| Enklawa Villas | 11410 px w 32 s (357 px/s) | 34,4 s | 6,53 / 6,75 MB |
| Kilwater | 16550 px w 32 s (517 px/s) | 34,4 s | 7,03 / 7,01 MB |
| Projekt 195 | 10026 px w 31,3 s | 33,7 s | 6,09 / 6,76 MB |
| Cyberstart | 6721 px w 21 s | 23,4 s | 4,26 / 4,76 MB |
| CeraLab | 6351 px w 19,8 s | 22,3 s | 3,38 / 4,95 MB |
| Tankomapa | Kraków, lista stacji w panelu 4280 px w 13,4 s, mapa stoi | 15,8 s | 2,00 / 3,53 MB |
| Esencja | 3129 px w 9,8 s, start 40 px pod górą, bo przy samej górze strona zmienia nagłówek | 12,2 s | 1,81 / 2,35 MB |
| Claus | przykładowa umowa po analizie, ekran telefonu 1738 px w 6 s | 8,4 s | 0,77 / 1,33 MB |
| PanRouter | strona startowa 950 px w 6 s | 8,4 s | 1,17 / 1,73 MB |
| Race Predictor | Polski, tor i pogoda wybrane wcześniej, 691 px w 6 s | 8,4 s | 1,34 / 1,75 MB |
| Operandi | wersja polska z `operandi-systems.com/pl/`, 16334 px w 32 s (510 px/s) | 34,4 s | 8,09 / 7,01 MB |
| odloti | `odloti.com`, lista ofert w panelu 2704 px w 8,5 s, mapa stoi | 10,8 s | 1,53 / 2,03 MB |
| Match Predictor | strona się nie przewija, więc rytm: Polska z Niemcami, Brazylią, Hiszpanią i Francją, zmiana co 3 s | 12,0 s | 0,18 / 0,33 MB |

## Wymagania techniczne

- długość wynika z wysokości strony (od 8 do około 35 s), nagranie zapętla się cięciem z dołu strony na górę
- okno 1440x900 (eksport 1280x800, proporcje 16:10 muszą się zgadzać, bo kadr na stronie ma dokładnie takie)
- bez dźwięku, mp4 H.264 z faststart i webm VP9, limity jak wyżej
- pierwsza klatka to poster, więc nagranie startuje od czystego, gotowego ekranu (bez preloadera, pustej strony i ekranu logowania)
- bez danych osobowych, kluczy i powiadomień systemowych w kadrze
- przewijanie w stałym tempie, bez gwałtownych skoków
- pliki: `public/video/<projekt>-poziom.mp4` i `.webm` (120 kl./s), `<projekt>-poziom-640.mp4` (60 kl./s), postery `<projekt>.jpg`, `.webp` i `<projekt>-640.webp`, ekran telefonu `kilwater-pion.*`
- nagranie: `node nagraj-klatki.mjs [projekt...]` (ekran telefonu: `kilwater-telefon`, projekt z już działającym serwerem: `ADRES_<PROJEKT>=http://...`), surowe pliki `surowe/<projekt>-120.mp4`, eksport i plakaty: `node zamienniki-v4.mjs [projekt | projekt-640 | kilwater-pion]` (oba w `~/portfolio-narzedzia`)

## Lista

| Projekt | Orientacja | Długość | Co pokazać |
|---|---|---|---|
| Enklawa Villas | poziom | 10-12 s | koniec filmowego intro, przewijanie scrollytellingu, wejście w podstronę jednej rezydencji |
| Projekt 195 | poziom | 10-12 s | intro z okna samolotu, przejście do globusa, otwarcie jednej relacji |
| Tankomapa | poziom | 8-10 s | mapa ze stacjami, zmiana rodzaju paliwa w filtrze, lista od najtańszej |
| odloti | poziom | 10,8 s | nagrane 2026-11-08: lista ofert z mapą obok |
| Operandi | poziom | 34,4 s | nagrane 2026-11-08: cała strona po polsku |
| Cyberstart | poziom | 8-12 s | ekran wyboru gier, wejście w jedną minigrę (np. phishing), jedna poprawna odpowiedź z reakcją gry, powrót do listy. kadr ma pokazać, że to gra, a nie kurs - widoczny ruch i wynik ruchu gracza |
| Kilwater | poziom | 8-10 s | łukowe kadry w hero, linia fali przy przewijaniu, formularz z jednym komunikatem walidacji |
| CeraLab | poziom | 8-10 s | hero z wideo, przypięta sekcja produktów, kroki rytuału |
| PanRouter | poziom | 10-12 s | plansza z routerami, uruchomienie symulacji krokowej, pakiet przechodzący przez zaporę |
| Race Predictor | poziom | 8-10 s | wybór Grand Prix, widok predykcji z polem startowym i pogodą |
| Match Predictor | poziom | 8-10 s | wybór dwóch reprezentacji, szanse i najbardziej prawdopodobny wynik |
| Claus | poziom | 8-10 s | wczytanie przykładowej umowy (bez danych osobowych), podświetlone klauzule |
| Esencja | poziom | 8-10 s | karta menu, wybór stolika na planie sali, potwierdzenie rezerwacji |

Nagrania pionowe nie są już potrzebne. Wyjątek to plakat `projekt-195-pion.jpg` i `.webp` na ekranie telefonu w ilustracji biurka.
