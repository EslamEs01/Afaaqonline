import uuid

from django.contrib.auth import get_user_model
from django.contrib.staticfiles.storage import staticfiles_storage
from django.core.management import call_command
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient

from academy.models import ContactMessage, Course, FAQ, SiteSettings, Testimonial, TrialRequest


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class PublicApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = Course.objects.create(
            slug="arabic-letters",
            title="حروفي العربية",
            category=Course.Category.ARABIC,
            summary="وصف مختصر",
            description="وصف كامل",
            age_group="4–8 سنوات",
            level="مبتدئ",
            duration="12 أسبوعًا",
            lesson_length="30 دقيقة",
            goals=["الهدف الأول"],
            outcomes=["النتيجة الأولى"],
        )

    def test_health_endpoint(self):
        response = self.client.get(reverse("academy:health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_course_list_uses_frontend_field_names(self):
        response = self.client.get(reverse("academy:course-list"))
        self.assertEqual(response.status_code, 200)
        course = response.json()[0]
        self.assertEqual(course["categoryLabel"], "اللغة العربية")
        self.assertEqual(course["lessonLength"], "30 دقيقة")
        self.assertEqual(course["age"], "4–8 سنوات")

    def test_inactive_course_is_not_public(self):
        self.course.is_active = False
        self.course.save(update_fields=["is_active"])
        response = self.client.get(reverse("academy:course-detail", kwargs={"slug": self.course.slug}))
        self.assertEqual(response.status_code, 404)

    def test_only_approved_testimonials_are_public(self):
        Testimonial.objects.create(name="معتمد", quote="تجربة حقيقية", is_approved=True)
        Testimonial.objects.create(name="غير معتمد", quote="لا يظهر", is_approved=False)
        response = self.client.get(reverse("academy:testimonial-list"))
        self.assertEqual([item["name"] for item in response.json()], ["معتمد"])

    def test_only_active_faqs_are_public(self):
        FAQ.objects.create(question="سؤال ظاهر", answer="إجابة", is_active=True)
        FAQ.objects.create(question="سؤال مخفي", answer="إجابة", is_active=False)
        response = self.client.get(reverse("academy:faq-list"))
        self.assertEqual([item["question"] for item in response.json()], ["سؤال ظاهر"])

    def test_site_settings_exposes_admin_managed_page_content(self):
        SiteSettings.objects.create(
            home_hero_eyebrow="عنوان رئيسي من الإدارة",
            vision_title="رؤية محدثة من الإدارة",
            footer_description="وصف تذييل محدث من الإدارة",
        )

        response = self.client.get(reverse("academy:site-settings"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["homeHeroEyebrow"], "عنوان رئيسي من الإدارة")
        self.assertEqual(response.json()["visionTitle"], "رؤية محدثة من الإدارة")
        self.assertEqual(response.json()["footerDescription"], "وصف تذييل محدث من الإدارة")

    def test_trial_request_is_stored(self):
        payload = {
            "subject": "اللغة العربية",
            "course": "حروفي العربية",
            "studentName": "يوسف أحمد",
            "age": "8 سنوات",
            "level": "مبتدئ تمامًا",
            "day": "السبت",
            "period": "مساءً",
            "timezone": "توقيت لندن",
            "parentName": "أحمد محمد",
            "whatsapp": "+44 7700 900123",
            "email": "parent@example.com",
            "country": "المملكة المتحدة",
            "notes": "يريد تحسين القراءة",
            "website": "",
        }
        response = self.client.post(reverse("academy:trial-request-create"), payload, format="json")
        self.assertEqual(response.status_code, 201, response.json())
        self.assertEqual(TrialRequest.objects.get().student_name, "يوسف أحمد")
        self.assertEqual(response.json()["reference"], TrialRequest.objects.get().pk)

    def test_trial_request_retry_is_idempotent(self):
        payload = {
            "subject": "اللغة العربية",
            "studentName": "يوسف أحمد",
            "age": "8 سنوات",
            "level": "مبتدئ",
            "day": "السبت",
            "period": "مساءً",
            "timezone": "توقيت القاهرة",
            "parentName": "أحمد محمد",
            "whatsapp": "+20 104 139 1631",
            "country": "مصر",
            "idempotencyKey": str(uuid.uuid4()),
        }
        first_response = self.client.post(reverse("academy:trial-request-create"), payload, format="json")
        retry_response = self.client.post(reverse("academy:trial-request-create"), payload, format="json")
        self.assertEqual(first_response.status_code, 201)
        self.assertEqual(retry_response.status_code, 200)
        self.assertEqual(first_response.json()["reference"], retry_response.json()["reference"])
        self.assertEqual(TrialRequest.objects.count(), 1)

    def test_trial_request_rejects_invalid_phone(self):
        payload = {
            "subject": "القرآن الكريم",
            "studentName": "آدم",
            "age": "7 سنوات",
            "level": "مبتدئ",
            "day": "الأحد",
            "period": "صباحًا",
            "timezone": "توقيت القاهرة",
            "parentName": "محمد",
            "whatsapp": "123",
            "country": "مصر",
        }
        response = self.client.post(reverse("academy:trial-request-create"), payload, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(TrialRequest.objects.count(), 0)

    def test_contact_message_is_stored(self):
        response = self.client.post(
            reverse("academy:contact-message-create"),
            {
                "name": "أحمد",
                "email": "ahmed@example.com",
                "subject": "الاستفسار عن الكورسات",
                "message": "أريد معرفة تفاصيل البرنامج المناسب لابني.",
                "website": "",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201, response.json())
        self.assertEqual(ContactMessage.objects.get().name, "أحمد")

    def test_contact_message_retry_is_idempotent(self):
        payload = {
            "name": "أحمد",
            "email": "ahmed@example.com",
            "subject": "الاستفسار عن الكورسات",
            "message": "أريد معرفة تفاصيل البرنامج المناسب لابني.",
            "idempotencyKey": str(uuid.uuid4()),
        }
        first_response = self.client.post(reverse("academy:contact-message-create"), payload, format="json")
        retry_response = self.client.post(reverse("academy:contact-message-create"), payload, format="json")
        self.assertEqual(first_response.status_code, 201)
        self.assertEqual(retry_response.status_code, 200)
        self.assertEqual(first_response.json()["reference"], retry_response.json()["reference"])
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_honeypot_rejects_automated_submission(self):
        response = self.client.post(
            reverse("academy:contact-message-create"),
            {
                "name": "Robot",
                "email": "robot@example.com",
                "subject": "Spam",
                "message": "This is an automated spam message.",
                "website": "https://spam.example",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)


class SeedCommandTests(TestCase):
    def test_seed_is_idempotent_and_preserves_managed_data(self):
        trial = TrialRequest.objects.create(
            subject="القرآن الكريم",
            student_name="طالب حقيقي",
            age="10 سنوات",
            level="متوسط",
            preferred_day="الأحد",
            preferred_period="مساءً",
            timezone="توقيت القاهرة",
            parent_name="ولي أمر",
            whatsapp="201000000000",
            country="مصر",
            status=TrialRequest.Status.CONTACTED,
            admin_notes="ملاحظة فريق حقيقية",
        )
        message = ContactMessage.objects.create(
            name="عميل حقيقي",
            email="client@example.com",
            subject="استفسار حقيقي",
            message="هذه رسالة عميل حقيقية لا يجب تعديلها.",
            status=ContactMessage.Status.IN_PROGRESS,
            admin_notes="تتم المتابعة",
        )

        call_command("seed_afaaq", verbosity=0)
        first_counts = (Course.objects.count(), FAQ.objects.count(), SiteSettings.objects.count())
        site_settings = SiteSettings.objects.get()
        site_settings.phone = "+20 100 000 0000"
        site_settings.home_hero_eyebrow = "عنوان رئيسي عدّله المدير"
        site_settings.save(update_fields=["phone", "home_hero_eyebrow"])
        call_command("seed_afaaq", verbosity=0)

        self.assertEqual(first_counts, (13, 10, 1))
        self.assertEqual((Course.objects.count(), FAQ.objects.count(), SiteSettings.objects.count()), first_counts)
        site_settings.refresh_from_db()
        trial.refresh_from_db()
        message.refresh_from_db()
        self.assertEqual(site_settings.phone, "+20 100 000 0000")
        self.assertEqual(site_settings.home_hero_eyebrow, "عنوان رئيسي عدّله المدير")
        self.assertEqual((trial.status, trial.admin_notes), (TrialRequest.Status.CONTACTED, "ملاحظة فريق حقيقية"))
        self.assertEqual((message.status, message.admin_notes), (ContactMessage.Status.IN_PROGRESS, "تتم المتابعة"))


@override_settings(
    STORAGES={
        "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
        "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
    }
)
class AdminBrandingTests(TestCase):
    def test_jazzmin_login_and_dashboard_render_with_light_arabic_branding(self):
        login = self.client.get("/admin/login/")
        self.assertEqual(login.status_code, 200)
        self.assertContains(login, "أكاديمية آفاق")
        self.assertContains(login, "|| 'light'")

        user = get_user_model().objects.create_superuser(
            username="admin-test",
            email="admin@example.com",
            password="temporary-test-password-only",
        )
        self.client.force_login(user)
        dashboard = self.client.get("/admin/")
        self.assertEqual(dashboard.status_code, 200)
        self.assertContains(dashboard, "لوحة إدارة أكاديمية آفاق")
        self.assertContains(dashboard, "app-sidebar bg-body-secondary shadow bg-white")


class StaticStorageTests(TestCase):
    def test_jazzmin_bootswatch_directory_has_a_manifest_safe_url(self):
        self.assertEqual(staticfiles_storage.url("vendor/bootswatch"), "/static/vendor/bootswatch")
