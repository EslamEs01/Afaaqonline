import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "تواصل معنا", description: "تواصل مع فريق أكاديمية آفاق عبر واتساب أو البريد الإلكتروني.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="يسعدنا أن نسمع منك" title="تواصل معنا" description="سؤال عن الكورسات أو المواعيد أو رحلة الطالب؟ فريق آفاق جاهز لمساعدتك." symbol="✦" />
      <section className="contact-section section-pad"><div className="container contact-grid">
        <div className="contact-info">
          <span className="eyebrow"><i aria-hidden="true" />قنوات التواصل</span><h2>اختر الطريقة الأسهل لك</h2><p>نحاول الرد بأسرع وقت، ونمنح كل أسرة الوقت الكافي لفهم احتياجها قبل التسجيل.</p>
          <div className="contact-cards">
            <a href="https://wa.me/201041391631" target="_blank" rel="noreferrer"><span><Icon name="whatsapp" /></span><div><small>واتساب</small><strong dir="ltr">+20 104 139 1631</strong></div><Icon name="arrow" /></a>
            <a href="mailto:afaaqinstitute@gmail.com"><span><Icon name="email" /></span><div><small>البريد الإلكتروني</small><strong>afaaqinstitute@gmail.com</strong></div><Icon name="arrow" /></a>
          </div>
          <div className="office-hours"><Icon name="clock" /><div><strong>أوقات التواصل</strong><p>يوميًا من 10 صباحًا حتى 10 مساءً بتوقيت القاهرة. ويمكنك ترك رسالة في أي وقت.</p></div></div>
        </div>
        <div className="contact-form-wrap"><span className="eyebrow"><i aria-hidden="true" />أرسل رسالة</span><h2>كيف يمكننا مساعدتك؟</h2><ContactForm /></div>
      </div></section>
    </>
  );
}

