/** Company-level content: branches, contact details, home sections and the FAQ. */

/**
 * Branches.
 *
 * The design carries two levels of address detail — a short one on the home and about
 * cards, a full postal one on the contact page — and two orderings: the home, about and
 * footer lists lead with Jeddah, while the contact and checkout screens lead with Riyadh.
 * Both are expressed here rather than one being invented from the other.
 */
export const branches = [
  {
    id: 'jeddah',
    city: 'جدة',
    shortName: 'فرع جدة (الرئيسي)',
    contactName: 'جدة',
    shortAddress: 'طريق المدينة المنورة، حي البوادي',
    checkoutAddress: 'طريق الملك عبدالعزيز، الشاطئ',
    address: ['طريق المدينة المنورة، حي الرويس،', 'جدة 23211، المملكة العربية السعودية'],
    hours: 'السبت - الخميس: 9:00 ص - 10:00 م',
    map: 'jeddah',
  },
  {
    id: 'riyadh',
    city: 'الرياض',
    shortName: 'فرع الرياض',
    contactName: 'الرياض - الفرع الرئيسي',
    shortAddress: 'طريق خريص، حي النسيم',
    checkoutAddress: 'طريق الملك فهد، العليا',
    address: ['طريق الملك فهد، حي العقيق،', 'الرياض 12211، المملكة العربية السعودية'],
    hours: 'السبت - الخميس: 9:00 ص - 10:00 م',
    map: 'riyadh',
  },
  {
    id: 'dammam',
    city: 'الدمام',
    shortName: 'فرع الدمام',
    contactName: 'الدمام',
    shortAddress: 'طريق الملك فهد، حي الفيصلية',
    checkoutAddress: 'طريق الخليج، الشاطئ الشرقي',
    address: ['طريق الملك عبدالعزيز، حي الشاطئ،', 'الدمام 32411، المملكة العربية السعودية'],
    hours: 'السبت - الخميس: 9:00 ص - 10:00 م',
    map: 'dammam',
  },
];

/** Riyadh-first ordering, used by the contact page and the checkout branch tiles. */
export const branchesRiyadhFirst = [branches[1], branches[0], branches[2]];

export const contactInfo = {
  phone: '920032820',
  email: 'info@tirhal.sa',
  whatsapp: 'https://wa.me/966920032820',
  socials: [
    // { id: 'x', label: 'إكس', icon: 'x', href: 'https://x.com/tirhalauto' },
    { id: 'whatsapp', label: 'واتساب', icon: 'whatsapp', href: 'https://wa.me/966920032820' },
    // { id: 'tiktok', label: 'تيك توك', icon: 'tiktok', href: 'https://wa.me/966920032820' },
    { id: 'instagram', label: 'إنستغرام', icon: 'instagram', href: 'https://instagram.com/tirhalauto' },
    // { id: 'snapchat', label: 'سناب شات', icon: 'snapchat', href: 'https://snapchat.com/add/tirhalauto' },
    { id: 'facebook', label: 'فيسبوك', icon: 'facebook', href: 'https://facebook.com/tirhalauto' },
  ],
};

/** Hero search tabs and the three figures beside the search panel. */
export const heroTabs = [
  { id: 'all', label: 'الكل' },
  { id: 'sedan', label: 'سيدان' },
  { id: 'suv', label: 'SUV' },
  { id: 'coupe', label: 'كوبيه' },
  { id: 'van', label: 'فان' },
];

export const heroStats = [
  { id: 'branches', value: '3', label: 'فروع رئيسية', accent: false },
  { id: 'brands', value: '+15', label: 'علامة تجارية', accent: false },
  { id: 'finance', value: '0%', label: 'تمويل ميسر', accent: true },
];

