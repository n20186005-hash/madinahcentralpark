// تجميع النسخ الإنجليزية المرآة لصفحات الدليل، مفهرسة بالمُعرِّف (slug) نفسه.
// لا تُحتسب هذه النسخ ضمن الـ40 صفحة العربية، وتُستخدم لوسم hreflang والتنقل بين اللغتين.
import type { GuideTranslation } from '../../../lib/parkGuide';
import { basicsEn } from './basics.en';
import { facilitiesEn } from './facilities.en';
import { cultureEn } from './culture.en';
import { diningEn } from './dining.en';
import { itinerariesEn } from './itineraries.en';
import { logisticsEn } from './logistics.en';

export const EN: Record<string, GuideTranslation> = {
  ...basicsEn,
  ...facilitiesEn,
  ...cultureEn,
  ...diningEn,
  ...itinerariesEn,
  ...logisticsEn
};

export function guideEn(slug: string): GuideTranslation | undefined {
  return EN[slug];
}
