# Nagrania do wykonania

Każdy projekt potrzebuje jednego nagrania **poziomego** 16:10. Strona pokazuje je w całości na każdym ekranie, także na telefonie, bez wycinania środka (decyzja właściciela 2026-11-07). Do czasu nowych nagrań w `public/video/` są zamienniki - 10 sekund starych nagrań od klatki wybranej wcześniej na plakat. W starych nagraniach widać kursor.

Znane wady zamienników: plakat Tankomapy ma jeszcze okienko „Ładuję mapę”, plakat Enklawy jest ciemny (filmowe intro), odloti i Operandi mają tylko statyczny zrzut.

## Wymagania techniczne

- długość 8-12 sekund, nagranie zapętla się, więc koniec powinien pasować do początku
- okno 1440x900 (eksport 1280x800, proporcje 16:10 muszą się zgadzać, bo kadr na stronie ma dokładnie takie)
- bez dźwięku, mp4 H.264 z faststart i webm VP9, do około 2 MB na plik
- pierwsza klatka to poster, więc nagranie startuje od czystego, gotowego ekranu (bez preloadera, pustej strony i ekranu logowania)
- bez danych osobowych, kluczy i powiadomień systemowych w kadrze
- przewijanie w stałym tempie, bez gwałtownych skoków
- pliki: `public/video/<projekt>-poziom.mp4` i `.webm`, poster `<projekt>.jpg` i `.webp`
- eksport i plakaty: `~/portfolio-narzedzia/zamienniki-v4.mjs` (do przerobienia na nowe źródła, gdy nagrania będą gotowe)

## Lista

| Projekt | Orientacja | Długość | Co pokazać |
|---|---|---|---|
| Enklawa Villas | poziom | 10-12 s | koniec filmowego intro, przewijanie scrollytellingu, wejście w podstronę jednej rezydencji |
| Projekt 195 | poziom | 10-12 s | intro z okna samolotu, przejście do globusa, otwarcie jednej relacji |
| Tankomapa | poziom | 8-10 s | mapa ze stacjami, zmiana rodzaju paliwa w filtrze, lista od najtańszej |
| odloti | poziom | 8-10 s | wpisanie miasta wylotu na odloti.com, mapa tras, wynik złożony z odcinków |
| Operandi | poziom | 8-10 s | hero na operandi-systems.com, przewinięcie do przykładu STL i SCL, zmiana języka |
| Cyberstart | poziom | 8-12 s | ekran wyboru gier, wejście w jedną minigrę (np. phishing), jedna poprawna odpowiedź z reakcją gry, powrót do listy. kadr ma pokazać, że to gra, a nie kurs - widoczny ruch i wynik ruchu gracza |
| Kilwater | poziom | 8-10 s | łukowe kadry w hero, linia fali przy przewijaniu, formularz z jednym komunikatem walidacji |
| CeraLab | poziom | 8-10 s | hero z wideo, przypięta sekcja produktów, kroki rytuału |
| PanRouter | poziom | 10-12 s | plansza z routerami, uruchomienie symulacji krokowej, pakiet przechodzący przez zaporę |
| Race Predictor | poziom | 8-10 s | wybór Grand Prix, widok predykcji z polem startowym i pogodą |
| Match Predictor | poziom | 8-10 s | wybór dwóch reprezentacji, szanse i najbardziej prawdopodobny wynik |
| Claus | poziom | 8-10 s | wczytanie przykładowej umowy (bez danych osobowych), podświetlone klauzule |
| Esencja | poziom | 8-10 s | karta menu, wybór stolika na planie sali, potwierdzenie rezerwacji |

Nagrania pionowe nie są już potrzebne. Wyjątek to plakat `projekt-195-pion.jpg` i `.webp` na ekranie telefonu w ilustracji biurka.
