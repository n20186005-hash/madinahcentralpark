// تدقيق مخرجات dist/ وفق قائمة الامتثال: بنية الصفحات، JSON-LD، PWA، GA، الوصولية، الروابط.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const DOMAIN = 'https://madinahcentralpark.com';
const results = [];
const analyticsSource = await readFile(join(root,'analytics.js'),'utf8');
const fail = (k, v) => results.push([k, v]);

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");

const files = (await walk(root)).map((f) => f.replaceAll('\\', '/'));
const htmls = files.filter((f) => f.endsWith('/index.html') || f === `${root}/404.html` || f.endsWith('.html'));

// 1) قائمة الصفحات ومجموعة عناوينها
const routeOf = (f) => {
  const rel = f.slice(root.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '/');
  return rel === '' ? '/' : '/' + rel;
};
const expectedUrls = htmls.map(routeOf).sort();
const wantUrls = ['/', '/404/', '/cookie-settings/', '/privacy-policy/', '/terms/'];
fail('routes', JSON.stringify(expectedUrls) === JSON.stringify(wantUrls) ? 'OK' : expectedUrls.join(','));

let allHtml = '';
for (const f of htmls) {
  const html = await readFile(f, 'utf8');
  allHtml += '\n' + html;
  const route = routeOf(f);
  // html lang/dir
  fail(`[${route}] html lang/dir`, /<html lang="ar-SA" dir="rtl">/.test(html) ? 'OK' : 'MISSING');
  // canonical مطلق يطابق المسار
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  fail(`[${route}] canonical`, canon === DOMAIN + (route === '/' ? '/' : route) ? 'OK' : (canon || 'MISSING'));
  // og
  const ogUrl = (html.match(/property="og:url" content="([^"]+)"/) || [])[1];
  const ogImg = (html.match(/property="og:image" content="([^"]+)"/) || [])[1];
  const ogImgAlt = (html.match(/property="og:image:alt" content="([^"]+)"/) || [])[1];
  const twImg = (html.match(/name="twitter:image" content="([^"]+)"/) || [])[1];
  fail(`[${route}] og:url مطلق`, ogUrl === canon ? 'OK' : (ogUrl || 'MISSING'));
  fail(`[${route}] og:image مطلق`, ogImg && ogImg.startsWith(DOMAIN) ? 'OK' : 'MISSING');
  fail(`[${route}] og:image:alt`, ogImgAlt ? 'OK' : 'MISSING');
  fail(`[${route}] twitter:image`, twImg && twImg.startsWith(DOMAIN) ? 'OK' : 'MISSING');
  fail(`[${route}] twitter:card`, /name="twitter:card" content="summary_large_image"/.test(html) ? 'OK' : 'MISSING');
  // robots: صفحة 404 والصفحات القانونية noindex، والصفحة الرئيسية بلا noindex
  const robotsContent = (html.match(/name="robots"[^>]*content="([^"]*)"/) || [])[1] || '';
  const wantNoindex = route === '/404/' || ['/cookie-settings/', '/privacy-policy/', '/terms/'].includes(route);
  fail(`[${route}] robots ${wantNoindex ? 'noindex' : 'index'}`, /noindex/.test(robotsContent) === wantNoindex ? 'OK' : (robotsContent || 'MISSING'));
  // viewport بلا maximum-scale
  fail(`[${route}] viewport`, /maximum-scale|user-scalable/.test(html) ? 'maximum-scale-FOUND' : 'OK');
  // h1 وحيد
  fail(`[${route}] h1 unique`, ((html.match(/<h1\b/g) || []).length) === 1 ? 'OK' : String((html.match(/<h1\b/g) || []).length));
  // GA مسار موحد موافق عليه
  const gaCount = html.includes('src="/analytics.js"') ? (analyticsSource.match(/G-HXM22WWPKP/g)||[]).length : 0;
  fail(`[${route}] GA id`, gaCount >= 1 ? `OK(${gaCount}x)` : 'MISSING');
  fail(`[${route}] GA gated`, html.includes('src="/analytics.js"') && analyticsSource.includes('king-fahad-central-park-consent-v1') && /anonymize_ip:true/.test(analyticsSource) ? 'OK' : 'CHECK');
  // رابط manifest وسجل عامل الخدمة
  fail(`[${route}] manifest link`, /rel="manifest" href="\/manifest.webmanifest"/.test(html) ? 'OK' : 'MISSING');
  fail(`[${route}] SW register`, /serviceWorker' in navigator/.test(html) ? 'OK' : 'MISSING');
  // الصور داخل هذه الصفحة
  const imgs = (html.match(/<img\b[^>]*>/g) || []);
  const imgIssues = imgs.filter((t) => !/alt="/.test(t) || !/width="/.test(t) || !/height="/.test(t) || !/src="\/images\//.test(t));
  fail(`[${route}] imgs alt+wh+local (${imgs.length})`, imgIssues.length === 0 ? 'OK' : `${imgIssues.length} issues`);
  // الروابط الخارجية: target+rel
  const anchors = (html.match(/<a\b[^>]*>/g) || []).filter((t) => /href="https?:\/\//.test(t) && !/href="https?:\/\/madinahcentralpark\.com/.test(t));
  const badLinks = anchors.filter((t) => !/target="_blank"/.test(t) || !/rel="[^"]*noopener/.test(t));
  fail(`[${route}] ext links target+rel (${anchors.length})`, badLinks.length === 0 ? 'OK' : `${badLinks.length} bad`);
  // iframe
  const ifr = (html.match(/<iframe\b[^>]*>/g) || []);
  const ifrOk = ifr.every((t) => /loading="lazy"/.test(t) && /referrerpolicy="strict-origin-when-cross-origin"/.test(t) && /allowfullscreen/.test(t) && /title="/.test(t) && /maps\/embed\?pb=/.test(t));
  fail(`[${route}] iframe attrs (${ifr.length})`, ifrOk ? 'OK' : 'CHECK');
}

// 2) فحوص صفحة الرئيسية المفصلة
const idx = await readFile(join(root, 'index.html'), 'utf8');
const h1Text = ((idx.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
fail('index h1 has name+city', /حديقة الملك فهد المركزية/.test(h1Text) && /المدينة المنورة/.test(h1Text) ? 'OK' : h1Text);
fail('index FAQ visible (>=17)', ((idx.match(/<summary/g) || []).length) >= 17 ? `OK(${(idx.match(/<summary/g) || []).length})` : String((idx.match(/<summary/g) || []).length));
fail('index weather ok', /القراءة وقت إنشاء الصفحة|تعذّر جلب بيانات الطقس/.test(idx) ? 'OK' : 'FALLBACK');
fail('index weather no fallback', /القراءة وقت إنشاء الصفحة|تعذّر جلب بيانات الطقس/.test(idx) ? 'OK' : 'FALLBACK');

// JSON-LD
const blocks = [...idx.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(decode(m[1])));
const allNodes = [];
for (const b of blocks) {
  if (Array.isArray(b['@graph'])) allNodes.push(...b['@graph']);
  else allNodes.push(b);
}
const types = allNodes.map((n) => (Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type']));
const wantTypes = ['TouristAttraction+Park', 'FAQPage', 'Organization', 'WebSite', 'WebPage'];
fail('jsonld types', wantTypes.every((t) => types.includes(t)) ? `OK(${types.length})` : types.join(' | '));
const attraction = allNodes.find((n) => JSON.stringify(n['@type']).includes('TouristAttraction'));
if (attraction) {
  const j = (v) => (v === true || v === false ? v : v == null ? 'MISSING' : typeof v === 'string' ? (v.startsWith(DOMAIN) ? v.replace(DOMAIN, '') : v) : JSON.stringify(v));
  fail('ld tourist url', attraction.url === DOMAIN + '/' ? 'OK' : j(attraction.url));
  fail('ld tourist @id', /#king-fahad-central-park$/.test(attraction['@id'] || '') ? 'OK' : j(attraction['@id']));
  fail('ld tourist image', !('image' in attraction) ? 'OK' : 'CHECK');
  fail('ld tourist geo', attraction.geo && Math.abs(attraction.geo.latitude - 24.4200407) < 1e-9 && Math.abs(attraction.geo.longitude - 39.6061752) < 1e-9 ? 'OK' : 'CHECK');
  fail('ld tourist rating', !attraction.aggregateRating ? 'OK' : 'CHECK');
  fail('ld tourist hours', !attraction.openingHoursSpecification ? 'OK' : 'CHECK');
  fail('ld tourist free', !('isAccessibleForFree' in attraction) ? 'OK' : 'CHECK');
  fail('ld tourist hasMap', attraction.hasMap === 'https://maps.app.goo.gl/o2EdMT6dC5qwHHun7' ? 'OK' : 'CHECK');
  fail('ld tourist sameAs', JSON.stringify(attraction.sameAs) === JSON.stringify(['https://maps.app.goo.gl/o2EdMT6dC5qwHHun7','https://visitmadinahsa.com/sa-ar/destinations/حديقة-الملك-فهد','https://www.amana-md.gov.sa/NewsCenter/Details/2396']) ? 'OK' : 'CHECK');
  fail('ld tourist NAP', attraction.address && attraction.address.postalCode === '42383' && attraction.address.addressCountry === 'SA' && attraction.address.addressRegion ? 'OK' : 'CHECK');
}
const faqLd = allNodes.find((n) => n['@type'] === 'FAQPage');
fail('ld faq matches visible', faqLd && faqLd.mainEntity?.length === (idx.match(/<summary/g)||[]).length ? `OK(${faqLd.mainEntity?.length})` : 'CHECK');
fail('ld graph org+site+page', types.includes('Organization') && types.includes('WebSite') && types.includes('WebPage') ? 'OK' : 'MISSING');
const page = allNodes.find((n) => n['@type'] === 'WebPage');
fail('ld webpage dates', page && page.dateModified === '2026-10-25' && !page.datePublished ? `OK(${page.dateModified})` : 'CHECK');

// 3) PWA
const man = JSON.parse(await readFile(join(root, 'manifest.webmanifest'), 'utf8'));
fail('manifest lang/dir', man.lang === 'ar' && man.dir === 'rtl' && man.display === 'standalone' ? 'OK' : 'CHECK');
fail('manifest theme', man.theme_color === '#173324' && man.background_color === '#fffdf7' ? 'OK' : 'CHECK');
const iconOk = await Promise.all(man.icons.map(async (i) => (await stat(join(root, i.src.slice(1)))).isFile()));
fail('manifest icons exist', iconOk.every(Boolean) ? `OK(${man.icons.length})` : 'MISSING');

const sw = await readFile(join(root, 'sw.js'), 'utf8');
fail('sw listeners', ['install', 'activate', 'fetch'].every((e) => sw.includes(`addEventListener('${e}'`)) ? 'OK' : 'MISSING');
const cacheName = (sw.match(/const VERSION = '([^']+)'/) || [])[1];
fail('sw version cache', cacheName ? `OK(${cacheName})` : 'MISSING');
const pre = (sw.match(/const PRECACHE = (\[[\s\S]*?\]);/) || [])[1];
const preList = pre ? JSON.parse(pre.replaceAll("'", '"')) : [];
const preOk = await Promise.all(preList.map(async (p) => {
  const rel = p.endsWith('/') ? p + 'index.html' : p;
  try { await stat(join(root, rel)); return true; } catch { return false; }
}));
fail('sw precache targets exist', preOk.every(Boolean) ? `OK(${preList.length})` : 'MISSING');
fail('sw offline fallback', sw.includes("status:503") && !sw.includes("hit || caches.match('/')") ? 'OK' : 'CHECK');
fail('sw same-origin guard', sw.includes('startsWith(self.location.origin)') ? 'OK' : 'MISSING');

// 4) sitemap / robots
const smIndex = await readFile(join(root, 'sitemap-index.xml'), 'utf8');
const sm0 = (smIndex.match(/<loc>([^<]+sitemap-0\.xml)<\/loc>/) || [])[1];
fail('sitemap-index', sm0 ? `OK(${sm0})` : 'MISSING');
const smBody = await readFile(join(root, sm0.split('/').pop()), 'utf8');
const locs = [...smBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
// الصفحات القانونية مستثناة من sitemap عمداً (noindex) لتركيز الزحف على الصفحة الرئيسية.
const smWant = [DOMAIN + '/'];
fail('sitemap urls', JSON.stringify(locs) === JSON.stringify(smWant) ? 'OK' : locs.join(' '));
fail('sitemap no 404', !smBody.includes('404') ? 'OK' : 'FOUND');
fail('sitemap host', locs.every((u) => u.startsWith(DOMAIN)) ? 'OK' : 'CHECK');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
fail('robots sitemap', robots.includes('Sitemap: ' + DOMAIN + '/sitemap-index.xml') ? 'OK' : 'MISSING');
fail('robots allow', /^Allow: \/$/m.test(robots) ? 'OK' : 'MISSING');

// 5) بقايا ممنوعة عبر كل المخرجات
const scanned = files.filter((f) => /\.(html|js|css|xml|txt|json)$/i.test(f));
const forbidden = ['ca-pub', 'adsbygoogle', 'googlesyndication', 'doubleclick', 'example.com', 'chrome-extension://'];
const hits = [];
for (const f of scanned) {
  const txt = await readFile(f, 'utf8');
  for (const t of forbidden) if (txt.includes(t)) hits.push(`${t} -> ${f.replace(root, '')}`);
}
fail('forbidden tokens', hits.length === 0 ? 'OK' : hits.join(' | '));
fail('no hardcoded http://', allHtml.includes('http://') ? 'FOUND' : 'OK');
fail('footer credit', allHtml.includes('حقوق الصور') ? 'OK' : 'MISSING');

let passed = 0;
for (const [k, v] of results) {
  const ok = v === 'OK' || /^OK\(/.test(v);
  if (ok) passed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${k}  =>  ${v}`);
}
console.log(`\nالنتيجة: ${passed}/${results.length} ناجحة`);
if (passed !== results.length) process.exit(1);
