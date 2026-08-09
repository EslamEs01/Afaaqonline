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
};

export const defaultSiteSettings: SiteSettings = {
  academyName: "أكاديمية آفاق",
  slogan: "نرسّخ الهوية ونبني المستقبل",
  siteUrl: "https://afaaqinstitute.com",
  email: "afaaqinstitute@gmail.com",
  phone: "+20 104 139 1631",
  whatsapp: "201041391631",
  contactHours: "يوميًا من 10 صباحًا حتى 10 مساءً بتوقيت القاهرة",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
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
