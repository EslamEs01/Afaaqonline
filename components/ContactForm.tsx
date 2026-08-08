"use client";

import { FormEvent, useState } from "react";
import { Icon } from "./Icon";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  if (sent) return <div className="contact-success" role="status"><span><Icon name="check" size={30} /></span><h2>وصلتنا رسالتك</h2><p>شكرًا لتواصلك. سيرد عليك فريق آفاق في أقرب وقت خلال ساعات التواصل.</p><button className="button button-outline" onClick={() => setSent(false)} type="button">إرسال رسالة أخرى</button></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="fields-grid">
        <label className="field"><span>الاسم *</span><input required autoComplete="name" placeholder="اسمك الكامل" /></label>
        <label className="field"><span>البريد الإلكتروني *</span><input required dir="ltr" type="email" autoComplete="email" placeholder="name@example.com" /></label>
        <label className="field full-field"><span>موضوع الرسالة *</span><select required defaultValue=""><option value="" disabled>اختر موضوعًا</option><option>الاستفسار عن الكورسات</option><option>الحصة التجريبية</option><option>المواعيد والدفع</option><option>ملاحظة أو اقتراح</option><option>موضوع آخر</option></select></label>
        <label className="field full-field"><span>رسالتك *</span><textarea required rows={5} placeholder="اكتب سؤالك أو ما يمكننا مساعدتك فيه…" /></label>
      </div>
      <button className="button button-primary" type="submit">إرسال الرسالة <Icon name="arrow" /></button>
    </form>
  );
}

