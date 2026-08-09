import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  return { response, html };
}

test("renders the Arabic RTL branded homepage", async () => {
  const { response, html } = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<html[^>]+dir="rtl"[^>]+lang="ar"/i);
  assert.match(html, /نرسّخ[^<]*الهوية/);
  assert.match(html, /احجز حصتك التجريبية/);
  assert.match(html, /afaaqinstitute@gmail\.com/);
  assert.match(html, /https:\/\/afaaqinstitute\.com/);
  assert.doesNotMatch(html, /afaaqonline\.com/i);
  assert.doesNotMatch(html, /Starter Project|Ship something real/);
});

test("renders core public routes", async () => {
  for (const [path, marker] of [
    ["/about", "من نحن"],
    ["/courses", "البرامج والكورسات"],
    ["/private-lessons", "الدروس الفردية"],
    ["/free-trial", "احجز حصة تجريبية مجانية"],
    ["/contact", "تواصل معنا"],
    ["/faq", "الأسئلة الشائعة"],
  ]) {
    const { response, html } = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    assert.match(html, new RegExp(marker));
  }
});

test("renders a complete course detail page", async () => {
  const { response, html } = await render("/courses/basic-tajweed");
  assert.equal(response.status, 200);
  assert.match(html, /التجويد الأساسي/);
  assert.match(html, /12 أسبوعًا/);
  assert.match(html, /مباشر أونلاين 1:1/);
  assert.match(html, /احجز حصة تجريبية/);
});

test("renders all 13 canonical course pages", async () => {
  const canonicalCourses = JSON.parse(
    await readFile(new URL("../backend/academy/seed/courses.json", import.meta.url), "utf8"),
  );
  const slugs = canonicalCourses.map((course) => course.slug);
  assert.equal(slugs.length, 13);
  for (const slug of slugs) {
    const { response } = await render(`/courses/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
  }
});
