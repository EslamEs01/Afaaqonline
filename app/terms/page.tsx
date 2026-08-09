import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getSiteSettings } from "@/lib/content-api";

export const metadata: Metadata = { title: "الشروط والأحكام", description: "الشروط العامة لاستخدام موقع وخدمات أكاديمية آفاق.", robots: { index: false, follow: true } };

export default async function TermsPage() {
  const siteSettings = await getSiteSettings();
  return <><PageHero eyebrow="وضوح من البداية" title="الشروط والأحكام" description="القواعد العامة لاستخدام الموقع وطلب خدمات أكاديمية آفاق." symbol="✦" /><section className="legal-page section-pad"><article className="container legal-card"><p className="legal-updated">آخر تحديث: أغسطس 2026</p><h2>استخدام الموقع</h2><p>المعلومات المنشورة تعرّف بخدمات الأكاديمية، ولا يُسمح بإساءة استخدام الموقع أو محاولة تعطيله أو نسخ محتواه التجاري دون إذن.</p><h2>الحصة التجريبية</h2><p>إرسال الطلب لا يعني تثبيت الموعد تلقائيًا. يتواصل الفريق لتأكيد التوفر والموعد والمعلم المناسب.</p><h2>الخطط والمواعيد والدفع</h2><p>يتم توضيح تفاصيل الخطة والسعر ووسيلة الدفع وسياسة إعادة الجدولة قبل بدء الدروس المنتظمة، وتصبح التفاصيل المتفق عليها مع الأسرة هي المرجع.</p><h2>المحتوى التعليمي</h2><p>المواد المقدمة للطالب مخصصة لاستخدامه التعليمي الشخصي، ولا يجوز إعادة نشرها أو بيعها دون موافقة الأكاديمية.</p><h2>التواصل</h2><p>لأي سؤال عن هذه الشروط، تواصل معنا على <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a> أو عبر واتساب.</p></article></section></>;
}
