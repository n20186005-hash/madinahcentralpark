# دليل حديقة الملك فهد المركزية – المدينة المنورة

مشروع معلومات سياحية عربي مستقل مبني باستخدام Astro + Tailwind CSS + TypeScript، ومهيأ للنشر كأصول ثابتة عبر Cloudflare Workers.

## الإصدارات المثبتة
- Node.js: 24.20.0
- pnpm: 11.25.0
- Astro: 7.2.4
- @astrojs/sitemap: 3.7.3
- Tailwind CSS / @tailwindcss/vite: 4.3.3
- TypeScript: 6.0.3
- @astrojs/check: 0.9.10
- Wrangler: 4.127.1 عند النشر عبر `pnpm dlx`

## النطاق
مصدر عنوان الموقع الوحيد هو Astro `site` في `astro.config.mjs`، ويُملأ من `PUBLIC_SITE_URL`. عند تركه فارغاً:
- يستمر البناء بصورة طبيعية.
- لا يُطبع canonical أو `og:url` مطلق.
- لا يتم تشغيل تكامل sitemap.
- لا يُستخدم أي نطاق بديل أو وهمي.

بعد اعتماد النطاق، اضبط `PUBLIC_SITE_URL` وأعد البناء فقط.

## التطوير المحلي
```bash
corepack enable
corepack prepare pnpm@11.25.0 --activate
CI=1 pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## Cloudflare Workers
```bash
pnpm deploy
```
ملف `wrangler.jsonc` ينشر مجلد `dist` كأصول ثابتة ويستخدم صفحة 404 المحلية.

## Google Analytics
معرّف القياس هو `G-HXM22WWPKP`. لا يتم تحميل مكتبة Google Analytics إلا بعد تفعيل المستخدم خيار التحليلات من `/cookie-settings/`.

## الصور
الموقع لا يستخدم hotlink للصور. مسارات الصور المتوقعة موثقة في `public/images/PHOTO-CREDITS.md`. راجع `BUILD-STATUS.md` لمعرفة حالة تنزيل ملفات JPG في بيئة التسليم الحالية.
