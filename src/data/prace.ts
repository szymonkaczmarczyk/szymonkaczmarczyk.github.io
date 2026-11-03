export type RecordedWork = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  featured: boolean;
};

export type LiveSite = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  url: string;
  allowsEmbedding: boolean;
};

export const recordedWorks: RecordedWork[] = [
  {
    slug: 'enklawa',
    name: 'Enklawa Villas',
    kind: 'strona agencji nieruchomości premium',
    summary: 'filmowe intro, scrollytelling z klatek wideo na canvasie i portfolio ośmiu rezydencji z własnymi podstronami',
    stack: ['Astro', 'GSAP', 'Lenis'],
    featured: true,
  },
  {
    slug: 'projekt-195',
    name: 'Projekt 195',
    kind: 'blog podróżniczy',
    summary: 'intro z okna samolotu, globus WebGL na zdjęciach NASA i relacje ze 104 krajów pisane w markdown',
    stack: ['Astro', 'WebGL', 'GSAP'],
    featured: true,
  },
  {
    slug: 'kilwater',
    name: 'Kilwater',
    kind: 'landing czarteru jachtów',
    summary: 'łukowe kadry, linia fali rysowana przy przewijaniu i formularz sprawdzany w przeglądarce i na serwerze',
    stack: ['Astro', 'GSAP', 'zod'],
    featured: false,
  },
  {
    slug: 'ceralab',
    name: 'CeraLab',
    kind: 'strona marki kosmetycznej',
    summary: 'hero z wideo, przypięta sekcja trzech produktów i rytuał pielęgnacji w trzech krokach',
    stack: ['Vite', 'TypeScript', 'GSAP'],
    featured: false,
  },
  {
    slug: 'tankomapa',
    name: 'Tankomapa',
    kind: 'mapa cen paliw w Polsce',
    summary: 'wszystkie stacje na mapie WebGL, filtry paliw, promień wyszukiwania i lista od najtańszej',
    stack: ['Astro', 'MapLibre', 'Workers'],
    featured: true,
  },
  {
    slug: 'panrouter',
    name: 'PanRouter',
    kind: 'symulator sieci z kursem',
    summary: 'plansza z routerami i zaporami, krokowa symulacja pakietów, 25 laboratoriów z oceną i egzamin końcowy',
    stack: ['Preact', 'TypeScript', 'Vite'],
    featured: true,
  },
  {
    slug: 'cyberstart',
    name: 'Cyberstart',
    kind: 'nauka cyberbezpieczeństwa w grach',
    summary: '36 minigier po polsku - terminal Kali, phishing, firewall i logi SOC, działa też offline',
    stack: ['HTML', 'CSS', 'ES modules'],
    featured: false,
  },
  {
    slug: 'race-predictor',
    name: 'Race Predictor',
    kind: 'predykcje wyścigów F1',
    summary: '20 000 symulowanych wyścigów na każde Grand Prix - pole startowe, forma, tor i pogoda w jednym widoku',
    stack: ['Python', 'Flask', 'scikit-learn'],
    featured: false,
  },
  {
    slug: 'match-predictor',
    name: 'Match Predictor',
    kind: 'predykcje meczów reprezentacji',
    summary: 'model uczony na ponad 48 tysiącach meczów od 1872 roku podaje szanse i najbardziej prawdopodobny wynik',
    stack: ['FastAPI', 'scikit-learn'],
    featured: false,
  },
  {
    slug: 'claus',
    name: 'Claus',
    kind: 'lokalny analizator umów',
    summary: 'szuka klauzul niedozwolonych z rejestru UOKiK i nie wysyła dokumentu poza urządzenie',
    stack: ['Vite', 'JavaScript'],
    featured: false,
  },
  {
    slug: 'esencja',
    name: 'Esencja',
    kind: 'rezerwacje w restauracji fine dining',
    summary: 'karta menu, wybór konkretnego stolika na planie sali i panel gościa z historią rezerwacji',
    stack: ['React', 'Tailwind', 'GSAP'],
    featured: false,
  },
];

export const showreelChapters: { slug: string; start: number }[] = [
  { slug: 'enklawa', start: 0 },
  { slug: 'projekt-195', start: 4.15 },
  { slug: 'ceralab', start: 7.15 },
  { slug: 'kilwater', start: 10.05 },
  { slug: 'tankomapa', start: 12.95 },
];

export const liveSites: LiveSite[] = [
  {
    slug: 'odloti',
    name: 'Odloti',
    kind: 'wyszukiwarka tanich lotów z Polski',
    summary: 'mapa tras i podróże składane z najtańszych odcinków, dane odświeżane co noc',
    url: 'https://odloti.com',
    allowsEmbedding: false,
  },
  {
    slug: 'operandi',
    name: 'Operandi',
    kind: 'landing B2B w siedmiu językach',
    summary: 'strona narzędzia, które przepisuje kod sterowników Siemens z STL na SCL',
    url: 'https://operandi-systems.com',
    allowsEmbedding: false,
  },
];
