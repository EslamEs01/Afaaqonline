import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryMeta } from "@/data/courses";
import { getCourses, getSiteSettings, getTestimonials } from "@/lib/content-api";

const strengths = [
  { icon: "teacher" as const, title: "تعليم فردي مباشر", text: "معلم واحد وطالب واحد لاهتمام كامل ووقت تعلّم فعّال." },
  { icon: "student" as const, title: "خطة تناسب الطالب", text: "نبدأ من مستواه الحقيقي ونتقدم معه بخطوات واضحة." },
  { icon: "shield" as const, title: "معلمون مؤهلون", text: "اختيار دقيق للمعلمين مع متابعة جودة التجربة التعليمية." },
  { icon: "sparkle" as const, title: "تعليم تفاعلي", text: "حوار وأنشطة وأدوات تجعل الدرس حيًا ومحببًا." },
  { icon: "message" as const, title: "متابعة مستمرة", text: "ملاحظات وتقييمات تساعد الأسرة على رؤية التقدم بوضوح." },
  { icon: "calendar" as const, title: "مواعيد مرنة", text: "خيارات تناسب فارق التوقيت وجدول الأسرة أينما كانت." },
];

const journey = [
  { number: "01", title: "احجز حصة تجريبية", text: "نموذج قصير يخبرنا بما يحتاجه الطالب." },
  { number: "02", title: "نتعرف إلى مستواه", text: "لقاء ودي لتحديد المستوى وطريقة التعلم الأنسب." },
  { number: "03", title: "نرشح البرنامج", text: "خطة واضحة ومعلم مناسب وموعد يلائم الأسرة." },
  { number: "04", title: "تبدأ رحلة آفاق", text: "دروس تفاعلية ومتابعة تساعده على التقدم بثقة." },
];

