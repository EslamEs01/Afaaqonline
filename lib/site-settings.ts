export type SiteSettings = {
  academyName: string;
  slogan: string;
  siteUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  contactHours: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  homeHeroEyebrow: string;
  homeHeroTitlePrefix: string;
  homeHeroTitleHighlight: string;
  homeHeroTitleSuffix: string;
  homeHeroDescription: string;
  aboutHeroDescription: string;
  aboutHeadingPrefix: string;
  aboutHeadingHighlight: string;
  aboutBodyPrimary: string;
  aboutBodySecondary: string;
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  missionDescription: string;
  goalTitle: string;
  goalDescription: string;
  footerDescription: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
};

export const defaultSiteSettings: SiteSettings = {
  academyName: "أكاديمية آفاق",
  slogan: "نرسّخ الهوية ونبني المستقبل",
  siteUrl: "https://afaaqinstitute.com",
  email: "afaaqinstitute@gmail.com",
  phone: "+20 104 139 1631",
  whatsapp: "201041391631",
  contactHours: "يوميًا من 10 صباحًا حتى 10 مساءً بتوقيت القاهرة",
  facebookUrl: "https://www.facebook.com/profile.php?id=61592705708385",
  instagramUrl: "",
  youtubeUrl: "",
  homeHeroEyebrow: "أكاديمية عربية لكل بيت",
  homeHeroTitlePrefix: "نرسّخ",
  homeHeroTitleHighlight: "الهوية",
  homeHeroTitleSuffix: "ونبني المستقبل",
  homeHeroDescription:
    "تعليم العربية والقرآن والتربية الإسلامية بطريقة فردية تفاعلية تناسب أبناءنا في كل مكان، وتمنح الأسرة راحة وثقة في رحلة التعلّم.",
  aboutHeroDescription: "أكاديمية تعليمية وُجدت لتقرب أبناءنا من لغتهم وقرآنهم وهويتهم، أينما كانت بيوتهم.",
  aboutHeadingPrefix: "التعليم ليس معلومات فقط، بل",
  aboutHeadingHighlight: "جسر إلى الهوية",
  aboutBodyPrimary:
    "نساعد الأطفال والطلاب العرب والمسلمين المقيمين خارج العالم العربي على الارتباط بلغتهم ودينهم، من خلال برامج أُعدت بعناية لتناسب العمر والمستوى وطبيعة التعلم أونلاين.",
  aboutBodySecondary:
    "نؤمن أن جودة التعليم تبدأ بفهم الطالب، وأن الثقة تُبنى عندما يرى ولي الأمر خطة واضحة وتقدمًا حقيقيًا واهتمامًا مستمرًا.",
  visionTitle: "جيل يعتز بلغته ويعيش قيمه بوعي",
  visionDescription: "أن تكون آفاق شريكًا موثوقًا للأسر المسلمة في بناء صلة مستمرة بين أبنائها والعربية والقرآن والهوية.",
  missionTitle: "تعليم فردي قريب من الطالب وحياته",
  missionDescription: "تقديم تجربة تعليمية مرنة وعالية الجودة تجمع العلم والتفاعل والمتابعة، وتراعي احتياج كل طالب.",
  goalTitle: "أثر يبقى بعد انتهاء الحصة",
  goalDescription: "أن يخرج الطالب بمعرفة يستخدمها، وثقة تنمو، وعلاقة أجمل بلغته ودينه ومجتمعه.",
  footerDescription:
    "تعليم فردي مباشر للغة العربية والقرآن الكريم والتربية الإسلامية، يساعد أبناءنا على فهم لغتهم والاعتزاز بهويتهم.",
  ctaEyebrow: "خطوة صغيرة، أثر كبير",
  ctaTitle: "ابدأ رحلة ابنك مع آفاق اليوم",
  ctaDescription: "دعنا نتعرف إلى احتياجاته ونرشح له نقطة البداية الأنسب في حصة تجريبية مجانية.",
};

export function whatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function telephoneUrl(phone: string): string {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

export function localPhoneDisplay(number: string): string {
  const digits = number.replace(/\D/g, "");
  return digits.startsWith("20") ? `0${digits.slice(2)}` : number;
}
