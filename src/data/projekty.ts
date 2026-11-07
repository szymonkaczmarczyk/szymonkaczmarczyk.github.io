export type ProjectMedia = 'video' | 'still';

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  media: ProjectMedia;
  url?: string;
};

const soloRole = 'projekt, kod, testy i dokumentacja';

export const projects: Project[] = [
  {
    slug: 'enklawa',
    name: 'Enklawa Villas',
    kind: 'strona agencji nieruchomości premium',
    tagline: 'strona agencji nieruchomości premium, w której każda rezydencja ma własną podstronę i filmowe wejście.',
    summary: 'filmowe intro, scrollytelling z klatek wideo na canvasie i portfolio rezydencji z własnymi podstronami',
    role: soloRole,
    stack: ['Astro', 'GSAP', 'Lenis'],
    media: 'video',
  },
  {
    slug: 'projekt-195',
    name: 'Projekt 195',
    kind: 'blog podróżniczy',
    tagline: 'pisanie relacji ma tu być tak lekkie jak jej czytanie.',
    summary: 'intro z okna samolotu, globus WebGL na zdjęciach NASA i relacje z podróży pisane w markdown',
    role: soloRole,
    stack: ['Astro', 'WebGL', 'GSAP'],
    media: 'video',
  },
  {
    slug: 'tankomapa',
    name: 'Tankomapa',
    kind: 'mapa cen paliw w Polsce',
    tagline: 'narzędzia, które odpowiadają na jedno proste pytanie. tutaj brzmi ono: gdzie zatankować taniej.',
    summary: 'stacje na mapie WebGL, filtry paliw, promień wyszukiwania i lista od najtańszej',
    role: soloRole,
    stack: ['Astro', 'MapLibre', 'Workers'],
    media: 'video',
  },
  {
    slug: 'odloti',
    name: 'odloti',
    kind: 'wyszukiwarka tanich lotów z Polski',
    tagline: 'mapa tras, na której tania podróż układa się sama, a ceny są świeże każdego ranka.',
    summary: 'mapa tras i podróże składane z najtańszych odcinków, dane odświeżane co noc',
    role: soloRole,
    stack: ['React', 'Vite', 'MapLibre'],
    media: 'still',
    url: 'https://odloti.com',
  },
  {
    slug: 'operandi',
    name: 'Operandi',
    kind: 'wielojęzyczny landing B2B',
    tagline: 'wielojęzyczny landing narzędzia, które przepisuje kod sterowników Siemens z STL na SCL.',
    summary: 'strona narzędzia, które przepisuje kod sterowników Siemens z STL na SCL',
    role: soloRole,
    stack: ['Astro', 'GSAP', 'Lenis'],
    media: 'still',
    url: 'https://operandi-systems.com',
  },
  {
    slug: 'kilwater',
    name: 'Kilwater',
    kind: 'landing czarteru jachtów',
    tagline: 'landing czarteru jachtów z łukowymi kadrami i formularzem sprawdzanym w przeglądarce i na serwerze.',
    summary: 'łukowe kadry, linia fali rysowana przy przewijaniu i formularz sprawdzany w przeglądarce i na serwerze',
    role: soloRole,
    stack: ['Astro', 'GSAP', 'zod'],
    media: 'video',
  },
  {
    slug: 'ceralab',
    name: 'CeraLab',
    kind: 'strona marki kosmetycznej',
    tagline: 'produkty zostają na ekranie, a pielęgnacja rozkłada się na proste kroki.',
    summary: 'hero z wideo, przypięta sekcja produktów i rytuał pielęgnacji krok po kroku',
    role: soloRole,
    stack: ['Vite', 'TypeScript', 'GSAP'],
    media: 'video',
  },
  {
    slug: 'panrouter',
    name: 'PanRouter',
    kind: 'symulator sieci z kursem',
    tagline: 'symulator sieci z kursem, laboratoriami z oceną i egzaminem końcowym.',
    summary: 'plansza z routerami i zaporami, krokowa symulacja pakietów, laboratoria z oceną i egzamin końcowy',
    role: soloRole,
    stack: ['Preact', 'TypeScript', 'Vite'],
    media: 'video',
  },
  {
    slug: 'cyberstart',
    name: 'Cyberstart',
    kind: 'nauka cyberbezpieczeństwa w grach',
    tagline: 'rozpoznaj phishing, ustaw firewall i przeczytaj logi SOC, zanim zrobi to atakujący.',
    summary: 'minigry po polsku - terminal Kali, phishing, firewall i logi SOC, działa też offline',
    role: soloRole,
    stack: ['HTML', 'CSS', 'ES modules'],
    media: 'video',
  },
  {
    slug: 'race-predictor',
    name: 'Race Predictor',
    kind: 'predykcje wyścigów F1',
    tagline: 'przed każdym Grand Prix wyścig odbywa się najpierw w symulacji.',
    summary: 'symulowane wyścigi na każde Grand Prix - pole startowe, forma, tor i pogoda w jednym widoku',
    role: soloRole,
    stack: ['Python', 'Flask', 'scikit-learn'],
    media: 'video',
  },
  {
    slug: 'match-predictor',
    name: 'Match Predictor',
    kind: 'predykcje meczów reprezentacji',
    tagline: 'projekt na wieczory przed meczem - model, który podpowiada, na co się nastawić.',
    summary: 'model uczony na historii meczów reprezentacji podaje szanse i najbardziej prawdopodobny wynik',
    role: soloRole,
    stack: ['FastAPI', 'scikit-learn'],
    media: 'video',
  },
  {
    slug: 'claus',
    name: 'Claus',
    kind: 'lokalny analizator umów',
    tagline: 'lokalny analizator umów, który szuka klauzul niedozwolonych z rejestru UOKiK.',
    summary: 'szuka klauzul niedozwolonych z rejestru UOKiK i nie wysyła dokumentu poza urządzenie',
    role: soloRole,
    stack: ['Vite', 'JavaScript'],
    media: 'video',
  },
  {
    slug: 'esencja',
    name: 'Esencja',
    kind: 'rezerwacje w restauracji fine dining',
    tagline: 'system rezerwacji dla restauracji fine dining z wyborem stolika na planie sali.',
    summary: 'karta menu, wybór konkretnego stolika na planie sali i panel gościa z historią rezerwacji',
    role: soloRole,
    stack: ['React', 'Tailwind', 'GSAP'],
    media: 'video',
  },
];

export const chapterSlugs = ['enklawa', 'projekt-195', 'tankomapa', 'odloti'];
export const aboutPlayableSlug = 'cyberstart';
export const deskScreenSlugs = { laptop: 'enklawa', phone: 'projekt-195' };

const bySlug = (slug: string) => {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`brak projektu ${slug}`);
  return project;
};

export const chapterProjects = chapterSlugs.map(bySlug);
export const moreProjects = projects.filter((project) => !chapterSlugs.includes(project.slug) && project.slug !== aboutPlayableSlug);
export const aboutPlayableProject = bySlug(aboutPlayableSlug);
export const deskLaptopProject = bySlug(deskScreenSlugs.laptop);
export const deskPhoneProject = bySlug(deskScreenSlugs.phone);
