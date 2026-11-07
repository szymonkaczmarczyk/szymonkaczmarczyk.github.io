export type ProjectMedia = 'video' | 'still';

export type Project = {
  slug: string;
  name: string;
  kind: string;
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
    summary: 'filmowe intro, scrollytelling z klatek wideo na canvasie i portfolio rezydencji z własnymi podstronami',
    role: soloRole,
    stack: ['Astro', 'GSAP', 'Lenis'],
    media: 'video',
  },
  {
    slug: 'projekt-195',
    name: 'Projekt 195',
    kind: 'blog podróżniczy',
    summary: 'intro z okna samolotu, globus WebGL na zdjęciach NASA i relacje z podróży pisane w markdown',
    role: soloRole,
    stack: ['Astro', 'WebGL', 'GSAP'],
    media: 'video',
  },
  {
    slug: 'tankomapa',
    name: 'Tankomapa',
    kind: 'mapa cen paliw w Polsce',
    summary: 'stacje na mapie WebGL, filtry paliw, promień wyszukiwania i lista od najtańszej',
    role: soloRole,
    stack: ['Astro', 'MapLibre', 'Workers'],
    media: 'video',
  },
  {
    slug: 'odloti',
    name: 'odloti',
    kind: 'wyszukiwarka tanich lotów z Polski',
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
    summary: 'łukowe kadry, linia fali rysowana przy przewijaniu i formularz sprawdzany w przeglądarce i na serwerze',
    role: soloRole,
    stack: ['Astro', 'GSAP', 'zod'],
    media: 'video',
  },
  {
    slug: 'ceralab',
    name: 'CeraLab',
    kind: 'strona marki kosmetycznej',
    summary: 'hero z wideo, przypięta sekcja produktów i rytuał pielęgnacji krok po kroku',
    role: soloRole,
    stack: ['Vite', 'TypeScript', 'GSAP'],
    media: 'video',
  },
  {
    slug: 'panrouter',
    name: 'PanRouter',
    kind: 'symulator sieci z kursem',
    summary: 'plansza z routerami i zaporami, krokowa symulacja pakietów, laboratoria z oceną i egzamin końcowy',
    role: soloRole,
    stack: ['Preact', 'TypeScript', 'Vite'],
    media: 'video',
  },
  {
    slug: 'cyberstart',
    name: 'Cyberstart',
    kind: 'nauka cyberbezpieczeństwa w grach',
    summary: 'minigry po polsku - terminal Kali, phishing, firewall i logi SOC, działa też offline',
    role: soloRole,
    stack: ['HTML', 'CSS', 'ES modules'],
    media: 'video',
  },
  {
    slug: 'race-predictor',
    name: 'Race Predictor',
    kind: 'predykcje wyścigów F1',
    summary: 'symulowane wyścigi na każde Grand Prix - pole startowe, forma, tor i pogoda w jednym widoku',
    role: soloRole,
    stack: ['Python', 'Flask', 'scikit-learn'],
    media: 'video',
  },
  {
    slug: 'match-predictor',
    name: 'Match Predictor',
    kind: 'predykcje meczów reprezentacji',
    summary: 'model uczony na historii meczów reprezentacji podaje szanse i najbardziej prawdopodobny wynik',
    role: soloRole,
    stack: ['FastAPI', 'scikit-learn'],
    media: 'video',
  },
  {
    slug: 'claus',
    name: 'Claus',
    kind: 'lokalny analizator umów',
    summary: 'szuka klauzul niedozwolonych z rejestru UOKiK i nie wysyła dokumentu poza urządzenie',
    role: soloRole,
    stack: ['Vite', 'JavaScript'],
    media: 'video',
  },
  {
    slug: 'esencja',
    name: 'Esencja',
    kind: 'rezerwacje w restauracji fine dining',
    summary: 'karta menu, wybór konkretnego stolika na planie sali i panel gościa z historią rezerwacji',
    role: soloRole,
    stack: ['React', 'Tailwind', 'GSAP'],
    media: 'video',
  },
];

export const chapterSlugs = ['enklawa', 'projekt-195', 'tankomapa', 'odloti'];
export const aboutPlayableSlug = 'cyberstart';

const bySlug = (slug: string) => {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`brak projektu ${slug}`);
  return project;
};

export const chapterProjects = chapterSlugs.map(bySlug);
export const moreProjects = projects.filter((project) => !chapterSlugs.includes(project.slug) && project.slug !== aboutPlayableSlug);
export const aboutPlayableProject = bySlug(aboutPlayableSlug);
