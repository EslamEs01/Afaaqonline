# أكاديمية آفاق — Afaaq Academy

موقع عربي كامل لأكاديمية آفاق بواجهة Vinext/React وباك إند Django، مبني بهوية أصلية مستخرجة من الشعار الرسمي ومهيأ للنشر على VPS.

## التقنية

- Vinext / React 19 / TypeScript
- Tailwind CSS 4 مع نظام تصميم مخصص
- Alexandria Variable محليًا؛ لا يعتمد الخط على CDN
- RTL عربي كامل ومتجاوب مع الهاتف والتابلت والكمبيوتر
- صور WebP محلية محسّنة، دون hotlinks خارجية
- Django 5.2 + Django REST Framework
- PostgreSQL في الإنتاج وSQLite للتطوير المحلي
- لوحة Django Jazzmin عربية للكورسات والأسئلة والآراء والطلبات وإعدادات التواصل

## التشغيل

```bash
npm install
npm run dev
```

يفتح المشروع افتراضيًا عبر خادم التطوير الذي يظهره الأمر.

لتشغيل الباك إند محليًا في Terminal آخر:

```bash
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.lock.txt
backend/.venv/bin/python backend/manage.py migrate
backend/.venv/bin/python backend/manage.py seed_afaaq
backend/.venv/bin/python backend/manage.py runserver
```

انسخ `.env.example` إلى `.env.local` حتى ترسل الواجهة المحلية إلى Django على المنفذ 8000.

## الصفحات

- `/` الرئيسية
- `/about` من نحن
- `/courses` البرامج والكورسات مع تصفية تفاعلية
- `/courses/[slug]` ثلاث عشرة صفحة كورس مستقلة
- `/private-lessons` الدروس الفردية
- `/free-trial` نموذج حجز متعدد الخطوات
- `/contact` تواصل معنا
- `/faq` الأسئلة الشائعة
- `/privacy` سياسة الخصوصية
- `/terms` الشروط والأحكام
- صفحة 404 مخصصة

## بيانات التواصل المعتمدة

- Domain: `https://afaaqinstitute.com`
- WhatsApp / Phone: `+20 104 139 1631`
- Email: `afaaqinstitute@gmail.com`

## الباك إند

نماذج الحصة التجريبية والتواصل مرتبطة فعليًا بالـ API ولا تعرض رسالة النجاح قبل حفظ الطلب. تتوفر إدارة الكورسات والأسئلة وآراء العملاء وبيانات التواصل من `/admin/`، ولا تُعرض آراء العملاء إلا بعد اعتمادها من الإدارة.

بيانات الكورسات الحالية والأسئلة الأساسية تُجهز بأمر `seed_afaaq` المتكرر بأمان. لا يضيف الأمر آراء عملاء تجريبية؛ يجب إدخال الآراء الحقيقية واعتمادها من لوحة الإدارة.

## الفحص

```bash
npm run lint
npm run build
npm run validate:artifact
backend/.venv/bin/python backend/manage.py test academy.tests
```

راجع [دليل الهوية](docs/brand-guidelines.md) قبل تعديل الألوان أو الخط أو الصور.
راجع [دليل النشر](deploy/README.md) قبل تجهيز الـ VPS.
راجع [دليل تسليم العميل](docs/CLIENT_HANDOVER.md) لإدارة المحتوى والتشغيل والنسخ الاحتياطي.
