// فحص محتوى الصفحة المبنية: وجود الأقسام الجديدة، نجاح جلب الطقس، غياب الأسماء التجارية وروابط الصور المفقودة.
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const count = (s) => html.split(s).length - 1;

const report = {
  // أقسام الصفحة الجديدة
  'id weather': count('id="الطقس"') > 0,
  'id facilities': count('id="المرافق")') > 0 || count('id="المرافق"') > 0,
  'id history': count('id="التاريخ"') > 0,
  'id experience': count('id="التجربة"') > 0,
  // الطقس: نجح الجلب (لا يوجد نص العطل)
  'weather fetch ok (no fallback)': count('تعذّر جلب بيانات الطقس') === 0,
  'weather current visible': count('حالة الطقس الآن') > 0,
  'weather source noted': count('Open-Meteo') > 0,
  // صور الحديقة الحقيقية المحلية
  'img hero': count('king-fahd-central-park-hero.jpg') > 0,
  'img fountain': count('king-fahd-central-park-fountain.jpg') > 0,
  'img playground': count('king-fahd-central-park-playground.jpg') > 0,
  'img walkway': count('king-fahd-central-park-walkway.jpg') > 0,
  'img entrance': count('king-fahd-central-park-entrance.jpg') > 0,
  'img evening': count('king-fahd-central-park-evening.jpg') > 0,
  'no dead gallery refs': count('greenery.jpg') === 0 && count('lake.jpg') === 0,
  // الحياد التجاري: لا أسماء محلات
  'no merchant names': ['فيردان', 'شيف إياد', 'قصر الريحان', 'زمان ستي'].every((n) => !html.includes(n)),
  // الأسئلة الشائعة
  'faq count': count('<summary'),
  // التنقل
  'nav has facilities': count('href="/#المرافق"') > 0,
  'nav has weather': count('href="/#الطقس"') > 0
};

const failed = Object.entries(report).filter(([, ok]) => ok === false);
console.log(JSON.stringify(report, null, 2));
if (failed.length) {
  console.error(`\nفشل فحص المحتوى في: ${failed.map(([k]) => k).join('، ')}`);
  process.exit(1);
}
console.log('\nنجح فحص المحتوى.');
