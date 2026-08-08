import Link from "next/link";
import { Icon } from "./Icon";

export function PageHero({
  eyebrow,
  title,
  description,
  symbol = "آ",
}: {
  eyebrow: string;
  title: string;
  description: string;
  symbol?: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-orbit orbit-one" aria-hidden="true" />
      <div className="page-hero-orbit orbit-two" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div>
          <span className="eyebrow eyebrow-light"><i aria-hidden="true" />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <nav aria-label="مسار الصفحة" className="breadcrumbs">
            <Link href="/">الرئيسية</Link>
            <Icon name="arrow" size={15} />
            <span>{title}</span>
          </nav>
        </div>
        <div className="page-hero-symbol" aria-hidden="true">
          <span>{symbol}</span>
          <small>آفاق أوسع للمعرفة</small>
        </div>
      </div>
    </section>
  );
}

