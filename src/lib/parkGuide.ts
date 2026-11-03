// أنواع بيانات صفحات الدليل و«بنك الحقائق» الموثق لحديقة الملك فهد المركزية.
// القاعدة: لا يُضاف رقم أو اسم أو ساعة إلا إذا كان له مصدر قابل للمراجعة في SOURCES أدناه.
// تُفصل دائماً بين ما تنشره الجهات الرسمية وبين لقطات الأطراف الثالثة القابلة للتغير.

export type CategoryId = 'basics' | 'facilities' | 'culture' | 'dining' | 'itineraries' | 'logistics';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideFact {
  label: string;
  value: string;
}

// النسخة الإنجليزية المرآة للصفحة. لا تُحتسب ضمن الـ40 صفحة العربية، وتُستخدم لوسم hreflang.
export interface GuideTranslation {
  title: string;
  h1: string;
  subtitle: string;
  description: string;
  keywords: string[];
  lede: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  quickFacts?: GuideFact[];
}

export interface Guide {
  slug: string;
  category: CategoryId;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
  keywords: string[];
  lede: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: string[];
  quickFacts?: GuideFact[];
  updated: string;
  en?: GuideTranslation;
}

export const CATEGORIES: { id: CategoryId; label: string; labelEn: string; note: string; noteEn: string }[] = [
  { id: 'basics', label: 'أساسيات المعلم وقرار الزيارة', labelEn: 'Essentials and trip decisions', note: 'المواعيد والموقع والصور والممشى والرسوم والمواقف.', noteEn: 'Opening hours, location, photos, walkway, fees and parking.' },
  { id: 'facilities', label: 'مرافق الحديقة واحتياجات الزائر', labelEn: 'Facilities and visitor needs', note: 'البحيرة والألعاب والملاعب والدراجات والخيل والجلسات والخدمات.', noteEn: 'Lake, play areas, sports, cycling, horse riding, seating and services.' },
  { id: 'culture', label: 'الثقافة والفنون والسوق التراثي', labelEn: 'Culture, arts and the heritage market', note: 'الحي التراثي وسوق العينية ومركز المدينة للفنون وتاريخ التطوير.', noteEn: 'Heritage district, Ainiah market, Madinah Arts Center and the park history.' },
  { id: 'dining', label: 'الطعام والقهوة', labelEn: 'Food and coffee', note: 'مناطق الطعام والمقاهي داخل الحديقة ومحيطها.', noteEn: 'Dining areas and cafés inside and around the park.' },
  { id: 'itineraries', label: 'برامج نصف اليوم والمسارات المدمجة', labelEn: 'Half-day plans and combined routes', note: 'برامج عملية تجمع الحديقة مع معالم المدينة.', noteEn: 'Practical plans combining the park with Madinah landmarks.' },
  { id: 'logistics', label: 'المطار والقطار والمناسبات', labelEn: 'Airport, train and occasions', note: 'الوصول من المطار وقطار الحرمين وترتيبات رمضان والعيد.', noteEn: 'Airport access, Haramain train and Ramadan or Eid arrangements.' }
];

// أحدث لقطة متاحة لبطاقة المكان على خرائط Google، وتاريخها معلن لأنه متغير بطبيعته.
export const MAPS_SNAPSHOT = {
  rating: '4.2',
  reviews: 25692,
  date: '2 نوفمبر 2026',
  dateEn: '2 November 2026',
  dateIso: '2026-11-02'
};

