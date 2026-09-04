import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// عنوان الموقع له مصدر واحد فقط: حقل Astro `site` أدناه عبر هذا المتغير.
// اتركه فارغاً قبل اعتماد النطاق الحقيقي؛ لن يتعطل البناء ولن يُنشأ sitemap.
const configuredSite = (process.env.PUBLIC_SITE_URL ?? '').trim();
const site = configuredSite || undefined;

export default defineConfig({
  site,
  output: 'static',
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
