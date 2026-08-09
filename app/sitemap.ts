import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://afaaqinstitute.com";
  const pages = ["", "/about", "/courses", "/private-lessons", "/free-trial", "/contact", "/faq"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/free-trial" ? 0.9 : 0.8 })),
    ...courses.map((course) => ({ url: `${base}/courses/${course.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