export const PARK = {
  nameAr: 'حديقة الملك فهد المركزية',
  nameShort: 'حديقة الملك فهد',
  nameEn: 'King Fahad Central Park',
  alternateNames: [
    'حديقة الملك فهد',
    'King Fahad Central Park',
    'Madinah Central Park',
    'Central Park Madinah',
    'حديقة المدينة المركزية'
  ],
  district: 'حي الحديقة',
  districtEn: 'Al Hadiqah',
  city: 'المدينة المنورة',
  cityEn: 'Madinah',
  region: 'منطقة المدينة المنورة',
  regionEn: 'Al Madinah Region',
  country: 'SA',
  postalCode: '42383',
  lat: 24.4200407,
  lng: 39.6061752,
  plusCode: 'CJC4+2F',
  mapsUrl: 'https://maps.app.goo.gl/o2EdMT6dC5qwHHun7',
  areaSqm: 1600000,
  greenAreaSqm: 500000,
  valleySqm: 50000,
  distanceFromProphetMosqueKm: 5,
  distanceFromHeritageDistrictKm: 6,
  parkingLots: 8,
  parkingAreaSqm: 20000,
  lateralParkingSpaces: 20,
  walkwayAreaSqm: 10000,
  accessibleParkingSpaces: 10,
  sandFields: 2,
  sandFieldSqm: 700,
  sandPlayAreaSqm: 500,
  asphaltSqm: 6000,
  signageCount: 37,
  screenCount: 2,
  // بيانات مشروع الممشى المحيطي المنشورة في تحديث الأمانة (1 نوفمبر 2026).
  perimeterWalkwayLengthM: 1500,
  perimeterWalkwayWidthM: 12,
  perimeterWalkwayParkingSpaces: 193,
  perimeterWalkwayRestPoints: 14,
  perimeterWalkwayAccessibleRamps: 3,
  perimeterBikePathAreaSqm: 7491,
  perimeterWalkwayVisibleLights: 86,
  perimeterWalkwayHiddenLights: 749,
  // مساحة الحي التراثي كما وردت في تغطية إعلامية محلية، وهي تقديرية لا رسمية.
  heritageDistrictAreaSqm: 120000,
  // سنة إنشاء المسرح العالمي كما وردت في مرجع نصف رسمي.
  worldTheatreBuildYear: 2017
};

export interface SourceLink {
  label: string;
  url: string;
  note: string;
  official: boolean;
}

