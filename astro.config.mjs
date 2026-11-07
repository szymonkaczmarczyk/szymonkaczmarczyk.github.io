import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://szymonkaczmarczyk.is-a.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
