import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "الأسئلة الشائعة", description: "إجابات واضحة عن دروس أكاديمية آفاق والحصة التجريبية والمواعيد والمتابعة.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="إجابات قبل أن تبدأ" title="الأسئلة الشائعة" description="جمعنا أكثر ما تسأل عنه الأسر لتتعرف إلى التجربة وتتخذ قرارك براحة ووضوح." symbol="؟" />
      <section className="faq-section section-pad"><div className="container faq-grid"><div><span className="eyebrow"><i aria-hidden="true" />كل ما تحتاج إلى معرفته</span><h2>أسئلة بسيطة، وإجابات مباشرة</h2><p>إذا لم تجد إجابة سؤالك، تواصل معنا وسيساعدك الفريق بكل سرور.</p><div className="faq-contact-box"><span><Icon name="whatsapp" /></span><div><strong>تحتاج إجابة سريعة؟</strong><small>تحدث مع فريق آفاق مباشرة</small></div><a href="https://wa.me/201041391631" target="_blank" rel="noreferrer">فتح واتساب</a></div><Link href="/contact" className="text-link">أو أرسل لنا رسالة <Icon name="arrow" /></Link></div><FaqList /></div></section>
      <FinalCta />
    </>
  );
}

