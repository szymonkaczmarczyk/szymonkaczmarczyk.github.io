# Nagrania do wykonania

Każdy projekt potrzebuje dwóch nagrań: **poziom** (komputer) i **pion** (telefon). Do czasu nowych nagrań w `public/video/` są zamienniki - pierwsze 10 sekund starych nagrań, wersja pionowa wycięta ze środka poziomej.

## Wymagania techniczne

- długość 8-12 sekund, nagranie zapętla się, więc koniec powinien pasować do początku
- poziom 1440x900 (eksport 1280 px szerokości), pion 390x844 (eksport 720x1280)
- bez dźwięku, mp4 H.264 z faststart i webm VP9, do około 2 MB na plik
- pierwsza klatka to poster, więc nagranie startuje od czystego, gotowego ekranu (bez preloadera, pustej strony i ekranu logowania)
- bez danych osobowych, kluczy i powiadomień systemowych w kadrze
- przewijanie w stałym tempie, bez gwałtownych skoków
- pliki: `public/video/<projekt>-poziom.mp4`, `<projekt>-pion.mp4`, te same w `.webm`, poster `<projekt>.jpg` i `<projekt>-pion.jpg` (plus `.webp`)
- eksport i plakaty: `~/portfolio-narzedzia/zamienniki-v4.mjs` (do przerobienia na nowe źródła, gdy nagrania będą gotowe)

## Lista

| Projekt | Orientacja | Długość | Co pokazać |
|---|---|---|---|
| Enklawa Villas | poziom i pion | 10-12 s | koniec filmowego intro, przewijanie scrollytellingu, wejście w podstronę jednej rezydencji |
| Projekt 195 | poziom i pion | 10-12 s | intro z okna samolotu, przejście do globusa, otwarcie jednej relacji |
| Tankomapa | poziom i pion | 8-10 s | mapa ze stacjami, zmiana rodzaju paliwa w filtrze, lista od najtańszej |
| odloti | poziom i pion | 8-10 s | wpisanie miasta wylotu na odloti.com, mapa tras, wynik złożony z odcinków |
| Operandi | poziom i pion | 8-10 s | hero na operandi-systems.com, przewinięcie do przykładu STL i SCL, zmiana języka |
| Cyberstart | poziom i pion | 8-12 s | ekran wyboru gier, wejście w jedną minigrę (np. phishing), jedna poprawna odpowiedź z reakcją gry, powrót do listy. kadr ma pokazać, że to gra, a nie kurs - widoczny ruch i wynik ruchu gracza |
| Kilwater | poziom i pion | 8-10 s | łukowe kadry w hero, linia fali przy przewijaniu, formularz z jednym komunikatem walidacji |
| CeraLab | poziom i pion | 8-10 s | hero z wideo, przypięta sekcja produktów, kroki rytuału |
| PanRouter | poziom i pion | 10-12 s | plansza z routerami, uruchomienie symulacji krokowej, pakiet przechodzący przez zaporę |
| Race Predictor | poziom i pion | 8-10 s | wybór Grand Prix, widok predykcji z polem startowym i pogodą |
| Match Predictor | poziom i pion | 8-10 s | wybór dwóch reprezentacji, szanse i najbardziej prawdopodobny wynik |
| Claus | poziom i pion | 8-10 s | wczytanie przykładowej umowy (bez danych osobowych), podświetlone klauzule |
| Esencja | poziom i pion | 8-10 s | karta menu, wybór stolika na planie sali, potwierdzenie rezerwacji |

Pion to osobne nagranie w widoku telefonu, nie wycinek z poziomu. Układ mobilny każdej strony wygląda inaczej i to on ma być widoczny na telefonie.