export const SOURCES: SourceLink[] = [
  {
    label: 'أمانة منطقة المدينة المنورة — وصف الحديقة ومرافقها (9 سبتمبر 2024)',
    url: 'https://www.amana-md.gov.sa/NewsCenter/Details/2396',
    note: 'وصف مؤرخ للتطوير والمرافق والمواقف؛ لا يُعد ضماناً لتشغيل كل خدمة اليوم.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — حزمة المشاريع البلدية (19 يونيو 2023)',
    url: 'https://www.amana-md.gov.sa/NewsCenter/Details/1064',
    note: 'يذكر مشروع تطوير حديقة الملك فهد بمساحة 1.6 مليون م² وعناصره المخططة.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — مشروع العاقول مع الإشارة إلى تطوير الحديقة',
    url: 'https://www.amana-md.gov.sa/MDWebsite/NewsCenter/Details/2536',
    note: 'يؤكد استمرار العمل على مشروع الحديقة بمساحة 1.6 مليون م².',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — صفحة المعلم (وسم «بدون تذاكر» و«مناسب لذوي الإعاقة»)',
    url: 'https://www.amana-md.gov.sa/visitmadinah/Details/30',
    note: 'المصدر الرسمي الأقرب لحالة الدخول وسهولة الوصول، مع وصف الفترة المسائية.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — الحي التراثي وسوق العينية',
    url: 'https://www.amana-md.gov.sa/visitmadinah/Details/73',
    note: 'يوضح أن الحي التراثي داخل نطاق الحديقة، ويذكر العينية بسوق سويقة.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — احتفال عيد الفطر في الحديقة (10 أبريل 2024)',
    url: 'https://www.amana-md.gov.sa/newSite/NewsCenter/Details/1268',
    note: 'دليل على برمجة فعاليات موسمية في الحديقة، وليس جدولاً دائماً.',
    official: true
  },
  {
    label: 'منصة المدينة — وجهة حديقة الملك فهد (العربية)',
    url: 'https://visitmadinahsa.com/sa-ar/destinations/حديقة-الملك-فهد',
    note: 'تصف الفتح اليومي في الفترة المسائية من دون ساعة رقمية.',
    official: true
  },
  {
    label: 'منصة المدينة — King Fahd Park (الإنجليزية)',
    url: 'https://visitmadinahsa.com/sa-en/destinations/King-Fahd-Park',
    note: 'تذكر فتح الحديقة يومياً الساعة 4:00 مساءً، وهي أدق صياغة زمنية رسمية وجدناها.',
    official: true
  },
  {
    label: 'منصة المدينة — مركز المدينة للفنون',
    url: 'https://visitmadinahsa.com/sa-ar/destinations/مركز-المدينة-للفنون',
    note: 'يحدد أن المركز داخل حديقة الملك فهد وأن مساحته التأسيسية 8,200 م².',
    official: true
  },
  {
    label: 'البوابة الرسمية لمركز المدينة للفنون',
    url: 'https://mac.nm.sa/home',
    note: 'تذكر أوقات العمل الأسبوعية للجمهور وأنشطة المركز وبرامجه.',
    official: true
  },
  {
    label: 'نماء المنورة — مركز المدينة للفنون',
    url: 'https://www.almunawarah.sa/en/arts-culture/center-detail/center/madina-arts-center',
    note: 'تفصيل الخدمات والمجالات الفنية ونموذج الدخول.',
    official: true
  },
  {
    label: 'هيئة تطوير منطقة المدينة المنورة — افتتاح مركز المدينة للفنون',
    url: 'https://www.mda.gov.sa/News/Details/1889',
    note: 'خبر افتتاح المركز عام 2018 ومساحته ومكوّناته.',
    official: true
  },
  {
    label: 'روح السعودية — الحي التراثي',
    url: 'https://www.visitsaudi.com/en/madinah/attractions/heritage-district',
    note: 'يذكر الدخول من دون تذاكر، وساعات معلنة تختلف عن ساعات الجهة البلدية.',
    official: true
  },
  {
    label: 'روح السعودية — مسجد قباء',
    url: 'https://www.visitsaudi.com/en/madinah/attractions/masjid-quba-in-madinah',
    note: 'يذكر المسافة عن المسجد النبوي وممشى بطول ثلاثة كيلومترات والفتح الدائم.',
    official: true
  },
  {
    label: 'روح السعودية — مسجد القبلتين',
    url: 'https://www.visitsaudi.com/ar/madinah/attractions/masjid-al-qiblatain-in-madinah',
    note: 'يحدد الموقع والمسافة والمساحة الكلية والفتح الدائم.',
    official: true
  },
  {
    label: 'روح السعودية — جبل أحد',
    url: 'https://www.visitsaudi.com/en/madinah/attractions/uhud-mountain-in-madinah',
    note: 'يذكر المسافة والارتفاع والدخول المجاني.',
    official: true
  },
  {
    label: 'روح السعودية — متحف سكة حديد الحجاز',
    url: 'https://www.visitsaudi.com/en/madinah/attractions/hijaz-railway-museum-in-madinah',
    note: 'يذكر الموقع والمسافة والدخول المجاني، مع إشارة إلى حالة إغلاق مؤقت.',
    official: true
  },
  {
    label: 'وزارة الحج والعمرة — تصريح زيارة الروضة الشريفة',
    url: 'https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women',
    note: 'التصريح إلكتروني ومجاني ويُصدر عبر منصة نسك.',
    official: true
  },
  {
    label: 'وزارة الحج والعمرة — المعالم التي تُزار في المدينة المنورة',
    url: 'https://haj.gov.sa/ar/Al-Madinah-Al-Munawwarah/Sites-to-Visit-in-Madinah',
    note: 'مرجع رسمي للمسافات ومواعيد زيارة البقيع ومقبرة الشهداء.',
    official: true
  },
  {
    label: 'نماء المنورة — متحف دار المدينة',
    url: 'https://www.almunawarah.sa/arts-culture/museums-detail/museum/dar-al-madinah-museum',
    note: 'يذكر التذاكر وأوقات الزيارة والمحتوى؛ وتختلف تفاصيل الموقع الرسمي للمتحف.',
    official: true
  },
  {
    label: 'مجمع الملك فهد لطباعة المصحف الشريف — الزيارات',
    url: 'https://qurancomplex.gov.sa/14480426-2/',
    note: 'يذكر استقبال الزوار أسبوعياً في فترتين.',
    official: true
  },
  {
    label: 'مطارات طيبة — أجرة التاكسي من المطار وإليه',
    url: 'https://tibahairports.com/ar-SA/to-from-the-airport-ar/page/taxi-ar',
    note: 'قائمة أسعار رسمية بحسب المنطقة، مع تحذير من النقل غير المرخص.',
    official: true
  },
  {
    label: 'مطارات طيبة — الوصول من المطار وإليه',
    url: 'https://tibahairports.com/en-EN/to-from-the-airport/page/bus',
    note: 'يذكر الوصول إلى وسط المدينة في نحو 30 دقيقة.',
    official: true
  },
  {
    label: 'قطار الحرمين السريع — محطة المدينة المنورة',
    url: 'https://sar.hhr.sa/-/madinah',
    note: 'يذكر موقع المحطة وسعة المواقف وساعات التشغيل اليومية.',
    official: true
  },
  {
    label: 'قطار الحرمين السريع — الجدول والمحطات',
    url: 'https://sar.hhr.sa/timetable',
    note: 'يحدد المحطات المخدومة على الشبكة.',
    official: true
  },
  {
    label: 'هيئة تطوير منطقة المدينة المنورة — خطوط النقل في رمضان',
    url: 'https://www.mda.gov.sa/news/details/3254',
    note: 'خطوط مباشرة إلى المسجد النبوي بينها نقطة في الحديقة، وتشغيل حتى ساعة بعد التراويح.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — مشروع ممشى حديقة الملك فهد (1 نوفمبر 2026)',
    url: 'https://www.amana-md.gov.sa/NewsCenter/Details/2635',
    note: 'أحدث تحديث رسمي وقفنا عليه لممشى محيطي بطول 1500 م وعرض 12 م، ومقارنته بممشى القصواء.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — قائمة مرافق الحديقة التفصيلية (9 سبتمبر 2024)',
    url: 'https://services.amana-md.gov.sa/services/NewsCenter/Details/2396',
    note: 'يعدد سوق العينية والحي التراثي والبحيرة ومنطقة ركوب الخيل ومنطقة المطاعم وبيانات المواقف والممشى.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — احتفال عيد الفطر داخل الحديقة (10 أبريل 2024)',
    url: 'https://www.amana-md.gov.sa/NewsCenter/Details/1033',
    note: 'يذكر أن الفعالية أقيمت داخل الحديقة وتضمنت منطقة أطفال وأكشاك حرف ويدوية ومنطقة طعام.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — مركز المدينة للفنون (صفحة المعلم)',
    url: 'https://www.amana-md.gov.sa/visitmadinah/Details/22',
    note: 'يذكر انطلاق المركز عام 2018م والدخول من دون تذاكر، ويخالف ذلك ساعات البوابة الرسمية للمركز.',
    official: true
  },
  {
    label: 'أمانة منطقة المدينة المنورة — مسجد القبلتين (صفحة المعلم)',
    url: 'https://www.amana-md.gov.sa/visitmadinah/Details/23',
    note: 'يحدد مساحة المسجد 3,920 م² وقبته ومئذنتيه وسعته واستقباله للزوار على مدار الساعة.',
    official: true
  },
  {
    label: 'هيئة تطوير منطقة المدينة المنورة — مراكز النقل في رمضان',
    url: 'https://www.mda.gov.sa/news/details/3262',
    note: 'يحدد ثلاثة مراكز رئيسية للنقل إلى المسجد النبوي، ومنها «الحديقة».',
    official: true
  },
  {
    label: 'هيئة تطوير منطقة المدينة المنورة — حصيلة النقل في رمضان',
    url: 'https://www.mda.gov.sa/news/details/3263',
    note: 'يذكر تشغيل أكثر من 13,000 رحلة نقل خلال الموسم، وهو مؤشر على حجم الحركة لا على مواعيد ثابتة.',
    official: true
  },
  {
    label: 'هيئة تطوير منطقة المدينة المنورة — موسم شتاء المدينة',
    url: 'https://www.mda.gov.sa/news/details/3239',
    note: 'يذكر موسم فعاليات شتوي في المدينة المنورة، والبرامج تتبدل سنوياً.',
    official: true
  },
  {
    label: 'قطار الحرمين السريع — محطة المدينة المنورة (الموقع الرسمي لمشغل السكك)',
    url: 'https://www.hhr.sa/ar/-/madinah',
    note: 'يحدد أن المحطة في حي الهدراء على طريق الملك عبد العزيز، وتبعد نحو 9 كم عن المسجد النبوي، وتعمل يومياً.',
    official: true
  },
  {
    label: 'قطار الحرمين السريع — مواقف محطة المدينة المنورة',
    url: 'https://asc.hhr.sa/ar/services/parking',
    note: 'يذكر مواقف المحطة بسعة 1000 سيارة وفق بيانات المشغل.',
    official: true
  },
  {
    label: 'مجمع الملك فهد لطباعة المصحف الشريف — بيانات التواصل والزيارة',
    url: 'https://qurancomplex.gov.sa/contact/',
    note: 'يحدد فترتي استقبال الزوار وحاجة الزيارة إلى تنسيق مسبق للأفواج واصطحاب الهوية.',
    official: true
  },
  {
    label: 'مجمع الملك فهد لطباعة المصحف الشريف — بوابة الزيارة',
    url: 'https://visit.qurancomplex.gov.sa/',
    note: 'بوابة تنسيق الزيارات، وتشير إلى أن الحجز موجّه للأفواج والوفود.',
    official: true
  },
  {
    label: 'منصة حجز مركز المدينة للفنون',
    url: 'https://mac.mahjoz.net/ar',
    note: 'منصة تذاكر خارجية تعرض فترة مسائية تبدأ عند الخامسة عصراً، وتخالف ساعات البوابة الرسمية للمركز.',
    official: false
  },
  {
    label: 'روح السعودية — الحي التراثي في المدينة المنورة (محدّث 2025)',
    url: 'https://www.visitsaudi.com/ar/madinah/attractions/heritage-district',
    note: 'يذكر الدخول من دون تذاكر وساعات مسائية تختلف عن الصياغة البلدية؛ التعارض مذكور صراحة.',
    official: true
  },
  {
    label: 'أوبر — المدينة المنورة',
    url: 'https://www.uber.com/sa/en/r/cities/taxi/al-madinah-al-madinah-al-monawarah-sa/',
    note: 'تأكيد توفّر الخدمة في المدينة على مدار الساعة.',
    official: true
  },
  {
    label: 'كريم — خدمات النقل في السعودية',
    url: 'https://www.careem.com/en-AE/ksa-rides/',
    note: 'تغطية معلنة لمدن سعودية عديدة؛ لا تنص على المدينة بالاسم.',
    official: true
  },
  {
    label: 'المركز الوطني للأرصاد — منطقة المدينة المنورة',
    url: 'https://www.ncm.gov.sa/en/region/madinah',
    note: 'المرجع الرسمي لبيانات الطقس والمناخ في المنطقة.',
    official: true
  },
  {
    label: 'سعوديبيديا — حديقة الملك فهد المركزية',
    url: 'https://saudipedia.com/article/13497/مجتمع/ترفيه/حديقة-الملك-فهد-المركزية-بالمدينة-المنورة',
    note: 'موسوعة سعودية تستند إلى مصادر بلدية ووكالة الأنباء السعودية، وتضيف مساحة الزراعة والمكوّنات.',
    official: false
  },
  {
    label: 'روح السعودية — مهرجان رحابة في المدينة المنورة',
    url: 'https://www.visitsaudi.com/en/madinah/events/rahaba-festival',
    note: 'فعالية رمضانية في الحي التراثي بمواعيد معلنة لموسم محدد، وليست برنامجاً دائماً.',
    official: true
  },
  {
    label: 'خرائط Google — بطاقة مكان الحديقة',
    url: 'https://maps.app.goo.gl/o2EdMT6dC5qwHHun7',
    note: 'لقطة طرف ثالث قابلة للتغير للتقييم والساعات؛ لا تُقدَّم كتعهد من مشغل الحديقة.',
    official: false
  }
];

export const SOURCE_BY_URL: Record<string, SourceLink> = Object.fromEntries(SOURCES.map((s) => [s.url, s]));
