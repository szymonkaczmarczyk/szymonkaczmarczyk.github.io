import { homePaths, privacyPaths, sectionIds, termsPaths, type Locale } from './jezyki';

export const siteUrl = 'https://szymonkaczmarczyk.is-a.dev';

export const owner = {
  name: 'Szymon Kaczmarczyk',
  email: 'szymonkaczmarczyk@icloud.com',
  github: 'https://github.com/szymonkaczmarczyk',
  linkedin: 'https://www.linkedin.com/in/szymon-kaczmarczyk/',
};

export const aboutPhoto = '/o-mnie/szymon';

export const legalUpdatedOn = '2026-11-07';

const polishProjectCount = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const isFew = lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14);
  return `${count} ${count === 1 ? 'projekt' : isFew ? 'projekty' : 'projektów'}`;
};

const navigationFor = (locale: Locale, labels: { work: string; about: string; contact: string }) => [
  { href: `${homePaths[locale]}#${sectionIds[locale].work}`, label: labels.work },
  { href: `${homePaths[locale]}#${sectionIds[locale].about}`, label: labels.about },
  { href: `${homePaths[locale]}#${sectionIds[locale].contact}`, label: labels.contact },
];

const polishCopy = {
  meta: {
    title: 'Szymon Kaczmarczyk - rzeczy, które buduję',
    description: 'Cześć, tu Szymon. Pokazuję strony i narzędzia, które zaprojektowałem i zbudowałem sam.',
  },
  navigation: navigationFor('pl', { work: 'Prace', about: 'O mnie', contact: 'Kontakt' }),
  layout: {
    skipLink: 'Przejdź do treści',
    mainNavigation: 'główna',
  },
  start: {
    headingBefore: 'Buduję internet, w którym chce się',
    headingHighlight: 'zostać dłużej',
    description: 'Łączę projektowanie, kod i automatyzację w jedną spokojną całość. Każdy ekran ma jedną myśl, każdy proces obywa się bez zbędnych kroków.',
    actionLabel: 'Zobacz, nad czym pracuję',
    laptopLabel: (name: string) => `nagranie strony ${name} na ekranie laptopa`,
    phoneLabel: (name: string, kind: string) => `nagranie mobilnej wersji strony ${name}, ${kind}, na ekranie telefonu`,
  },
  work: {
    heading: 'Prace',
    chaptersNavigation: 'rozdziały',
    chapterLabel: (number: number, name: string) => `rozdział ${number}: ${name}`,
    viewProject: 'Zobacz projekt',
    recordingLabel: (name: string) => `nagranie projektu ${name}`,
    moreHeading: 'Więcej prac',
    projectCount: polishProjectCount,
  },
  about: {
    note: 'o mnie',
    heading: 'Od pomysłu do działającej strony',
    text: 'Zanim napiszę pierwszą linijkę kodu, wiem już, co ktoś ma zrobić na ekranie i ile kliknięć mu to zajmie. Potem piszę, poprawiam i wyrzucam to, co przeszkadza. Najwięcej uczę się przy tym wyrzucaniu.',
    principle: 'Każde kliknięcie użytkownika musi być warte jego czasu.',
    photoAlt: 'Szymon Kaczmarczyk w czarnym swetrze, siedzi na drewnianej ławce przed przeszkloną ścianą',
  },
  contact: {
    note: 'kontakt',
    heading: 'Masz coś, co powinno działać lepiej? Napisz do mnie',
    text: 'Opisz to w kilku zdaniach. Zacznę od pytań, potem zaproponuję rozwiązanie.',
    actionLabel: 'Napisz wiadomość',
    privacyNote: 'Twój adres i treść wiadomości wykorzystam tylko po to, żeby odpowiedzieć.',
    privacyLinkLead: 'Więcej w',
    privacyLinkLabel: 'polityce prywatności',
  },
  project: {
    back: 'Wszystkie prace',
    inside: 'W środku',
    role: 'Rola',
    stack: 'Technologie',
    openSite: 'Otwórz stronę',
    nextNote: 'następny projekt',
    nextNavigation: 'następny projekt',
  },
  footer: {
    note: 'Strony i narzędzia, które sam projektuję i piszę, od pierwszego szkicu do działającej wersji.',
    siteHeading: 'Strona',
    contactHeading: 'Kontakt',
    legalHeading: 'Informacje',
    languageHeading: 'Język',
    emailLabel: 'E-mail',
  },
  legal: {
    privacy: { href: privacyPaths.pl, label: 'Polityka prywatności' },
    terms: { href: termsPaths.pl, label: 'Regulamin' },
    back: 'Strona główna',
    note: 'informacje prawne',
    updatedPrefix: 'Ostatnia zmiana:',
    updatedLabel: '7 listopada 2026',
  },
};

