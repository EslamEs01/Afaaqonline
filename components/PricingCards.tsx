import { Icon } from "./Icon";
import type { PricingPlan } from "@/lib/content-api";
import { whatsappUrl } from "@/lib/site-settings";

export function PricingCards({ plans, whatsapp }: { plans: PricingPlan[]; whatsapp: string }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <article className={`pricing-card${plan.isFeatured ? " pricing-card-featured" : ""}`} key={plan.name}>
          {plan.isFeatured ? <span className="pricing-badge">الأكثر اختيارًا</span> : null}
          <h3>{plan.name}</h3>
          {plan.description ? <p className="pricing-description">{plan.description}</p> : null}
          <div className="pricing-amount">
            <strong>{plan.price.replace(/\.00$/, "")}</strong>
            <span>{plan.currency}</span>
          </div>
          <p className="pricing-period">{plan.billingPeriod}</p>
          {plan.lessonCount || plan.lessonDuration ? (
            <div className="pricing-lessons">
              {plan.lessonCount ? <span>{plan.lessonCount} حصص</span> : null}
              {plan.lessonDuration ? <span>{plan.lessonDuration} للحصة</span> : null}
            </div>
          ) : null}
          {plan.features.length ? (
            <ul>
              {plan.features.map((feature) => <li key={feature}><Icon name="check" size={17} />{feature}</li>)}
            </ul>
          ) : null}
          <a
            className={`button ${plan.isFeatured ? "button-primary" : "button-outline"}`}
            href={whatsappUrl(whatsapp, `أرغب في الاستفسار عن خطة ${plan.name}`)}
            target="_blank"
            rel="noreferrer"
          >
            {plan.ctaLabel} <Icon name="whatsapp" />
          </a>
        </article>
      ))}
    </div>
  );
}
