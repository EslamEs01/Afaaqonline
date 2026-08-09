import re

from rest_framework import serializers

from .models import ContactMessage, Course, FAQ, SiteSettings, Testimonial, TrialRequest


def create_idempotent_submission(submission_model, validated_fields):
    submission_key = validated_fields.pop("submission_key", None)
    if not submission_key:
        return submission_model.objects.create(**validated_fields), True
    return submission_model.objects.get_or_create(
        submission_key=submission_key,
        defaults=validated_fields,
    )


class CourseSerializer(serializers.ModelSerializer):
    categoryLabel = serializers.CharField(source="get_category_display", read_only=True)
    age = serializers.CharField(source="age_group", read_only=True)
    lessonLength = serializers.CharField(source="lesson_length", read_only=True)
    isFeatured = serializers.BooleanField(source="is_featured", read_only=True)

    class Meta:
        model = Course
        fields = (
            "slug",
            "title",
            "category",
            "categoryLabel",
            "summary",
            "description",
            "age",
            "level",
            "duration",
            "lessonLength",
            "goals",
            "outcomes",
            "accent",
            "isFeatured",
        )


class TestimonialSerializer(serializers.ModelSerializer):
    meta = serializers.CharField(source="location", read_only=True)

    class Meta:
        model = Testimonial
        fields = ("quote", "name", "meta", "initials", "rating")


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ("question", "answer")


class SiteSettingsSerializer(serializers.ModelSerializer):
    academyName = serializers.CharField(source="academy_name", read_only=True)
    siteUrl = serializers.URLField(source="site_url", read_only=True)
    contactHours = serializers.CharField(source="contact_hours", read_only=True)
    facebookUrl = serializers.URLField(source="facebook_url", read_only=True)
    instagramUrl = serializers.URLField(source="instagram_url", read_only=True)
    youtubeUrl = serializers.URLField(source="youtube_url", read_only=True)

    class Meta:
        model = SiteSettings
        fields = (
            "academyName",
            "slogan",
            "siteUrl",
            "email",
            "phone",
            "whatsapp",
            "contactHours",
            "facebookUrl",
            "instagramUrl",
            "youtubeUrl",
        )


class SpamProtectedSerializer(serializers.Serializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    def validate_website(self, value: str) -> str:
        if value.strip():
            raise serializers.ValidationError("تعذر إرسال الطلب.")
        return value


class TrialRequestSerializer(SpamProtectedSerializer, serializers.ModelSerializer):
    idempotencyKey = serializers.UUIDField(source="submission_key", required=False, write_only=True)
    studentName = serializers.CharField(source="student_name", max_length=180)
    day = serializers.CharField(source="preferred_day", max_length=80)
    period = serializers.CharField(source="preferred_period", max_length=80)
    parentName = serializers.CharField(source="parent_name", max_length=180)
    email = serializers.EmailField(required=False, allow_blank=True)
    course = serializers.CharField(required=False, allow_blank=True, max_length=180)
    notes = serializers.CharField(required=False, allow_blank=True, max_length=3000)

    class Meta:
        model = TrialRequest
        fields = (
            "id",
            "subject",
            "course",
            "studentName",
            "age",
            "level",
            "day",
            "period",
            "timezone",
            "parentName",
            "whatsapp",
            "email",
            "country",
            "notes",
            "idempotencyKey",
            "website",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def validate_whatsapp(self, value: str) -> str:
        cleaned = value.strip()
        digits = re.sub(r"\D", "", cleaned)
        if not 8 <= len(digits) <= 15:
            raise serializers.ValidationError("أدخل رقم واتساب صحيحًا مع كود الدولة.")
        return cleaned

    def create(self, validated_data):
        validated_data.pop("website", None)
        submission, self.created_new = create_idempotent_submission(TrialRequest, validated_data)
        return submission


class ContactMessageSerializer(SpamProtectedSerializer, serializers.ModelSerializer):
    idempotencyKey = serializers.UUIDField(source="submission_key", required=False, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ("id", "name", "email", "subject", "message", "idempotencyKey", "website", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_message(self, value: str) -> str:
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("اكتب تفاصيل أكثر حتى نتمكن من مساعدتك.")
        return value

    def create(self, validated_data):
        validated_data.pop("website", None)
        submission, self.created_new = create_idempotent_submission(ContactMessage, validated_data)
        return submission
