import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PricingCards } from "@/components/PricingCards";
import { getPricingPlans, getSiteSettings } from "@/lib/content-api";
import { whatsappUrl } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "الخطط والأسعار",
  description: "خطط وأسعار الدروس الفردية في أكاديمية آفاق، مع تفاصيل الحصص والمميزات.",
  alternates: { canonical: "/plans" },
};

export default async function PlansPage() {
  const [plans, siteSettings] = await Promise.all([getPricingPlans(), getSiteSettings()]);
  return (
    <>
      <PageHero
        eyebrow="اختيار واضح ومرن"
        title="الخطط والأسعار"
        description="اختر الخطة المنشورة التي تناسب احتياج الطالب، أو تحدث معنا لنساعدك بعد تحديد المستوى."
        symbol="خ"
      />
      <section className="pricing-section section-pad">
        <div className="container">
          {plans.length ? <PricingCards plans={plans} whatsapp={siteSettings.whatsapp} /> : (
            <div className="pricing-empty">
              <span><Icon name="message" size={30} /></span>
              <h2>سيتم إعلان الخطط والأسعار المعتمدة قريبًا</h2>
              <p>تواصل معنا الآن، وسنساعدك في اختيار البرنامج المناسب بعد معرفة عمر الطالب ومستواه وهدفه.</p>
              <a className="button button-primary" href={whatsappUrl(siteSettings.whatsapp, "أرغب في معرفة الخطط والأسعار")} target="_blank" rel="noreferrer">
                اسأل عن الخطة المناسبة <Icon name="whatsapp" />
              </a>
              <Link className="text-link" href="/free-trial">أو احجز حصة تجريبية مجانية <Icon name="arrow" /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
