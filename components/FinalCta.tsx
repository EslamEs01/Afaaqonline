import Link from "next/link";
import { Icon } from "./Icon";

export function FinalCta({
  title = "ابدأ رحلة ابنك مع آفاق اليوم",
  text = "دعنا نتعرف إلى احتياجاته ونرشح له نقطة البداية الأنسب في حصة تجريبية مجانية.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="final-cta section-pad">
      <div className="container">
        <div className="final-cta-card">
          <div className="cta-mark" aria-hidden="true">
            <img src="/images/afaaq-mark.webp" alt="" />
          </div>
          <div>
            <span className="eyebrow eyebrow-light"><i aria-hidden="true" />خطوة صغيرة، أثر كبير</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Link className="button button-gold" href="/free-trial">
              احجز الحصة المجانية <Icon name="arrow" />
            </Link>
            <a className="button button-ghost-light" href="https://wa.me/201041391631" target="_blank" rel="noreferrer">
              اسألنا عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

