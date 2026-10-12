import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({ site: 'https://zilu.dev', output: 'static', integrations: [sitemap()], build: { format: 'directory' } });