type SiteCopy = typeof polishCopy;

const englishCopy: SiteCopy = {
  meta: {
    title: 'Szymon Kaczmarczyk - things I build',
    description: 'Hi, I’m Szymon. These are websites and tools I designed and built myself.',
  },
  navigation: navigationFor('en', { work: 'Work', about: 'About', contact: 'Contact' }),
  layout: {
    skipLink: 'Skip to content',
    mainNavigation: 'main',
  },
  start: {
    headingBefore: 'I build websites you’ll want to',
    headingHighlight: 'stay on longer',
    description: 'I bring design, code and automation together into one calm whole. Every screen has one idea, every process skips the steps it does not need.',
    actionLabel: 'See what I’m working on',
    laptopLabel: (name: string) => `recording of the ${name} website on a laptop screen`,
    phoneLabel: (name: string, kind: string) => `recording of the mobile ${name} website, ${kind}, on a phone screen`,
  },
  work: {
    heading: 'Work',
    chaptersNavigation: 'chapters',
    chapterLabel: (number: number, name: string) => `chapter ${number}: ${name}`,
    viewProject: 'View project',
    recordingLabel: (name: string) => `recording of the ${name} project`,
    moreHeading: 'More work',
    projectCount: (count: number) => `${count} ${count === 1 ? 'project' : 'projects'}`,
  },
  about: {
    note: 'about me',
    heading: 'From idea to a working website',
    text: 'Before I write the first line of code, I already know what someone needs to do on the screen and how many clicks it will take. Then I write, refine and throw out whatever gets in the way. Throwing things out is where I learn the most.',
    principle: 'Every click should be worth the user’s time.',
    photoAlt: 'Szymon Kaczmarczyk in a black sweater, sitting on a wooden bench in front of a glass wall',
  },
  contact: {
    note: 'contact',
    heading: 'Got something that should work better? Write to me',
    text: 'Describe it in a few sentences. I’ll start with questions, then propose a solution.',
    actionLabel: 'Send a message',
    privacyNote: 'I’ll use your address and message only to reply.',
    privacyLinkLead: 'More in the',
    privacyLinkLabel: 'privacy policy',
  },
  project: {
    back: 'All work',
    inside: 'Inside',
    role: 'Role',
    stack: 'Tech stack',
    openSite: 'Open website',
    nextNote: 'next project',
    nextNavigation: 'next project',
  },
  footer: {
    note: 'Websites and tools I design and write myself, from the first sketch to a working version.',
    siteHeading: 'Site',
    contactHeading: 'Contact',
    legalHeading: 'Legal',
    languageHeading: 'Language',
    emailLabel: 'Email',
  },
  legal: {
    privacy: { href: privacyPaths.en, label: 'Privacy policy' },
    terms: { href: termsPaths.en, label: 'Terms of use' },
    back: 'Home',
    note: 'legal information',
    updatedPrefix: 'Last updated:',
    updatedLabel: '7 November 2026',
  },
};

export const siteCopy: Record<Locale, SiteCopy> = { pl: polishCopy, en: englishCopy };
