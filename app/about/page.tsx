import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف إلى رؤية أكاديمية آفاق ورسالتها ومنهجها في تعليم العربية والقرآن وبناء الهوية.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: "heart" as const, title: "التعليم بعناية", text: "نرى الطالب فردًا له شخصيته واحتياجاته، لا رقمًا داخل فصل كبير." },
  { icon: "shield" as const, title: "الثقة والوضوح", text: "تواصل صريح مع الأسرة، وخطة مفهومة، وتغذية راجعة مستمرة." },
  { icon: "sparkle" as const, title: "المتعة الهادفة", text: "نشاط وتفاعل يخدم الهدف التعليمي، ويجعل المعرفة أقرب للطالب." },
  { icon: "globe" as const, title: "هوية تعيش أينما كنا", text: "نصل اللغة والدين بواقع أبنائنا في المجتمعات المختلفة." },
];

const methodology = [
  ["نستمع أولًا", "نتعرف إلى الطالب واهتماماته ومستواه وتوقعات الأسرة."],
  ["نحدد هدفًا واضحًا", "نحوّل الاحتياج إلى نتائج تعليمية قابلة للملاحظة والقياس."],
  ["نتعلم بالتفاعل", "نستخدم السؤال والتطبيق والقصة والتكرار الذكي داخل الدرس."],
  ["نراجع ونتطور", "نرصد التقدم ونكيّف الخطة كلما احتاج الطالب إلى ذلك."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="قصتنا ورسالتنا"
        title="من نحن"
        description="أكاديمية تعليمية وُجدت لتقرب أبناءنا من لغتهم وقرآنهم وهويتهم، أينما كانت بيوتهم."
        symbol="آ"
      />

      <section className="about-intro section-pad">
        <div className="container about-intro-grid">
          <div className="about-collage">
            <div className="about-main-image"><img src="/images/parent-identity.webp" alt="أسرة تبني علاقة طفلها باللغة والهوية" /></div>
            <div className="about-small-image"><img src="/images/private-lesson.webp" alt="درس عربي أونلاين فردي" /></div>
            <div className="about-stat"><strong>1:1</strong><span>تعليم فردي<br />باهتمام كامل</span></div>
          </div>
          <div>
            <span className="eyebrow"><i aria-hidden="true" />أكاديمية آفاق</span>
            <h2 className="display-heading">التعليم ليس معلومات فقط، بل <em>جسر إلى الهوية</em></h2>
            <p>
              نساعد الأطفال والطلاب العرب والمسلمين المقيمين خارج العالم العربي على الارتباط بلغتهم
              ودينهم، من خلال برامج أُعدت بعناية لتناسب العمر والمستوى وطبيعة التعلم أونلاين.
            </p>
            <p>
              نؤمن أن جودة التعليم تبدأ بفهم الطالب، وأن الثقة تُبنى عندما يرى ولي الأمر خطة واضحة
              وتقدمًا حقيقيًا واهتمامًا مستمرًا.
            </p>
            <div className="about-signature">
              <img src="/images/afaaq-mark.webp" alt="" />
              <p><strong>نرسّخ الهوية ونبني المستقبل</strong><small>وعد آفاق لكل أسرة</small></p>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section section-pad">
        <div className="container vision-grid">
          <article>
            <span>01</span><small>رؤيتنا</small>
            <h2>جيل يعتز بلغته ويعيش قيمه بوعي</h2>
            <p>أن تكون آفاق شريكًا موثوقًا للأسر المسلمة في بناء صلة مستمرة بين أبنائها والعربية والقرآن والهوية.</p>
          </article>
          <article>
            <span>02</span><small>رسالتنا</small>
            <h2>تعليم فردي قريب من الطالب وحياته</h2>
            <p>تقديم تجربة تعليمية مرنة وعالية الجودة تجمع العلم والتفاعل والمتابعة، وتراعي احتياج كل طالب.</p>
          </article>
          <article>
            <span>03</span><small>هدفنا</small>
            <h2>أثر يبقى بعد انتهاء الحصة</h2>
            <p>أن يخرج الطالب بمعرفة يستخدمها، وثقة تنمو، وعلاقة أجمل بلغته ودينه ومجتمعه.</p>
          </article>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="قيمنا" title="مبادئ نترجمها داخل كل درس" />
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title}><span><Icon name={value.icon} /></span><h3>{value.title}</h3><p>{value.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section section-pad">
        <div className="container method-grid">
          <div>
            <SectionHeading
              align="start"
              eyebrow="منهجنا التعليمي"
              title="خطة مرنة، لكن ليست عشوائية"
              description="نستخدم إطارًا واضحًا يسمح للمعلم أن يكيّف الدرس دون أن يفقد الهدف أو مسار التقدم."
            />
            <Link className="button button-gold" href="/free-trial">اختبر التجربة بنفسك <Icon name="arrow" /></Link>
          </div>
          <div className="method-list">
            {methodology.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="teachers-section section-pad">
        <div className="container teachers-card">
          <div>
            <span className="eyebrow eyebrow-light"><i aria-hidden="true" />فريق التعليم</span>
            <h2>معلم يعرف مادته، ويعرف كيف يصل بها إلى الطالب</h2>
            <p>
              نختار المعلمين وفق الكفاءة العلمية والقدرة على التواصل والصبر وإدارة الدرس الفردي أونلاين،
              ثم نتابع جودة التجربة من خلال ملاحظات الأسرة وتقدم الطالب.
            </p>
          </div>
          <ul>
            <li><Icon name="check" />تأهيل علمي مناسب للمادة</li>
            <li><Icon name="check" />خبرة في التعليم الفردي أونلاين</li>
            <li><Icon name="check" />قدرة على التعامل مع الأعمار المختلفة</li>
            <li><Icon name="check" />التزام بالمتابعة والتطوير المستمر</li>
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

