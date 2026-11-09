# Raport końcowy – portfolio v4

Stan na 2026-11-08, gałąź `astro`. Nagrania 11 projektów podmienione na nowe (8-34 s, bez kursora, przechodzą przez całe strony, największe pliki ok. 5 MB). Etapy 1-7 gotowe. `main` (produkcja) dalej ma starą stronę Next.js, nic nie jest wdrożone.

## Co jest gotowe

- start na papierze z ilustrowanym biurkiem, odręcznym podkreśleniem i podpisem
- cztery rozdziały kinowe (Enklawa Villas, Projekt 195, Tankomapa, odloti) z falami, paskiem postępu i zmianą tonu
- 13 stron projektów z rolą, technologiami, „otwórz stronę” dla odloti i Operandi oraz „następny projekt”
- „więcej prac” (8 projektów w rytmie szeroka, dwie wąskie), „o mnie” ze zdjęciem i nagraniem Cyberstartu, kontakt przez `mailto`
- polityka prywatności, regulamin, strona 404, `robots.txt`, `sitemap.xml`, obraz OG i ikony w stylu v4
- audyt etapu 6 bez otwartych błędów (szczegóły w `docs/audyt-etap6.md`): Lighthouse 97-100, axe 0 naruszeń, 0 zepsutych linków, 30 zakazów spełnionych

## Co jest zamiennikiem

| Element | Teraz | Docelowo |
|---|---|---|
| odloti, Operandi | tylko statyczny zrzut ekranu | nagranie z działającej strony |
| Tankomapa | nowe nagranie z gotową mapą, ale przy każdej stacji „Brak ceny” | nagranie, gdy w bazie będą ceny |
| zdjęcie w „o mnie” | awatar z GitHuba, 368x460 px | większe zdjęcie (co najmniej 736 px szerokości, żeby było ostre na ekranach retina) |
| telefon na biurku | plakat `projekt-195-pion` ze starych nagrań pionowych | może zostać albo dostać nowy zrzut pionowy |

## Czego brakuje od Ciebie

1. **Nagrania odloti i Operandi** - dziś tylko zrzut ekranu. Nowe surowe nagrania trafiają do `~/portfolio-narzedzia/surowe/`, a `node zamienniki-v4.mjs` robi z nich pliki i plakaty w `public/video`. Kod strony się nie zmienia.
2. **Zdjęcie** - większa wersja obecnego albo nowe, w ciepłym świetle, pasujące do papieru.
3. **Makiety** - `docs/makiety/` jest pusty od początku. Układ powstał z opisu w briefie. Jeśli makiety dalej są potrzebne jako wzór, wgraj je, a porównam stronę z nimi.
4. **Adresy projektów** - dziś tylko odloti i Operandi mają pole `url`. Każdy kolejny opublikowany projekt dostaje przycisk „otwórz stronę” po dopisaniu jednego pola w `src/data/projekty.ts`.
5. **Cyberstart** - przycisk „zagraj” dojdzie dopiero, gdy gra będzie opublikowana pod stałym adresem.

Fonty są kompletne: DM Sans, Caveat, Instrument Serif i Ms Madi leżą lokalnie, każdy z licencją OFL, polskie znaki działają. Nic tu nie brakuje.

46 nieużywanych plików pionowych (19 MB) usunięte 2026-11-08 na Twoją prośbę.

## Świadome odstępstwa

- **WCAG 2.2.2** - nagrania grają w stałej pętli bez przycisku pauzy. To Twoja decyzja z 2026-11-07. Łagodzenie: przy ograniczonym ruchu w systemie i trybie oszczędzania danych widać tylko plakat, nagranie stoi poza ekranem, nagrania są bez dźwięku. Ryzyko: osoba bez ustawionego ograniczenia ruchu nie zatrzyma nagrania. Jeśli strona ma spełniać WCAG w pełni, wraca mały przycisk pauzy.
- **Wydajność na telefonie** - start ładuje od razu nagranie Enklawy (1,9 MB webm), a symulowane LCP to 2,6 s (próg „dobry” to 2,5 s). Wynik i tak 97. Do poprawy po nowych nagraniach, bo nowy plik i tak trzeba będzie zmieścić w 2 MB.

## Przed scaleniem do `main` i publikacją

- wgrać nowe nagrania albo świadomie wypuścić stronę z zamiennikami
- kliknąć ręcznie linki do GitHuba i LinkedIna (blokują automatyczne sprawdzanie)
- przepisać `README.md` - opisuje jeszcze wersję Next.js i stare zrzuty ekranu (procedura zamknięcia wersji ze skilla `project-docs`)
- `npm run build`, `npm run check` i `npm run check:links` bez błędów
- commit na `astro`, scalenie do `main` dopiero na Twoją prośbę. Push do `main` od razu publikuje stronę (`deploy.yml`)
