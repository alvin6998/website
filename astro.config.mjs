import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alvinhomelab.idv.tw',
  integrations: [sitemap()],
});