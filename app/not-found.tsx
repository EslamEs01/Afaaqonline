import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return <section className="not-found section-pad"><div className="container"><img src="/images/afaaq-mark.webp" alt="" /><span>404</span><h1>هذه الصفحة خارج الأفق</h1><p>ربما تغير الرابط أو لم تعد الصفحة متاحة. يمكنك العودة إلى الرئيسية أو استكشاف برامجنا.</p><div><Link className="button button-primary" href="/">العودة للرئيسية <Icon name="arrow" /></Link><Link className="button button-outline" href="/courses">استكشف الكورسات</Link></div></div></section>;
}

