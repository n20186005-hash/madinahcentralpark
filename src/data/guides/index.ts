// تجميع صفحات الدليل الست في مصدر واحد، مع أدوات بحث سريعة تُستخدم في التوجيه والقوائم.
// تُدمج هنا النسخ الإنجليزية المرآة من ./en بحيث يحمل كل دليل نسخته الإنجليزية داخل الحقل en.
import type { CategoryId, Guide } from '../../lib/parkGuide';
import { CATEGORIES } from '../../lib/parkGuide';
import { basicsGuides } from './basics';
import { facilitiesGuides } from './facilities';
import { cultureGuides } from './culture';
import { diningGuides } from './dining';
import { itineraryGuides } from './itineraries';
import { logisticsGuides } from './logistics';
import { EN } from './en';

const baseGuides: Guide[] = [
  ...basicsGuides,
  ...facilitiesGuides,
  ...cultureGuides,
  ...diningGuides,
  ...itineraryGuides,
  ...logisticsGuides
];

export const allGuides: Guide[] = baseGuides.map((guide) => (EN[guide.slug] ? { ...guide, en: EN[guide.slug] } : guide));

export const GUIDE_BASE = '/guides';
export const GUIDE_BASE_EN = '/en/guides';

export function guidePath(slug: string): string {
  return `${GUIDE_BASE}/${slug}/`;
}

export function guidePathEn(slug: string): string {
  return `${GUIDE_BASE_EN}/${slug}/`;
}

export function guidePathFor(slug: string, lang: 'ar' | 'en' = 'ar'): string {
  return lang === 'en' ? guidePathEn(slug) : guidePath(slug);
}

// الصفحات التي تمتلك نسخة إنجليزية مرآة، وتُستخدم لبناء مسارات /en/ ولوسم hreflang.
export const englishGuides: Guide[] = allGuides.filter((guide) => Boolean(guide.en));

export function localizeGuide(guide: Guide, lang: 'ar' | 'en' = 'ar'): Guide {
  if (lang === 'en' && guide.en) return { ...guide, ...guide.en };
  return guide;
}

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((guide) => guide.slug === slug);
}

export function guidesByCategory(category: CategoryId): Guide[] {
  return allGuides.filter((guide) => guide.category === category);
}

export const CATEGORY_WITH_GUIDES = CATEGORIES.map((category) => ({
  ...category,
  guides: guidesByCategory(category.id)
}));

export function relatedGuides(guide: Guide, limit = 5): Guide[] {
  const picked = guide.related
    .map((slug) => getGuide(slug))
    .filter((item): item is Guide => Boolean(item) && item !== undefined && item.slug !== guide.slug);
  return picked.slice(0, limit);
}

export { CATEGORIES };
