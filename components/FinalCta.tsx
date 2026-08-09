"use client";

import Link from "next/link";
import { useSiteSettings } from "@/lib/site-settings-context";
import { whatsappUrl } from "@/lib/site-settings";
import { Icon } from "./Icon";

export function FinalCta({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) {
  const siteSettings = useSiteSettings();
  return (
    <section className="final-cta section-pad">
      <div className="container">
        <div className="final-cta-card">
          <div className="cta-mark" aria-hidden="true">
            <img src="/images/afaaq-mark.webp" alt="" />
          </div>
          <div>
            <span className="eyebrow eyebrow-light"><i aria-hidden="true" />{siteSettings.ctaEyebrow}</span>
            <h2>{title ?? siteSettings.ctaTitle}</h2>
            <p>{text ?? siteSettings.ctaDescription}</p>
          </div>
          <div className="cta-actions">
            <Link className="button button-gold" href="/free-trial">
              احجز الحصة المجانية <Icon name="arrow" />
            </Link>
            <a className="button button-ghost-light" href={whatsappUrl(siteSettings.whatsapp)} target="_blank" rel="noreferrer">
              اسألنا عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
