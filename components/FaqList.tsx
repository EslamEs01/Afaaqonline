"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faqs";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map(({ question, answer }, index) => (
        <article className={open === index ? "open" : ""} key={question}>
          <h2><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} type="button"><span>{question}</span><i aria-hidden="true">+</i></button></h2>
          <div className="faq-answer" hidden={open !== index}><p>{answer}</p></div>
        </article>
      ))}
    </div>
  );
}
