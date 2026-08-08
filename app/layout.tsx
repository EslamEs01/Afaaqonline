import type { Metadata } from "next";
import "@fontsource-variable/alexandria";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://afaaqonline.com"),
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
    url: "https://afaaqonline.com",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "أكاديمية آفاق",
  alternateName: "Afaaq Academy",
  url: "https://afaaqonline.com",
  logo: "https://afaaqonline.com/images/afaaq-logo.png",
  slogan: "نرسّخ الهوية ونبني المستقبل",
  email: "afaaqinstitute@gmail.com",
  telephone: "+201041391631",
  areaServed: "Worldwide",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html dir="rtl" lang="ar">
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}

