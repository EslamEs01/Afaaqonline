"use client";

import { useSiteSettings } from "@/lib/site-settings-context";
import { whatsappUrl } from "@/lib/site-settings";
import { Icon } from "./Icon";

export function FloatingWhatsApp() {
  const siteSettings = useSiteSettings();
  return (
    <a
      aria-label="تواصل مع أكاديمية آفاق عبر واتساب"
      className="floating-whatsapp"
      href={whatsappUrl(siteSettings.whatsapp, "مرحبًا فريق آفاق، أريد الاستفسار عن البرامج.")}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="whatsapp" size={27} />
      <span>تواصل معنا</span>
    </a>
  );
}
