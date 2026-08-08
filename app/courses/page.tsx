import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseExplorer } from "@/components/CourseExplorer";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "البرامج والكورسات",
  description: "استكشف كورسات اللغة العربية والقرآن الكريم والتربية الإسلامية في أكاديمية آفاق.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="مسارات لكل عمر ومستوى"
        title="البرامج والكورسات"
        description="اختر المجال الذي يحتاجه الطالب، وسنساعدك في تحديد الكورس والمستوى الأنسب بعد الحصة التجريبية."
        symbol="ض"
      />
      <section className="course-explorer section-pad">
        <div className="container">
          <Suspense fallback={<div className="courses-loading">جاري تجهيز الكورسات…</div>}>
            <CourseExplorer />
          </Suspense>
        </div>
      </section>
      <FinalCta title="لست متأكدًا من الكورس المناسب؟" text="احجز حصة تجريبية، وسنحدد مستوى الطالب ونرشح له نقطة البداية المناسبة." />
    </>
  );
}

