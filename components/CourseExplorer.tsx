"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Course, CourseCategory } from "@/data/courses";
import { CourseCard } from "./CourseCard";

const filters: { value: "all" | CourseCategory; label: string }[] = [
  { value: "all", label: "كل الكورسات" },
  { value: "arabic", label: "اللغة العربية" },
  { value: "quran", label: "القرآن الكريم" },
  { value: "islamic", label: "التربية الإسلامية" },
];

export function CourseExplorer({ courses }: { courses: Course[] }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [active, setActive] = useState<"all" | CourseCategory>(
    initial === "arabic" || initial === "quran" || initial === "islamic" ? initial : "all",
  );
  const visible = useMemo(
    () => (active === "all" ? courses : courses.filter((course) => course.category === active)),
    [active, courses],
  );

  return (
    <div>
      <div className="course-filters" role="group" aria-label="تصفية الكورسات">
        {filters.map((filter) => (
          <button
            aria-pressed={active === filter.value}
            className={active === filter.value ? "active" : ""}
            key={filter.value}
            onClick={() => setActive(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">نعرض {visible.length} كورسًا مناسبًا للاختيار</p>
      <div className="courses-grid">
        {visible.map((course) => <CourseCard course={course} key={course.slug} />)}
      </div>
    </div>
  );
}
