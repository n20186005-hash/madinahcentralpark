import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// النطاق الرسمي المعتمد: madinahcentralpark.com
// يمكن تجاوزه مؤقتاً ببيئة PUBLIC_SITE_URL عند الحاجة.
const configuredSite = (process.env.PUBLIC_SITE_URL ?? '').trim();
const site = configuredSite || 'https://madinahcentralpark.com';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
