import Link from "next/link";
import type { Course } from "@/data/courses";
import { categoryMeta } from "@/data/courses";
import { Icon } from "./Icon";

export function CourseCard({ course }: { course: Course }) {
  const category = categoryMeta[course.category];
  return (
    <article className={`course-card accent-${course.accent}`}>
      <div className="course-card-top">
        <span className="course-symbol" aria-hidden="true">{category.symbol}</span>
        <span className="course-category">{course.categoryLabel}</span>
      </div>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <div className="course-meta">
        <span><Icon name="student" size={17} />{course.age}</span>
        <span><Icon name="clock" size={17} />{course.lessonLength}</span>
      </div>
      <Link href={`/courses/${course.slug}`} className="text-link">
        تفاصيل الكورس <Icon name="arrow" size={18} />
      </Link>
    </article>
  );
}

