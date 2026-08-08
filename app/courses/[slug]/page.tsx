import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/CourseCard";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { courses, getCourse } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const related = courses.filter((item) => item.category === course.category && item.slug !== course.slug).slice(0, 3);

  return (
    <>
      <section className={`course-detail-hero accent-${course.accent}`}>
        <div className="container course-detail-grid">
          <div>
            <nav className="breadcrumbs breadcrumbs-dark" aria-label="مسار الصفحة">
              <Link href="/">الرئيسية</Link><Icon name="arrow" size={15} /><Link href="/courses">الكورسات</Link><Icon name="arrow" size={15} /><span>{course.title}</span>
            </nav>
            <span className="course-category-pill">{course.categoryLabel}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-hero-actions">
              <Link className="button button-gold" href={`/free-trial?course=${course.slug}`}>احجز حصة تجريبية <Icon name="arrow" /></Link>
              <a className="button button-ghost-light" href="https://wa.me/201041391631" target="_blank" rel="noreferrer">اسأل عن الكورس</a>
            </div>
          </div>
          <div className="course-facts-card">
            <span className="facts-symbol" aria-hidden="true">{course.category === "arabic" ? "ض" : course.category === "quran" ? "۞" : "✦"}</span>
            <h2>نظرة سريعة</h2>
            <dl>
              <div><dt><Icon name="student" />الفئة العمرية</dt><dd>{course.age}</dd></div>
              <div><dt><Icon name="sparkle" />المستوى</dt><dd>{course.level}</dd></div>
              <div><dt><Icon name="calendar" />مدة البرنامج</dt><dd>{course.duration}</dd></div>
              <div><dt><Icon name="clock" />مدة الحصة</dt><dd>{course.lessonLength}</dd></div>
              <div><dt><Icon name="teacher" />طريقة الدراسة</dt><dd>مباشر أونلاين 1:1</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="course-content section-pad">
        <div className="container course-content-grid">
          <article>
            <span className="eyebrow"><i aria-hidden="true" />أهداف الكورس</span>
            <h2>ما الذي نعمل عليه مع الطالب؟</h2>
            <ul className="feature-list">
              {course.goals.map((goal) => <li key={goal}><Icon name="check" />{goal}</li>)}
            </ul>
          </article>
          <article>
            <span className="eyebrow"><i aria-hidden="true" />النتائج المتوقعة</span>
            <h2>ماذا سيكتسب الطالب؟</h2>
            <ul className="outcomes-grid">
              {course.outcomes.map((outcome, index) => <li key={outcome}><span>0{index + 1}</span>{outcome}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="course-process section-pad">
        <div className="container">
          <div className="course-process-card">
            <div><span className="eyebrow eyebrow-light"><i aria-hidden="true" />البرنامج يتكيّف مع الطالب</span><h2>المدة المذكورة إطار إرشادي، والخطة النهائية تُبنى بعد تحديد المستوى.</h2></div>
            <div className="process-points">
              <p><Icon name="check" /><span><strong>تقييم بداية</strong><small>لمعرفة المهارات الحالية</small></span></p>
              <p><Icon name="check" /><span><strong>خطة فردية</strong><small>أهداف ومقدار يناسبان الطالب</small></span></p>
              <p><Icon name="check" /><span><strong>مراجعة تقدم</strong><small>تعديل المسار عند الحاجة</small></span></p>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="related-courses section-pad">
          <div className="container"><h2>قد يناسب الطالب أيضًا</h2><div className="courses-grid">{related.map((item) => <CourseCard course={item} key={item.slug} />)}</div></div>
        </section>
      ) : null}
      <FinalCta title={`ابدأ تجربة ${course.title}`} />
    </>
  );
}

