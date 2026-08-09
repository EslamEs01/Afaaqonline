import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from academy.models import Course, FAQ, SiteSettings


FAQS = [
    ("ما الأعمار التي تستقبلها الأكاديمية؟", "نستقبل الطلاب من عمر أربع سنوات وحتى الكبار، وتُبنى الخطة حسب عمر الطالب ومستواه وهدفه."),
    ("هل الدروس فردية؟", "نعم، الدروس الأساسية مباشرة وفردية 1:1 بين المعلم والطالب لضمان الاهتمام الكامل والتفاعل المستمر."),
    ("كيف يتم تحديد مستوى الطالب؟", "نبدأ بالحصة التجريبية للتعرف إلى الطالب وقياس مهاراته، ثم نرشح البرنامج ونقطة البداية المناسبة."),
    ("هل توجد حصة تجريبية؟", "نعم، يمكنك حجز حصة تجريبية مجانية من الموقع، وسيتواصل معك الفريق لتأكيد الموعد."),
    ("كيف يتم اختيار المعلم؟", "نختار المعلم وفق المادة وعمر الطالب ومستواه واحتياجه، مع مراعاة أسلوب التعلم والتوافق في الموعد."),
    ("ما مدة الحصة؟", "تكون الحصة عادة 30 أو 45 أو 60 دقيقة حسب عمر الطالب والبرنامج ومستوى التركيز المناسب له."),
    ("ما المواد المتاحة؟", "نقدم اللغة العربية، وقراءة القرآن وحفظه وتجويده، والتربية الإسلامية بما يشمل العقيدة والفقه والتدبر."),
    ("هل يمكن تغيير موعد الحصة؟", "يمكن تنسيق تغيير الموعد مع الفريق وفق سياسة الحجز والمواعيد المتاحة للمعلم والطالب."),
    ("كيف تتم عملية الدفع؟", "يوضح لك فريق آفاق تفاصيل الباقة وطريقة الدفع المناسبة بعد تحديد المستوى والبرنامج والجدول."),
    ("كيف يمكن متابعة مستوى الطالب؟", "يتابع المعلم تقدم الطالب ويشارك الأسرة بالملاحظات والأهداف المنجزة وما يحتاج إلى مراجعة."),
]


class Command(BaseCommand):
    help = "إنشاء أو تحديث بيانات أكاديمية آفاق الأساسية بصورة آمنة ومتكررة"

    @transaction.atomic
    def handle(self, *args, **options):
        seed_path = Path(__file__).resolve().parents[2] / "seed" / "courses.json"
        courses = json.loads(seed_path.read_text(encoding="utf-8"))
        featured_slugs = {"arabic-letters", "juz-al-naba", "aqeedah-for-kids"}

        for index, item in enumerate(courses, start=1):
            Course.objects.update_or_create(
                slug=item["slug"],
                defaults={
                    "title": item["title"],
                    "category": item["category"],
                    "summary": item["summary"],
                    "description": item["description"],
                    "age_group": item["age"],
                    "level": item["level"],
                    "duration": item["duration"],
                    "lesson_length": item["lessonLength"],
                    "goals": item["goals"],
                    "outcomes": item["outcomes"],
                    "accent": item["accent"],
                    "is_featured": item["slug"] in featured_slugs,
                    "is_active": True,
                    "sort_order": index,
                },
            )

        for index, (question, answer) in enumerate(FAQS, start=1):
            FAQ.objects.update_or_create(
                question=question,
                defaults={"answer": answer, "is_active": True, "sort_order": index},
            )

        SiteSettings.objects.get_or_create(
            pk=1,
            defaults={
                "academy_name": "أكاديمية آفاق",
                "slogan": "نرسّخ الهوية ونبني المستقبل",
                "site_url": "https://afaaqinstitute.com",
                "email": "afaaqinstitute@gmail.com",
                "phone": "+20 104 139 1631",
                "whatsapp": "201041391631",
                "contact_hours": "يوميًا من 10 صباحًا حتى 10 مساءً بتوقيت القاهرة",
            },
        )

        self.stdout.write(self.style.SUCCESS(f"تم تجهيز {len(courses)} كورسًا و{len(FAQS)} أسئلة شائعة."))
