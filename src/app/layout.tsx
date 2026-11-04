import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MotionProvider } from '@/components/MotionProvider';
import { siteUrl } from '@/data/strona';

const motionBootstrap = `(function(){var root=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;root.classList.add('js-motion');setTimeout(function(){if(!root.classList.contains('motion-ready'))root.classList.remove('js-motion')},4000)})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Szymon Kaczmarczyk - strony i aplikacje, które się ruszają',
  description: 'portfolio Szymona Kaczmarczyka - nagrania stron i aplikacji z localhosta oraz dwie opublikowane strony do przeklikania na żywo',
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/',
    title: 'Szymon Kaczmarczyk - portfolio',
    description: 'strony i aplikacje, które się ruszają - nagrania prac i podglądy na żywo',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Szymon Kaczmarczyk - portfolio' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#fdfdfe',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/baloo-2-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a className="skip-link" href="#tresc">
          przejdź do treści
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