export default async function Home() {
  const [courses, testimonials, siteSettings] = await Promise.all([getCourses(), getTestimonials(), getSiteSettings()]);
  const featuredCourses = courses.filter((course) => course.isFeatured);
  const homeCourses = featuredCourses.length >= 3
    ? featuredCourses.slice(0, 3)
    : [courses.find((course) => course.category === "arabic"), courses.find((course) => course.category === "quran"), courses.find((course) => course.category === "islamic")].filter((course) => course !== undefined);
  return (
    <>
      <section className="home-hero">
        <div className="hero-dots" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i aria-hidden="true" />{siteSettings.homeHeroEyebrow}</span>
            <h1>
              {siteSettings.homeHeroTitlePrefix} <em>{siteSettings.homeHeroTitleHighlight}</em>
              <br />{siteSettings.homeHeroTitleSuffix}
            </h1>
            <p>{siteSettings.homeHeroDescription}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/free-trial">
                احجز حصتك التجريبية <Icon name="arrow" />
              </Link>
              <Link className="button button-outline" href="/about">
                تعرّف على الأكاديمية
              </Link>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack" aria-hidden="true">
                <span>ض</span><span>ق</span><span>آ</span>
              </div>
              <p><strong>تعليم يصنع صلة</strong><small>بين الطفل ولغته ودينه وهويته</small></p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src="/images/hero-learning.webp" alt="طالب يتعلم العربية والقرآن في درس أونلاين" />
            </div>
            <div className="floating-note note-top">
              <span><Icon name="teacher" /></span>
              <p><strong>درس فردي 1:1</strong><small>اهتمام كامل بالطالب</small></p>
            </div>
            <div className="floating-note note-bottom">
              <span><Icon name="heart" /></span>
              <p><strong>رحلة يحبها طفلك</strong><small>متابعة، تفاعل، وتشجيع</small></p>
            </div>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>

      <section className="strengths-section section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="لماذا آفاق؟"
            title="كل ما يحتاجه الطالب ليتعلم بثقة"
            description="تجربة تعليمية واضحة للطالب، ومطمئنة لولي الأمر، ومرنة مع واقع الأسرة خارج العالم العربي."
          />
          <div className="strengths-grid">
            {strengths.map((item) => (
              <article className="strength-card" key={item.title}>
                <span><Icon name={item.icon} size={25} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="programs-section section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="ماذا نقدّم؟"
            title="ثلاثة مسارات، وهدف واحد"
            description="أن يكبر أبناؤنا وهم يعرفون لغتهم، ويحبون قرآنهم، ويفهمون دينهم بوعي واتزان."
          />
          <div className="programs-grid">
            {(Object.entries(categoryMeta) as [keyof typeof categoryMeta, (typeof categoryMeta)[keyof typeof categoryMeta]][]).map(
              ([key, category], index) => (
                <article className={`program-card program-${key}`} key={key}>
                  <div className="program-index">0{index + 1}</div>
                  <span className="program-symbol" aria-hidden="true">{category.symbol}</span>
                  <small>{category.eyebrow}</small>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <Link className="text-link" href={`/courses?category=${key}`}>
                    اكتشف الكورسات <Icon name="arrow" />
                  </Link>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="journey-section section-pad">
        <div className="container">
          <div className="journey-heading-row">
            <SectionHeading
              align="start"
              eyebrow="كيف نبدأ؟"
              title="أربع خطوات بسيطة لبداية مطمئنة"
              description="لا تحتاج إلى معرفة المستوى أو اختيار الكورس وحدك؛ نحن نساعدك من أول خطوة."
            />
            <Link className="button button-outline" href="/free-trial">ابدأ الآن <Icon name="arrow" /></Link>
          </div>
          <div className="journey-grid">
            {journey.map((item, index) => (
              <article className="journey-step" key={item.number}>
                <span className="step-number">{item.number}</span>
                <div className="step-dot"><Icon name="check" size={18} /></div>
                {index < journey.length - 1 ? <i className="step-line" aria-hidden="true" /> : null}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-courses section-pad">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading align="start" eyebrow="كورسات مختارة" title="بدايات صُممت لتناسب كل طالب" />
            <Link className="text-link text-link-large" href="/courses">عرض جميع الكورسات <Icon name="arrow" /></Link>
          </div>
          <div className="courses-grid home-courses">
            {homeCourses.map((course) => <CourseCard course={course} key={course.slug} />)}
          </div>
        </div>
      </section>

      <section className="parent-message section-pad">
        <div className="container parent-grid">
          <div className="parent-image-wrap">
            <img src="/images/parent-identity.webp" alt="أب يقرأ مع طفله ويشجعه على حب العربية" />
            <div className="parent-badge"><Icon name="heart" /><span><strong>الهوية تبدأ من البيت</strong><small>ونحن نشارككم بناءها</small></span></div>
          </div>
          <div className="parent-copy">
            <span className="eyebrow"><i aria-hidden="true" />رسالة إلى كل ولي أمر</span>
            <h2>لأن أبناءنا يستحقون أن يكبروا وهم <em>يفخرون بهويتهم</em></h2>
            <p>
              نعرف أن البعد عن العالم العربي يجعل الحفاظ على اللغة والهوية تحديًا يوميًا. لذلك لا نقدم
              دروسًا منفصلة عن حياة الطفل؛ بل نبني تجربة تجمع جودة التعليم، والمتعة، والمتابعة، والاهتمام
              باحتياجاته الفردية.
            </p>
            <blockquote>“نحن لا نعلّم أبناءك فقط، بل نساعدهم على بناء علاقة قوية مع لغتهم وقرآنهم.”</blockquote>
            <Link className="button button-primary" href="/about">اعرف أكثر عن منهجنا <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className="testimonials-section section-pad">
          <div className="container">
            <SectionHeading eyebrow="قالوا عن آفاق" title="تجارب تبدأ بالطمأنينة وتنمو بالنتائج" />
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={`${testimonial.name}-${testimonial.quote}`}>
                  <div className="quote-mark" aria-hidden="true">“</div>
                  <div className="stars" aria-label={`تقييم ${testimonial.rating} من 5`}>{"★".repeat(testimonial.rating)}</div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <div className="testimonial-author">
                    <span>{testimonial.initials || testimonial.name.slice(0, 1)}</span>
                    <p><strong>{testimonial.name}</strong><small>{testimonial.meta}</small></p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
