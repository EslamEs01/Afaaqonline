"use client";

import { FormEvent, useRef, useState } from "react";
import { postToApi } from "@/lib/client-api";
import { Icon } from "./Icon";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const idempotencyKey = useRef("");
  const submissionInFlight = useRef(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    const form = event.currentTarget;
    const values = new FormData(form);
    idempotencyKey.current ||= crypto.randomUUID();
    setSending(true);
    setError("");
    try {
      await postToApi<{ message: string; reference: number }>("contact-messages/", {
        name: values.get("name"),
        email: values.get("email"),
        subject: values.get("subject"),
        message: values.get("message"),
        website: values.get("website"),
        idempotencyKey: idempotencyKey.current,
      });
      setSent(true);
      idempotencyKey.current = "";
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "تعذر إرسال الرسالة الآن. حاول مرة أخرى.");
    } finally {
      submissionInFlight.current = false;
      setSending(false);
    }
  };
  if (sent) return <div className="contact-success" role="status"><span><Icon name="check" size={30} /></span><h2>وصلتنا رسالتك</h2><p>شكرًا لتواصلك. سيرد عليك فريق آفاق في أقرب وقت خلال ساعات التواصل.</p><button className="button button-outline" onClick={() => setSent(false)} type="button">إرسال رسالة أخرى</button></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <input aria-hidden="true" autoComplete="off" className="form-honeypot" name="website" tabIndex={-1} type="text" />
      <div className="fields-grid">
        <label className="field"><span>الاسم *</span><input required name="name" autoComplete="name" placeholder="اسمك الكامل" /></label>
        <label className="field"><span>البريد الإلكتروني *</span><input required name="email" dir="ltr" type="email" autoComplete="email" placeholder="name@example.com" /></label>
        <label className="field full-field"><span>موضوع الرسالة *</span><select required name="subject" defaultValue=""><option value="" disabled>اختر موضوعًا</option><option>الاستفسار عن الكورسات</option><option>الحصة التجريبية</option><option>المواعيد والدفع</option><option>ملاحظة أو اقتراح</option><option>موضوع آخر</option></select></label>
        <label className="field full-field"><span>رسالتك *</span><textarea required name="message" minLength={10} rows={5} placeholder="اكتب سؤالك أو ما يمكننا مساعدتك فيه…" /></label>
      </div>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button button-primary" disabled={sending} type="submit">{sending ? "جاري الإرسال…" : "إرسال الرسالة"} <Icon name="arrow" /></button>
    </form>
  );
}
