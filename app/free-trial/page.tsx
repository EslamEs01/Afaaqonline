import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { TrialForm } from "@/components/TrialForm";
import { getCourses, getSiteSettings } from "@/lib/content-api";
import { whatsappUrl } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "احجز حصة تجريبية مجانية",
  description: "احجز حصة تجريبية مجانية مع أكاديمية آفاق في خطوات قصيرة وسهلة.",
  alternates: { canonical: "/free-trial" },
};

export default async function FreeTrialPage() {
  const [courses, siteSettings] = await Promise.all([getCourses(), getSiteSettings()]);
  return (
    <section className="trial-page section-pad">
      <div className="container">
        <div className="trial-heading">
          <span className="eyebrow"><i aria-hidden="true" />ابدأ دون التزام</span>
          <h1>احجز حصة تجريبية مجانية</h1>
          <p>خطوات قصيرة تساعدنا على فهم احتياج الطالب وتنسيق موعد يناسبكم.</p>
          <div><span><Icon name="clock" />يستغرق أقل من 3 دقائق</span><span><Icon name="shield" />بياناتك محفوظة بأمان</span></div>
        </div>
        <Suspense fallback={<div className="courses-loading">جاري تجهيز نموذج الحجز…</div>}><TrialForm courses={courses} /></Suspense>
        <div className="trial-help"><Icon name="whatsapp" /><p><strong>تفضل أن تحجز بالمحادثة؟</strong><small>راسلنا على واتساب وسيساعدك الفريق خطوة بخطوة.</small></p><a href={whatsappUrl(siteSettings.whatsapp)} target="_blank" rel="noreferrer">ابدأ المحادثة</a></div>
      </div>
    </section>
  );
}
