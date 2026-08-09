"use client";

import Link from "next/link";
import { useSiteSettings } from "@/lib/site-settings-context";
import { localPhoneDisplay, whatsappUrl } from "@/lib/site-settings";
import { Icon } from "./Icon";

const courseLinks = [
  { href: "/courses/arabic-letters", label: "حروفي العربية" },
  { href: "/courses/quran-reading", label: "قراءة القرآن" },
  { href: "/courses/basic-tajweed", label: "التجويد الأساسي" },
  { href: "/courses/aqeedah-for-kids", label: "العقيدة للصغار" },
];

export function Footer() {
  const siteSettings = useSiteSettings();
  return (
    <footer className="site-footer">
      <div className="footer-pattern" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/afaaq-logo.webp" alt="أكاديمية آفاق" />
          <p>{siteSettings.footerDescription}</p>
          <strong>{siteSettings.slogan}</strong>
        </div>

        <div>
          <h2>روابط سريعة</h2>
          <ul>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/courses">كل الكورسات</Link></li>
            <li><Link href="/plans">الخطط والأسعار</Link></li>
            <li><Link href="/private-lessons">الدروس الفردية</Link></li>
            <li><Link href="/free-trial">الحصة التجريبية</Link></li>
            <li><Link href="/faq">الأسئلة الشائعة</Link></li>
          </ul>
        </div>

        <div>
          <h2>برامج مختارة</h2>
          <ul>
            {courseLinks.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h2>نحن بالقرب منك</h2>
          <p>فريق آفاق جاهز للإجابة عن أسئلتك ومساعدتك في اختيار البداية المناسبة.</p>
          <a href={whatsappUrl(siteSettings.whatsapp)} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" />
            واتساب: {localPhoneDisplay(siteSettings.whatsapp)}
          </a>
          <a href={`mailto:${siteSettings.email}`}>
            <Icon name="email" />
            {siteSettings.email}
          </a>
          {siteSettings.facebookUrl ? (
            <a href={siteSettings.facebookUrl} target="_blank" rel="noreferrer" aria-label="صفحة أكاديمية آفاق على فيسبوك">
              <Icon name="facebook" />
              تابعنا على فيسبوك
            </a>
          ) : null}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} أكاديمية آفاق. جميع الحقوق محفوظة.</p>
        <div>
          <Link href="/privacy">سياسة الخصوصية</Link>
          <Link href="/terms">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}
