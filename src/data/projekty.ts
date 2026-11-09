import { projectPaths, sectionIds, type Locale } from './jezyki';

type ProjectText = {
  kind: string;
  tagline: string;
  summary: string;
};

export type Project = {
  slug: string;
  name: string;
  stack: string[];
  url?: string;
  text: Record<Locale, ProjectText>;
};

export type LocalizedProject = Omit<Project, 'text'> & ProjectText & { role: string };

const soloRole: Record<Locale, string> = {
  pl: 'projekt, kod, testy i dokumentacja',
  en: 'design, code, testing and documentation',
};

export const projects: Project[] = [
  {
    slug: 'enklawa',
    name: 'Enklawa Villas',
    stack: ['Astro', 'GSAP', 'Lenis'],
    text: {
      pl: {
        kind: 'strona agencji nieruchomości premium',
        tagline: 'Strona agencji nieruchomości premium, w której każda rezydencja ma własną podstronę i filmowe wejście.',
        summary: 'filmowe intro, scrollytelling z klatek wideo na canvasie i portfolio rezydencji z własnymi podstronami',
      },
      en: {
        kind: 'premium real estate agency website',
        tagline: 'A premium real estate agency website where every residence has its own page and a cinematic entrance.',
        summary: 'a cinematic intro, scrollytelling built from video frames on canvas and a portfolio of residences with their own pages',
      },
    },
  },
  {
    slug: 'projekt-195',
    name: 'Projekt 195',
    stack: ['Astro', 'WebGL', 'GSAP'],
    text: {
      pl: {
        kind: 'blog podróżniczy',
        tagline: 'Pisanie relacji ma tu być tak lekkie jak jej czytanie.',
        summary: 'intro z okna samolotu, globus WebGL na zdjęciach NASA i relacje z podróży pisane w markdown',
      },
      en: {
        kind: 'travel blog',
        tagline: 'Writing a trip report should feel as light as reading one.',
        summary: 'an intro from a plane window, a WebGL globe on NASA imagery and trip reports written in markdown',
      },
    },
  },
  {
    slug: 'tankomapa',
    name: 'Tankomapa',
    stack: ['Astro', 'MapLibre', 'Workers'],
    text: {
      pl: {
        kind: 'mapa cen paliw w Polsce',
        tagline: 'Narzędzia, które odpowiadają na jedno proste pytanie. Tutaj brzmi ono: gdzie zatankować taniej.',
        summary: 'stacje na mapie WebGL, filtry paliw, promień wyszukiwania i lista od najtańszej',
      },
      en: {
        kind: 'fuel price map of Poland',
        tagline: 'Tools that answer one simple question. Here it is: where can I fill up for less.',
        summary: 'stations on a WebGL map, fuel filters, a search radius and a list sorted from the cheapest',
      },
    },
  },
  {
    slug: 'odloti',
    name: 'odloti',
    stack: ['React', 'Vite', 'MapLibre'],
    url: 'https://odloti.com',
    text: {
      pl: {
        kind: 'wyszukiwarka tanich lotów z Polski',
        tagline: 'Mapa tras, na której tania podróż układa się sama, a ceny są świeże każdego ranka.',
        summary: 'mapa tras i podróże składane z najtańszych odcinków, dane odświeżane co noc',
      },
      en: {
        kind: 'cheap flight finder from Poland',
        tagline: 'A route map where a cheap trip puts itself together, with prices refreshed every morning.',
        summary: 'a route map and trips assembled from the cheapest legs, with data refreshed every night',
      },
    },
  },
  {
    slug: 'operandi',
    name: 'Operandi',
    stack: ['Astro', 'GSAP', 'Lenis'],
    url: 'https://operandi-systems.com',
    text: {
      pl: {
        kind: 'wielojęzyczny landing B2B',
        tagline: 'Wielojęzyczny landing narzędzia, które przepisuje kod sterowników Siemens z STL na SCL.',
        summary: 'strona narzędzia, które przepisuje kod sterowników Siemens z STL na SCL',
      },
      en: {
        kind: 'multilingual B2B landing page',
        tagline: 'A multilingual landing page for a tool that rewrites Siemens PLC code from STL to SCL.',
        summary: 'the website of a tool that rewrites Siemens PLC code from STL to SCL',
      },
    },
  },
  {
    slug: 'kilwater',
    name: 'Kilwater',
    stack: ['Astro', 'GSAP', 'zod'],
    text: {
      pl: {
        kind: 'landing czarteru jachtów',
        tagline: 'Landing czarteru jachtów z łukowymi kadrami i formularzem sprawdzanym w przeglądarce i na serwerze.',
        summary: 'łukowe kadry, linia fali rysowana przy przewijaniu i formularz sprawdzany w przeglądarce i na serwerze',
      },
      en: {
        kind: 'yacht charter landing page',
        tagline: 'A yacht charter landing page with arched frames and a form validated in the browser and on the server.',
        summary: 'arched frames, a wave line drawn on scroll and a form validated in the browser and on the server',
      },
    },
  },
  {
    slug: 'ceralab',
    name: 'CeraLab',
    stack: ['Vite', 'TypeScript', 'GSAP'],
    text: {
      pl: {
        kind: 'strona marki kosmetycznej',
        tagline: 'Produkty zostają na ekranie, a pielęgnacja rozkłada się na proste kroki.',
        summary: 'hero z wideo, przypięta sekcja produktów i rytuał pielęgnacji krok po kroku',
      },
      en: {
        kind: 'skincare brand website',
        tagline: 'The products stay on screen while the skincare routine breaks down into simple steps.',
        summary: 'a video hero, a pinned product section and a step-by-step skincare ritual',
      },
    },
  },
  {
    slug: 'panrouter',
    name: 'PanRouter',
    stack: ['Preact', 'TypeScript', 'Vite'],
    text: {
      pl: {
        kind: 'symulator sieci z kursem',
        tagline: 'Symulator sieci z kursem, laboratoriami z oceną i egzaminem końcowym.',
        summary: 'plansza z routerami i zaporami, krokowa symulacja pakietów, laboratoria z oceną i egzamin końcowy',
      },
      en: {
        kind: 'network simulator with a course',
        tagline: 'A network simulator with a course, graded labs and a final exam.',
        summary: 'a board with routers and firewalls, step-by-step packet simulation, graded labs and a final exam',
      },
    },
  },
  {
    slug: 'cyberstart',
    name: 'Cyberstart',
    stack: ['HTML', 'CSS', 'ES modules'],
    text: {
      pl: {
        kind: 'nauka cyberbezpieczeństwa w grach',
        tagline: 'Rozpoznaj phishing, ustaw firewall i przeczytaj logi SOC, zanim zrobi to atakujący.',
        summary: 'minigry po polsku - terminal Kali, phishing, firewall i logi SOC, działa też offline',
      },
      en: {
        kind: 'learning cybersecurity through games',
        tagline: 'Spot phishing, set up a firewall and read SOC logs before an attacker does.',
        summary: 'minigames in Polish - a Kali terminal, phishing, a firewall and SOC logs, works offline too',
      },
    },
  },
  {
    slug: 'race-predictor',
    name: 'Race Predictor',
    stack: ['Python', 'Flask', 'scikit-learn'],
    text: {
      pl: {
        kind: 'predykcje wyścigów F1',
        tagline: 'Przed każdym Grand Prix wyścig odbywa się najpierw w symulacji.',
        summary: 'symulowane wyścigi na każde Grand Prix - pole startowe, forma, tor i pogoda w jednym widoku',
      },
      en: {
        kind: 'F1 race predictions',
        tagline: 'Before every Grand Prix, the race runs in a simulation first.',
        summary: 'simulated races for every Grand Prix - starting grid, form, track and weather in one view',
      },
    },
  },
  {
    slug: 'match-predictor',
    name: 'Match Predictor',
    stack: ['FastAPI', 'scikit-learn'],
    text: {
      pl: {
        kind: 'predykcje meczów reprezentacji',
        tagline: 'Projekt na wieczory przed meczem - model, który podpowiada, na co się nastawić.',
        summary: 'model uczony na historii meczów reprezentacji podaje szanse i najbardziej prawdopodobny wynik',
      },
      en: {
        kind: 'national team match predictions',
        tagline: 'A project for the evenings before a match - a model that tells you what to expect.',
        summary: 'a model trained on the history of national team matches gives the odds and the most likely score',
      },
    },
  },
  {
    slug: 'claus',
    name: 'Claus',
    stack: ['Vite', 'JavaScript'],
    text: {
      pl: {
        kind: 'lokalny analizator umów',
        tagline: 'Lokalny analizator umów, który szuka klauzul niedozwolonych z rejestru UOKiK.',
        summary: 'szuka klauzul niedozwolonych z rejestru UOKiK i nie wysyła dokumentu poza urządzenie',
      },
      en: {
        kind: 'local contract analyzer',
        tagline: 'A local contract analyzer that looks for unfair terms listed in the register of the Polish consumer protection office (UOKiK).',
        summary: 'finds unfair terms from the UOKiK register and never sends the document off the device',
      },
    },
  },
  {
    slug: 'esencja',
    name: 'Esencja',
    stack: ['React', 'Tailwind', 'GSAP'],
    text: {
      pl: {
        kind: 'rezerwacje w restauracji fine dining',
        tagline: 'System rezerwacji dla restauracji fine dining z wyborem stolika na planie sali.',
        summary: 'karta menu, wybór konkretnego stolika na planie sali i panel gościa z historią rezerwacji',
      },
      en: {
        kind: 'fine dining reservations',
        tagline: 'A reservation system for a fine dining restaurant with table selection on the floor plan.',
        summary: 'a menu, picking a specific table on the floor plan and a guest panel with booking history',
      },
    },
  },
];

export const chapterSlugs = ['enklawa', 'projekt-195', 'operandi', 'odloti'];
export const deskScreenSlugs = { laptop: 'enklawa', phone: 'kilwater' };

const bySlug = (slug: string) => {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`brak projektu ${slug}`);
  return project;
};

export const localizeProject = (project: Project, locale: Locale): LocalizedProject => {
  const { text, ...shared } = project;
  return { ...shared, ...text[locale], role: soloRole[locale] };
};

export const chapterProjects = chapterSlugs.map(bySlug);
export const moreProjects = projects.filter((project) => !chapterSlugs.includes(project.slug));
export const deskLaptopProject = bySlug(deskScreenSlugs.laptop);
export const deskPhoneProject = bySlug(deskScreenSlugs.phone);

export const homeAnchorFor = (slug: string, locale: Locale) => {
  const ids = sectionIds[locale];
  return `${chapterSlugs.includes(slug) ? ids.chapter : ids.moreWork}${slug}`;
};

export const projectHref = (slug: string, locale: Locale) => projectPaths(slug)[locale];
export const transitionNameFor = (slug: string) => `projekt-${slug}`;
export const titleTransitionNameFor = (slug: string) => `nazwa-${slug}`;

export const nextProjectAfter = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
