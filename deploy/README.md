# نشر أكاديمية آفاق على VPS

الموقع المعتمد هو `https://afaaqinstitute.com`، مع تحويل دائم من `www.afaaqinstitute.com`. تستخدم المنظومة موارد مخصصة لا تشاركها أي مشاريع أخرى:

- المشروع: `/var/www/afaaqinstitute`
- PostgreSQL: قاعدة ومستخدم `afaaqinstitute`
- Django/Gunicorn: `127.0.0.1:8001` عبر `afaaqinstitute-backend.service`
- Vinext/React: `127.0.0.1:3000` عبر `afaaqinstitute-frontend.service`
- Nginx: موقع `afaaqinstitute`

## التجهيز الأول

1. افحص السيرفر وDNS والمنافذ أولًا، ولا تغيّر أي مشروع آخر.
2. ضع نسخة `origin/main` المطابقة للـ SHA المطلوب في `/var/www/afaaqinstitute`.
3. أنشئ قاعدة PostgreSQL ومستخدم `afaaqinstitute` بصلاحيات القاعدة وحدها.
4. أنشئ `.env` و`backend/.env` من الأمثلة، وضع الأسرار في الملفين فقط بصلاحية `600`.
5. ثبّت ملفات systemd التي تبدأ باسم `afaaqinstitute-`، ثم نفّذ `systemctl daemon-reload`.
6. ثبّت `deploy/nginx/afaaqinstitute-http.conf` مؤقتًا حتى إصدار الشهادة، واختبره بـ `nginx -t` قبل reload.
7. نفّذ `deploy/update.sh` مع `AFQ_SKIP_RESTART=true` لأول مرة، ثم فعّل خدمتي الواجهة والباك إند فقط.
8. بعد تحقق DNS، أصدر شهادة للدومينين وثبّت `deploy/nginx/afaaqinstitute.conf` النهائي.
9. لا ترفع HSTS في `backend/.env` من `0` إلى `31536000` إلا بعد نجاح HTTPS خارجيًا.

## تحديث آمن

```bash
sudo AFQ_PROJECT_ROOT=/var/www/afaaqinstitute /var/www/afaaqinstitute/deploy/update.sh
```

السكريبت يستخدم `git pull --ff-only`، ثم يثبت الحزم المقفلة ويبني الواجهة ويفحص Django والمهاجرات قبل ترحيل البيانات وتشغيل seed وجمع الملفات الثابتة. يعيد تشغيل خدمتي آفاق فقط.

## النسخ الاحتياطي

ثبّت `afaaqinstitute-backup.service` و`afaaqinstitute-backup.timer` ثم فعّل المؤقت. تحفظ النسخ المضغوطة بصلاحيات مقيدة في `/var/backups/afaaqinstitute` لمدة سبعة أيام.

اختبار نسخة غير مدمر:

```bash
sudo systemctl start afaaqinstitute-backup.service
sudo systemctl status afaaqinstitute-backup.service --no-pager
sudo find /var/backups/afaaqinstitute -maxdepth 1 -type f -name 'afaaqinstitute-*.dump' -size +0 -print
```

أمر الاستعادة الموثق فقط — لا تنفذه على قاعدة الإنتاج الحالية:

```bash
sudo -u postgres pg_restore --clean --if-exists --dbname=TARGET_DATABASE /var/backups/afaaqinstitute/ARCHIVE.dump
```

## روابط التشغيل

- الموقع: `https://afaaqinstitute.com/`
- الإدارة: `https://afaaqinstitute.com/admin/`
- الصحة: `https://afaaqinstitute.com/api/health/`
