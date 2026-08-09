"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useRef, useState } from "react";
import type { Course } from "@/data/courses";
import { postToApi } from "@/lib/client-api";
import { useSiteSettings } from "@/lib/site-settings-context";
import { whatsappUrl } from "@/lib/site-settings";
import { Icon } from "./Icon";

type TrialFormValues = {
  subject: string;
  course: string;
  studentName: string;
  age: string;
  level: string;
  day: string;
  period: string;
  timezone: string;
  parentName: string;
  whatsapp: string;
  email: string;
  country: string;
  notes: string;
};

const initialData: TrialFormValues = {
  subject: "",
  course: "",
  studentName: "",
  age: "",
  level: "",
  day: "",
  period: "",
  timezone: "",
  parentName: "",
  whatsapp: "",
  email: "",
  country: "",
  notes: "",
};

const steps = ["المادة", "الطالب", "الموعد", "ولي الأمر", "تأكيد الطلب"];

export function TrialForm({ courses }: { courses: Course[] }) {
  const siteSettings = useSiteSettings();
  const searchParams = useSearchParams();
  const selectedCourse = courses.find((course) => course.slug === searchParams.get("course"));
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const idempotencyKey = useRef("");
  const submissionInFlight = useRef(false);
  const [data, setData] = useState<TrialFormValues>(() => ({
    ...initialData,
    course: selectedCourse?.title ?? "",
    subject: selectedCourse?.categoryLabel ?? "",
  }));

  const progress = ((step + 1) / steps.length) * 100;
  const update = (field: keyof TrialFormValues, value: string) => setData((current) => ({ ...current, [field]: value }));
  const availableCourses = useMemo(
    () => courses.filter((course) => !data.subject || course.categoryLabel === data.subject),
    [courses, data.subject],
  );

  const validate = () => {
    if (step === 0 && !data.subject) return "اختَر المادة التي يهتم بها الطالب.";
    if (step === 1 && (!data.studentName.trim() || !data.age || !data.level)) return "أكمل بيانات الطالب الأساسية للمتابعة.";
    if (step === 2 && (!data.day || !data.period || !data.timezone)) return "اختر اليوم والوقت والمنطقة الزمنية المناسبة.";
    if (step === 3 && (!data.parentName.trim() || !data.whatsapp.trim() || !data.country.trim())) return "أدخل اسم ولي الأمر ورقم واتساب والدولة.";
    return "";
  };

  const next = () => {
    const message = validate();
    if (message) return setError(message);
    setError("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
    document.getElementById("trial-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    const values = new window.FormData(event.currentTarget);
    idempotencyKey.current ||= crypto.randomUUID();
    setError("");
    setSubmitting(true);
    try {
      await postToApi<{ message: string; reference: number }>("trial-requests/", {
        ...data,
        website: values.get("website"),
        idempotencyKey: idempotencyKey.current,
      });
      setSubmitted(true);
      idempotencyKey.current = "";
      document.getElementById("trial-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "تعذر إرسال الطلب الآن. حاول مرة أخرى.");
    } finally {
      submissionInFlight.current = false;
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="trial-success" id="trial-form" role="status">
        <div className="success-icon"><Icon name="check" size={38} /></div>
        <span className="eyebrow"><i aria-hidden="true" />تم إرسال طلبك</span>
        <h2>تم استلام طلبك بنجاح 🤍</h2>
        <p>شكرًا لك يا {data.parentName}. سيتواصل معك فريق آفاق عبر واتساب لتأكيد موعد الحصة التجريبية واختيار المعلم المناسب.</p>
        <div className="success-summary">
          <span><small>الطالب</small><strong>{data.studentName}</strong></span>
          <span><small>المادة</small><strong>{data.course || data.subject}</strong></span>
          <span><small>الوقت المفضل</small><strong>{data.day} — {data.period}</strong></span>
        </div>
        <a className="button button-primary" href={whatsappUrl(siteSettings.whatsapp)} target="_blank" rel="noreferrer">تواصل معنا عبر واتساب <Icon name="whatsapp" /></a>
      </div>
    );
  }

  return (
    <form className="trial-form" id="trial-form" onSubmit={submit} noValidate>
      <input aria-hidden="true" autoComplete="off" className="form-honeypot" name="website" tabIndex={-1} type="text" />
      <div className="form-progress-mobile"><span>الخطوة {step + 1} من {steps.length}</span><strong>{steps[step]}</strong><i><b style={{ width: `${progress}%` }} /></i></div>
      <div className="trial-steps" aria-label="خطوات الحجز">
        {steps.map((label, index) => (
          <div className={`${index === step ? "active" : ""} ${index < step ? "done" : ""}`} key={label}>
            <span>{index < step ? <Icon name="check" size={17} /> : index + 1}</span><small>{label}</small>
          </div>
        ))}
      </div>

      <div className="form-panel">
        {step === 0 ? (
          <fieldset>
            <legend><small>الخطوة الأولى</small>ما المادة التي تريد أن يبدأ بها الطالب؟</legend>
            <div className="subject-options">
              {[
                ["اللغة العربية", "ض", "قراءة، محادثة، ونحو"],
                ["القرآن الكريم", "۞", "حفظ، تلاوة، وتجويد"],
                ["التربية الإسلامية", "✦", "عقيدة، فقه، وتدبر"],
              ].map(([label, symbol, text]) => (
                <label className={data.subject === label ? "selected" : ""} key={label}>
                  <input checked={data.subject === label} name="subject" onChange={() => { update("subject", label); update("course", ""); }} type="radio" value={label} />
                  <span aria-hidden="true">{symbol}</span><strong>{label}</strong><small>{text}</small><i><Icon name="check" size={15} /></i>
                </label>
              ))}
            </div>
            {data.subject ? (
              <label className="field full-field"><span>هل لديك كورس محدد؟ <small>اختياري</small></span><select value={data.course} onChange={(event) => update("course", event.target.value)}><option value="">دع فريق آفاق يرشح الأنسب</option>{availableCourses.map((course) => <option value={course.title} key={course.slug}>{course.title}</option>)}</select></label>
            ) : null}
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend><small>الخطوة الثانية</small>عرّفنا إلى الطالب</legend>
            <div className="fields-grid">
              <label className="field full-field"><span>اسم الطالب *</span><input autoComplete="name" value={data.studentName} onChange={(event) => update("studentName", event.target.value)} placeholder="مثال: يوسف أحمد" /></label>
              <label className="field"><span>العمر *</span><select value={data.age} onChange={(event) => update("age", event.target.value)}><option value="">اختر العمر</option>{Array.from({ length: 17 }, (_, index) => index + 4).map((age) => <option value={`${age} سنة`} key={age}>{age} سنوات</option>)}<option value="21 سنة فأكثر">21 سنة فأكثر</option></select></label>
              <label className="field"><span>المستوى التقريبي *</span><select value={data.level} onChange={(event) => update("level", event.target.value)}><option value="">اختر المستوى</option><option>مبتدئ تمامًا</option><option>يعرف الأساسيات</option><option>متوسط</option><option>متقدم</option><option>غير متأكد</option></select></label>
              <label className="field full-field"><span>ملاحظات تساعدنا <small>اختياري</small></span><textarea value={data.notes} onChange={(event) => update("notes", event.target.value)} placeholder="أخبرنا عن هدف الطالب أو أي صعوبة سابقة…" rows={3} /></label>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend><small>الخطوة الثالثة</small>اختر الوقت الأقرب لجدولكم</legend>
            <div className="fields-grid">
              <label className="field"><span>اليوم المفضل *</span><select value={data.day} onChange={(event) => update("day", event.target.value)}><option value="">اختر اليوم</option><option>السبت</option><option>الأحد</option><option>الاثنين</option><option>الثلاثاء</option><option>الأربعاء</option><option>الخميس</option><option>الجمعة</option><option>أي يوم مناسب</option></select></label>
              <label className="field"><span>الفترة المفضلة *</span><select value={data.period} onChange={(event) => update("period", event.target.value)}><option value="">اختر الفترة</option><option>صباحًا</option><option>ظهرًا</option><option>مساءً</option><option>مرن</option></select></label>
              <label className="field full-field"><span>المنطقة الزمنية *</span><select value={data.timezone} onChange={(event) => update("timezone", event.target.value)}><option value="">اختر المنطقة</option><option>توقيت لندن (GMT/BST)</option><option>توقيت باريس وأوروبا الوسطى (CET)</option><option>توقيت شرق أمريكا وكندا (ET)</option><option>توقيت وسط أمريكا وكندا (CT)</option><option>توقيت الخليج (GST)</option><option>توقيت مصر (EET)</option><option>منطقة أخرى — ننسق عبر واتساب</option></select></label>
            </div>
            <p className="form-hint"><Icon name="clock" />هذا تفضيل مبدئي؛ سيتواصل الفريق معك لتأكيد موعد متاح ومناسب.</p>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend><small>الخطوة الرابعة</small>بيانات التواصل مع ولي الأمر</legend>
            <div className="fields-grid">
              <label className="field"><span>اسم ولي الأمر *</span><input autoComplete="name" value={data.parentName} onChange={(event) => update("parentName", event.target.value)} placeholder="الاسم الكامل" /></label>
              <label className="field"><span>رقم واتساب مع كود الدولة *</span><input dir="ltr" inputMode="tel" autoComplete="tel" value={data.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="+44 000 000 0000" /></label>
              <label className="field"><span>البريد الإلكتروني <small>اختياري</small></span><input dir="ltr" type="email" autoComplete="email" value={data.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" /></label>
              <label className="field"><span>الدولة *</span><input autoComplete="country-name" value={data.country} onChange={(event) => update("country", event.target.value)} placeholder="مثال: المملكة المتحدة" /></label>
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <fieldset>
            <legend><small>الخطوة الأخيرة</small>راجع طلب الحصة التجريبية</legend>
            <div className="review-grid">
              <div><small>المادة والكورس</small><strong>{data.course || data.subject}</strong><button type="button" onClick={() => setStep(0)}>تعديل</button></div>
              <div><small>الطالب</small><strong>{data.studentName} — {data.age}</strong><button type="button" onClick={() => setStep(1)}>تعديل</button></div>
              <div><small>الموعد المفضل</small><strong>{data.day}، {data.period}</strong><button type="button" onClick={() => setStep(2)}>تعديل</button></div>
              <div><small>التواصل</small><strong dir="ltr">{data.whatsapp}</strong><button type="button" onClick={() => setStep(3)}>تعديل</button></div>
            </div>
            <label className="consent"><input required type="checkbox" /><span>أوافق على تواصل فريق آفاق معي لتنسيق الحصة، واطلعت على <a href="/privacy" target="_blank">سياسة الخصوصية</a>.</span></label>
          </fieldset>
        ) : null}

        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="form-actions">
          {step > 0 ? <button className="button button-outline" onClick={() => { setError(""); setStep((current) => current - 1); }} type="button">السابق</button> : <span />}
          {step < steps.length - 1 ? <button className="button button-primary" onClick={next} type="button">التالي <Icon name="arrow" /></button> : <button className="button button-primary" disabled={submitting} type="submit">{submitting ? "جاري الإرسال…" : "تأكيد طلب الحصة"} <Icon name="check" /></button>}
        </div>
      </div>
    </form>
  );
}
