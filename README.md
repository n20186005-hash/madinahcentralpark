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
النطاق الرسمي المعتمد هو `madinahcentralpark.com` وهو القيمة الافتراضية في `astro.config.mjs`. تُشتق منه canonical و`og:url` و`og:image` وJSON-LD وتشغيل تكامل sitemap. يمكن تجاوزه مؤقتاً بمتغير البيئة `PUBLIC_SITE_URL` عند الحاجة فقط.

## Sitemap وrobots
- `@astrojs/sitemap` يولّد `dist/sitemap-index.xml` و`sitemap-0.xml` (4 صفحات: الرئيسية والسياسات الثلاث، و404 مستثنى تلقائياً).
- `public/robots.txt` يسمح بالزحف ويشير إلى `sitemap-index.xml`.

## PWA والتثبيت
- `public/manifest.webmanifest` (عربي، RTL، ألوان الموقع، أيقونات 192/512 + maskable).
- `public/sw.js`: استراتيجية network-first للتنقل مع كاش إصدار وبديل دون اتصال، وcache-first للأصول، ومقيّد بالنطاق نفسه.
- `public/icons/icon-192.png` و`icon-512.png` مولّدان من شعار الموقع عبر `node scripts/make-pwa-icons.mjs` (بدون اعتماديات).
- تسجيل عامل الخدمة في تذييل `<head>` يُستثنى من `localhost`؛ تحقّق `scripts/verify-dist.mjs` ألا تتضمن المخرجات عناوين localhost مكتوبة فعلاً.

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
الموقع لا يستخدم hotlink للصور. تتوفر ستة ملفات JPG محلية في `public/images/` (`hero/evening/fountain/entrance/playground/walkway`) تُستخدم في الواجهة والمعرض. مسارات الصور المتوقعة موثقة في `public/images/PHOTO-CREDITS.md`.

## محتوى الصفحة وأقسامها
الترتيب الحالي: مقدمة → عن الحديقة → خطط للزيارة → المرافق والخدمات (أنواع فقط دون أسماء) → حالة الطقس → الوصول والخريطة → أماكن قريبة وخيارات طعام → خلفية المكان وتطوره → تجربة الزيارة → معرض الصور → الأسئلة الشائعة (13) → المصادر (4).

## الطقس
يعرض قسم الطقس الحالة الراهنة وتوقعات ستة أيام عبر خدمة Open-Meteo المجانية (لا حاجة لمفتاح). تُجلب البيانات من الخادم وقت بناء الموقع وتُخزَّن داخل صفحة HTML الثابتة، فلا يرسل المتصفح أي طلب طقس إلى طرف ثالث، ولا تؤثر على سياسة ملفات تعريف الارتباط. عند فشل الجلب تُعرض رسالة إرشادية بدلاً من إخفاء القسم.

## فحص المحتوى بعد البناء
```bash
pnpm build
pnpm verify:content
```
يتحقق `scripts/verify-content.mjs` من وجود الأقسام الجديدة، ونجاح جلب الطقس، وخلو الصفحة من أسماء المحلات، وخلو المعرض من مراجع الصور المفقودة.
