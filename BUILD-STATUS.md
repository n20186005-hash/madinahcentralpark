# حالة البناء والأصول

## فحوص المصدر المكتملة
- `package.json` يستخدم أرقام إصدارات دقيقة فقط.
- `packageManager` مثبت على `pnpm@11.25.0`.
- Node مثبت على `24.20.0` في `engines` و`.node-version`.
- يوجد `pnpm-workspace.yaml` يسمح ببناء esbuild (`allowBuilds`)، لأن pnpm 11 لم يعد يقرأ حقل `pnpm` في `package.json` ولا مفتاح `onlyBuiltDependencies` القديم.
- تكامل sitemap مشروط بوجود Astro `site` الحقيقي، ولا توجد قائمة URL مكتوبة يدوياً.
- canonical وOpen Graph وJSON-LD URLs مشتقة من `Astro.site` فقط، وتُحذف عند عدم وجود النطاق.
- لا توجد صور hotlink في صفحات الموقع؛ كل عناصر `<img>` تشير إلى `/images/...` محلياً.
- GA4 لا يبدأ قبل موافقة المستخدم على التحليلات.
- صفحات الخصوصية وشروط الخدمة وإعدادات ملفات تعريف الارتباط صفحات مستقلة وليست نوافذ منبثقة.
- واجهة المستخدم كلها عربية و`lang="ar-SA"` و`dir="rtl"`.
- الخريطة مضبوطة على العربية والسعودية.

## التثبيت والبناء (2026-09-04)
أُصلح سبب فشل بناء المنصة السحابية: `pnpm install --frozen-lockfile` كان يتوقف مع `ERR_PNPM_IGNORED_BUILDS` بسبب عدم السماح ببرنامج esbuild. الحل: ملف `pnpm-workspace.yaml` بمفتاح `allowBuilds: esbuild` (pnpm 11). أُصلح أيضاً خطأ في `scripts/verify-dist.mjs` كان يمرر كائن `URL` إلى `path.join`.

نتائج محلية على هذا الجهاز:
- `pnpm install --frozen-lockfile`: نجح، وشغّل postinstall الخاص بـ esbuild من دون تحذير `ERR_PNPM_IGNORED_BUILDS`.
- `pnpm check`: 0 خطأ، 0 تحذير (hint واحد سابق في BaseLayout حول `is:inline` لا يؤثر).
- `pnpm build`: نجح، أنتج 5 صفحات، واجتاز `scripts/verify-dist.mjs` ثم `scripts/verify-content.mjs`.

ملاحظة: تحذير المحرك المحلي (Node v24.14.0 بدل 24.20.0) تحذير زخرفي فقط؛ بيئة المنصة تستخدم 24.20.0.

## حالة الصور الحقيقية
توجد ستة ملفات JPG حقيقية داخل `public/images/` (`hero/evening/fountain/entrance/playground/walkway`)، ويُستخدم أحدها في الواجهة الرئيسية وتُستخدم الستة جميعها في معرض الصور. لا توجد مراجع صور ميتة (`greenery.jpg`/`lake.jpg`) بعد الآن، ولا يُستخدم hotlink خفي؛ تحتفظ كل بطاقة بطبقة احتياطية محلية لو تعذر تحميل الملف.

## محتوى الصفحة
- أقسام جديدة: «المرافق والخدمات» (أنواع فقط)، «حالة الطقس» (Open-Meteo من الخادم عند البناء)، «خلفية المكان وتطوره» بمواد موثقة، و«تجربة زيارة مقترحة».
- الأسئلة الشائعة 13 سؤالاً، والمصادر المرجعية 4 بطاقات إضافة إلى بيانات الطقس.
- قوائم الطعام تُعرض كنوع فقط من دون أسماء محلات التزاماً بالحياد التجاري.

## تدقيق الامتثال (2026-09-04) — النطاق الرسمي وPWA
- النطاق الرسمي `madinahcentralpark.com` أصبح القيمة الافتراضية في `astro.config.mjs`؛ sitemap مفعّل دائماً.
- PWA: `manifest.webmanifest` + `sw.js` + أيقونات 192/512 (مولّدة من شعار الموقع) + تسجيل عامل الخدمة في كل الصفحات.
- أُصلح خطأ فادح في `scripts/verify-dist.mjs`: حظر `localhost` كان يطابق سطر استثناء التسجيل `startsWith('localhost')` فيُفشل البناء على كل الصفحات؛ أصبح الحظر على عناوين localhost المكتوبة فعلاً (`http(s)://localhost` و`localhost:` و`127.0.0.1`).
- H1 في الرئيسية يضم الاسم الكامل مع المدينة؛ JSON-LD أُضيفت له كتلة `@graph` (Organization/WebSite/WebPage مع dateModified 2026-09-04)؛ و`og:image:alt` و`twitter:image` أُضيفا للرأس العام.
- أداة تدقيق المخرجات الجديدة: `node scripts/audit-dist.mjs` (بنية الصفحات/TDK/JSON-LD/PWA/sitemap/GA/الروابط)، وقد مرّت 100% بعد الإصلاحات المذكورة.
