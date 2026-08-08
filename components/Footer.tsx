import Link from "next/link";
import { Icon } from "./Icon";

const courseLinks = [
  { href: "/courses/arabic-letters", label: "حروفي العربية" },
  { href: "/courses/quran-reading", label: "قراءة القرآن" },
  { href: "/courses/basic-tajweed", label: "التجويد الأساسي" },
  { href: "/courses/aqeedah-for-kids", label: "العقيدة للصغار" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-pattern" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/afaaq-logo.webp" alt="أكاديمية آفاق" />
          <p>
            تعليم فردي مباشر للغة العربية والقرآن الكريم والتربية الإسلامية، يساعد أبناءنا على فهم
            لغتهم والاعتزاز بهويتهم.
          </p>
          <strong>نرسّخ الهوية ونبني المستقبل</strong>
        </div>

        <div>
          <h2>روابط سريعة</h2>
          <ul>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/courses">كل الكورسات</Link></li>
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
          <a href="https://wa.me/201041391631" target="_blank" rel="noreferrer">
            <Icon name="whatsapp" />
            واتساب: 01041391631
          </a>
          <a href="mailto:afaaqinstitute@gmail.com">
            <Icon name="email" />
            afaaqinstitute@gmail.com
          </a>
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