/** "ليش ترحال؟" — three callouts on each side of the top-down car. */
export const whyPoints = {
  start: [
    { id: 'curated', title: 'خيارات منتقاة', body: 'أفضل السيارات التي تلبي كافة احتياجاتك.' },
    { id: 'plates', title: 'ترخيص و لوحات في نفس اليوم', body: 'تسلّم سيارتك مرخصة وجاهزة للطريق.' },
    { id: 'delivery', title: 'توصيل للمنزل', body: 'نوصل سيارتك لباب بيتك.' },
  ],
  end: [
    { id: 'branches', title: '3 فروع رئيسية', body: 'شبكة تغطي أهم المدن لخدمتك.' },
    { id: 'pricing', title: 'أسعار تنافسية', body: '' },
    { id: 'handover', title: 'تسليم فوري', body: 'إجراءات سريعة لتسلّم سيارتك.' },
  ],
};

/** Financing section on the home page. */
export const financingHighlights = [
  { id: 'downpayment', value: '0%', title: 'دفعة أولى', body: 'على سيارات مختارة', tone: 'dark' },
  { id: 'term', value: '60', title: 'شهراً للتقسيط', body: 'مرونة عالية في السداد', tone: 'blue' },
];

export const financingPartners = [
  { id: 'bank-a', name: 'BANK A' },
  { id: 'bank-b', name: 'BANK B' },
  { id: 'bank-c', name: 'BANK C' },
];

/** About page. */
export const aboutStory = {
  eyebrow: 'فلسفتنا',
  titleLead: 'قرار تشتري به سيارة،',
  titleRest: 'مش',
  titleAccent: 'مغامرة.',
  paragraphs: [
    'كل قرار عندنا مبني على سؤال واحد: هل هذا يخدم العميل فعلياً؟',
    'ما نحّاج الخيارات عشان نبهرك، نختار القليل اللي يستاهل وقتك.',
    'وما نغلّف التفاصيل بعروض لامعة: الرقم الحقيقي، الحالة الحقيقية، والقرار الأخير إلك دائماً.',
  ],
};

export const faq = [
  {
    id: 'journey',
    question: 'كيف تبدأ رحلة الشراء مع ترحال؟',
    answer:
      'تبدأ الرحلة بزيارة معرضنا الرقمي أو أحد فروعنا، حيث يساعدك مستشارونا في اختيار السيارة التي تناسب طموحاتك، بدءاً من تجربة القيادة و حتى استلام المفاتيح.',
  },
  {
    id: 'selection',
    question: 'ما هي معايير اختيار السيارات في مجموعتنا؟',
    answer:
      'نختار كل سيارة بناءً على ثلاثة معايير: موثوقية الصانع، توفّر قطع الغيار والصيانة في المملكة، وقيمة إعادة البيع بعد ثلاث سنوات.',
  },
  {
    id: 'financing',
    question: 'هل تتوفر خيارات تمويل مرنة؟',
    answer:
      'نعم. نتعاون مع جهات تمويل معتمدة، وتصلك أكثر من عرض لتقارن بين الدفعة الأولى ومدة السداد والقسط الشهري قبل أن تلتزم بأي منها.',
  },
  {
    id: 'quality',
    question: 'كيف نضمن جودة وحالة كل سيارة؟',
    answer:
      'كل سيارة تمر بفحص شامل قبل العرض، ويصلك تقرير الفحص مع السيارة، بالإضافة إلى ضمان الوكيل وإمكانية الاستلام من أي من فروعنا الثلاثة.',
  },
];

/** Contact page subject options. */
export const contactSubjects = [
  { id: 'general', label: 'استفسار عام' },
  { id: 'sales', label: 'استفسار عن سيارة' },
  { id: 'financing', label: 'التمويل والأقساط' },
  { id: 'fleet', label: 'حلول الشركات والأساطيل' },
];

/** Checkout page options. */
export const contactTimes = [
  { id: 'morning', label: 'صباحاً (9ص - 12م)' },
  { id: 'afternoon', label: 'ظهراً (12م - 4م)' },
  { id: 'evening', label: 'مساءً (4م - 9م)' },
];

export const customerTypes = [
  { id: 'individual', label: 'افراد' },
  { id: 'business', label: 'شركات' },
];

export const paymentMethods = [
  { id: 'financing', label: 'تمويل', icon: 'building' },
  { id: 'cash', label: 'دفع نقدي', icon: 'mail' },
];
