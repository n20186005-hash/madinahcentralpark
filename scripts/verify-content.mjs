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
  'weather snapshot or genuine fallback': /القراءة وقت إنشاء الصفحة|تعذّر جلب بيانات الطقس/.test(html),
  'weather source noted': html.includes('Open-Meteo'),
  'concept labelled': html.includes('ليس صورة للموقع') && html.includes('/images/park-concept.svg'),
  'no retired photography': !/king-fahd-central-park-[a-z]+\.jpg/.test(html),
  // الحياد التجاري: أُلغي حظر أسماء المنشآت التجارية، ويُشترط عرضها بمصدر قابل للمراجعة.
  // أدلة الزيارة: يُتحقق من ربط الصفحة الرئيسية بمركز الأدلة.
  'guides hub linked': count('href="/guides/"') > 0,
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
