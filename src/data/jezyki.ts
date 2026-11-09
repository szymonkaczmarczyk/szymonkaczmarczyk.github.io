export type Locale = 'pl' | 'en';
export type LocalizedPath = Record<Locale, string>;

export const locales: Locale[] = ['pl', 'en'];
export const defaultLocale: Locale = 'pl';

export const otherLocale = (locale: Locale): Locale => (locale === 'pl' ? 'en' : 'pl');

export const localeMeta = {
  pl: { htmlLang: 'pl', ogLocale: 'pl_PL', switchLabel: 'PL', switchName: 'Wersja polska', nativeName: 'Polski' },
  en: { htmlLang: 'en', ogLocale: 'en_US', switchLabel: 'EN', switchName: 'English version', nativeName: 'English' },
} satisfies Record<Locale, Record<string, string>>;

export const sectionIds = {
  pl: { content: 'tresc', start: 'start', work: 'prace', more: 'wiecej', about: 'o-mnie', contact: 'kontakt', chapter: 'rozdzial-', moreWork: 'praca-' },
  en: { content: 'content', start: 'start', work: 'work', more: 'more', about: 'about', contact: 'contact', chapter: 'chapter-', moreWork: 'work-' },
} satisfies Record<Locale, Record<string, string>>;

export const homePaths: LocalizedPath = { pl: '/', en: '/en/' };
export const privacyPaths: LocalizedPath = { pl: '/polityka-prywatnosci/', en: '/en/privacy/' };
export const termsPaths: LocalizedPath = { pl: '/regulamin/', en: '/en/terms/' };
export const projectPaths = (slug: string): LocalizedPath => ({ pl: `/prace/${slug}/`, en: `/en/work/${slug}/` });
