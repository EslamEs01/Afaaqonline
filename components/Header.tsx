"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteSettings } from "@/lib/site-settings-context";
import { telephoneUrl } from "@/lib/site-settings";
import { Icon } from "./Icon";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/courses", label: "البرامج والكورسات" },
  { href: "/private-lessons", label: "الدروس الفردية" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const siteSettings = useSiteSettings();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        انتقل إلى المحتوى
      </a>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>حصتك التجريبية الأولى مجانًا — ابدأ بخطوة مطمئنة</p>
          <div className="topbar-links">
            <a href={`mailto:${siteSettings.email}`}>
              <Icon name="email" size={16} />
              {siteSettings.email}
            </a>
            <a dir="ltr" href={telephoneUrl(siteSettings.phone)}>
              <Icon name="phone" size={16} />
              {siteSettings.phone}
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-shell">
          <Link className="brand" href="/" aria-label="أكاديمية آفاق — الرئيسية">
            <picture>
              <source srcSet="/images/afaaq-logo.webp" type="image/webp" />
              <img src="/images/afaaq-logo.png" alt="أكاديمية آفاق" />
            </picture>
          </Link>

          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <Link className="button button-primary button-small desktop-cta" href="/free-trial">
              احجز حصة تجريبية
            </Link>
            <button
              aria-expanded={open}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="menu-toggle"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              <Icon name={open ? "close" : "menu"} size={25} />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
          <nav className="container" aria-label="التنقل على الهاتف">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                {item.label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
            <Link className="button button-primary" href="/free-trial" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              احجز حصة تجريبية مجانية
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
