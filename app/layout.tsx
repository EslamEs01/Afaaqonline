import type { Metadata } from "next";
import "@fontsource-variable/cairo";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSiteSettings } from "@/lib/content-api";
import { SiteSettingsProvider } from "@/lib/site-settings-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://afaaqinstitute.com"),
  title: {
    default: "أكاديمية آفاق | نرسّخ الهوية ونبني المستقبل",
    template: "%s | أكاديمية آفاق",
  },
  description:
    "دروس فردية مباشرة أونلاين في اللغة العربية والقرآن الكريم والتربية الإسلامية لجميع الأعمار، مع خطة تناسب مستوى كل طالب.",
  keywords: [
    "تعليم اللغة العربية أونلاين",
    "تحفيظ القرآن للأطفال",
    "دروس قرآن فردية",
    "التربية الإسلامية للأطفال",
    "أكاديمية آفاق",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://afaaqinstitute.com",
    siteName: "أكاديمية آفاق",
    title: "أكاديمية آفاق | نرسّخ الهوية ونبني المستقبل",
    description: "تعليم العربية والقرآن والتربية الإسلامية بطريقة تناسب أبناءنا في كل مكان.",
    images: [{ url: "/images/hero-learning.webp", width: 1536, height: 1024, alt: "رحلة تعلم مع أكاديمية آفاق" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية آفاق",
    description: "نرسّخ الهوية ونبني المستقبل.",
    images: ["/images/hero-learning.webp"],
  },
  icons: {
    icon: "/images/afaaq-mark.png",
    shortcut: "/images/afaaq-mark.png",
    apple: "/images/afaaq-mark.png",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteSettings = await getSiteSettings();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteSettings.academyName,
    alternateName: "Afaaq Academy",
    url: "https://afaaqinstitute.com",
    logo: "https://afaaqinstitute.com/images/afaaq-logo.png",
    slogan: siteSettings.slogan,
    email: siteSettings.email,
    telephone: `+${siteSettings.whatsapp.replace(/\D/g, "")}`,
    areaServed: "Worldwide",
  };
  return (
    <html dir="rtl" lang="ar">
      <body>
        <SiteSettingsProvider settings={siteSettings}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            type="application/ld+json"
          />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
