import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "الدروس الفردية",
  description: "معلم واحد وطالب واحد وخطة تعليمية مخصصة في دروس أكاديمية آفاق المباشرة أونلاين.",
  alternates: { canonical: "/private-lessons" },
};

const benefits = [
  ["teacher", "اهتمام كامل", "كل دقيقة في الحصة موجهة لاحتياج الطالب ومستواه."],
  ["message", "تفاعل مباشر", "سؤال وتصحيح ومشاركة مستمرة بدل الاستماع السلبي."],
  ["sparkle", "سرعة مناسبة", "لا استعجال ولا انتظار؛ نتقدم بالسرعة التي تخدم الفهم."],
  ["calendar", "مرونة أكبر", "خيارات مواعيد تراعي المدرسة وفارق التوقيت والأسرة."],
] as const;

export default function PrivateLessonsPage() {
  return (
    <>
      <PageHero eyebrow="معلم واحد + طالب واحد" title="الدروس الفردية" description="مساحة تعليمية هادئة تمنح الطالب اهتمامًا كاملًا، وتسمح للمعلم أن يبني الدرس حول احتياجه الحقيقي." symbol="1:1" />
      <section className="private-intro section-pad">
        <div className="container private-grid">
          <div className="private-visual">
            <img src="/images/private-lesson.webp" alt="طالب في درس فردي مباشر مع معلمة عبر الإنترنت" />
            <div className="live-pill"><i aria-hidden="true" />درس مباشر الآن</div>
          </div>
          <div>
            <span className="eyebrow"><i aria-hidden="true" />تعليم يراك ويسمعك</span>
            <h2 className="display-heading">ليس فصلًا مصغرًا، بل تجربة صُممت <em>لطالب واحد</em></h2>
            <p>في الدرس الفردي يستطيع الطالب أن يسأل دون تردد، ويكرر ما يحتاجه، ويتلقى تصحيحًا لحظيًا وخطة تناسب طريقته في التعلم.</p>
            <ul className="feature-list compact">
              <li><Icon name="check" />دروس مباشرة أونلاين بالصوت والصورة</li>
              <li><Icon name="check" />اختيار المادة والمستوى والموعد المناسب</li>
              <li><Icon name="check" />خطة شخصية ومتابعة منتظمة للتقدم</li>
            </ul>
            <Link className="button button-primary" href="/free-trial">جرّب الدرس الفردي مجانًا <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
      <section className="private-benefits section-pad">
        <div className="container">
          <SectionHeading eyebrow="لماذا 1:1؟" title="فرق يشعر به الطالب وتراه الأسرة" />
          <div className="benefit-grid">
            {benefits.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="lesson-flow section-pad">
        <div className="container lesson-flow-card">
          <div><span className="eyebrow eyebrow-light"><i aria-hidden="true" />داخل رحلة الطالب</span><h2>من اختيار المادة إلى متابعة التقدم</h2><p>رحلة منظمة تجعل كل قرار واضحًا للأسرة وكل درس متصلًا بما قبله وما بعده.</p></div>
          <ol>
            <li><span>01</span><div><h3>نختار المادة</h3><p>عربية، قرآن، تجويد، أو تربية إسلامية.</p></div></li>
            <li><span>02</span><div><h3>نحدد المستوى</h3><p>تقييم ودي دون ضغط أو اختبارات مربكة.</p></div></li>
            <li><span>03</span><div><h3>نثبت الموعد والمعلم</h3><p>اختيار يراعي الوقت والشخصية والاحتياج.</p></div></li>
            <li><span>04</span><div><h3>نتابع ونطوّر</h3><p>ملاحظات دورية وتعديل للخطة عند الحاجة.</p></div></li>
          </ol>
        </div>
      </section>
      <FinalCta title="حصة واحدة تكفي لتعرف الفرق" />
    </>
  );
}

