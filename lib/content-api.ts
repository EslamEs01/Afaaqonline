import type { Course } from "@/data/courses";
import { courses as staticCourses } from "@/data/courses";
import type { FaqItem } from "@/data/faqs";
import { faqs as staticFaqs } from "@/data/faqs";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site-settings";

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  initials: string;
  rating: number;
};

const INTERNAL_API_BASE = process.env.AFQ_API_INTERNAL_URL?.replace(/\/$/, "");

async function fetchContent<T>(path: string): Promise<T | null> {
  if (!INTERNAL_API_BASE) return null;
  try {
    const response = await fetch(`${INTERNAL_API_BASE}/${path.replace(/^\//, "")}`, {
      headers: { Accept: "application/json", "X-Forwarded-Proto": "https" },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getCourses(): Promise<Course[]> {
  return (await fetchContent<Course[]>("courses/")) || staticCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const course = await fetchContent<Course>(`courses/${encodeURIComponent(slug)}/`);
  return course || staticCourses.find((item) => item.slug === slug);
}

export async function getFaqs(): Promise<FaqItem[]> {
  return (await fetchContent<FaqItem[]>("faqs/")) || staticFaqs;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await fetchContent<Testimonial[]>("testimonials/")) || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await fetchContent<SiteSettings>("site-settings/")) || defaultSiteSettings;
}
