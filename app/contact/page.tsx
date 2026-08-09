import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { getSiteSettings } from "@/lib/content-api";
import { whatsappUrl } from "@/lib/site-settings";

export const metadata: Metadata = { title: "تواصل معنا", description: "تواصل مع فريق أكاديمية آفاق عبر واتساب أو البريد الإلكتروني.", alternates: { canonical: "/contact" } };

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  return (
    <>
      <PageHero eyebrow="يسعدنا أن نسمع منك" title="تواصل معنا" description="سؤال عن الكورسات أو المواعيد أو رحلة الطالب؟ فريق آفاق جاهز لمساعدتك." symbol="✦" />
      <section className="contact-section section-pad"><div className="container contact-grid">
        <div className="contact-info">
          <span className="eyebrow"><i aria-hidden="true" />قنوات التواصل</span><h2>اختر الطريقة الأسهل لك</h2><p>نحاول الرد بأسرع وقت، ونمنح كل أسرة الوقت الكافي لفهم احتياجها قبل التسجيل.</p>
          <div className="contact-cards">
            <a href={whatsappUrl(siteSettings.whatsapp)} target="_blank" rel="noreferrer"><span><Icon name="whatsapp" /></span><div><small>واتساب</small><strong dir="ltr">{siteSettings.phone}</strong></div><Icon name="arrow" /></a>
            <a href={`mailto:${siteSettings.email}`}><span><Icon name="email" /></span><div><small>البريد الإلكتروني</small><strong>{siteSettings.email}</strong></div><Icon name="arrow" /></a>
          </div>
          <div className="office-hours"><Icon name="clock" /><div><strong>أوقات التواصل</strong><p>{siteSettings.contactHours}. ويمكنك ترك رسالة في أي وقت.</p></div></div>
        </div>
        <div className="contact-form-wrap"><span className="eyebrow"><i aria-hidden="true" />أرسل رسالة</span><h2>كيف يمكننا مساعدتك؟</h2><ContactForm /></div>
      </div></section>
    </>
  );
}
