import { Icon } from "./Icon";

export function FloatingWhatsApp() {
  return (
    <a
      aria-label="تواصل مع أكاديمية آفاق عبر واتساب"
      className="floating-whatsapp"
      href="https://wa.me/201041391631?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A2%D9%81%D8%A7%D9%82%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC."
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="whatsapp" size={27} />
      <span>تواصل معنا</span>
    </a>
  );
}

