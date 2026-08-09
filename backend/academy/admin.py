from django.contrib import admin

from .models import ContactMessage, Course, FAQ, SiteSettings, Testimonial, TrialRequest


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "age_group", "level", "duration", "is_featured", "is_active", "sort_order")
    list_filter = ("category", "is_featured", "is_active")
    search_fields = ("title", "slug", "summary", "description", "goals", "outcomes")
    list_editable = ("is_featured", "is_active", "sort_order")
    ordering = ("sort_order", "id")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("بيانات الكورس", {"fields": ("title", "slug", "category", "summary", "description")}),
        ("الخطة التعليمية", {"fields": ("age_group", "level", "duration", "lesson_length", "goals", "outcomes")}),
        ("العرض في الموقع", {"fields": ("accent", "is_featured", "is_active", "sort_order")}),
        ("سجل التحديث", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "rating", "is_approved", "sort_order", "created_at")
    list_filter = ("rating", "is_approved")
    search_fields = ("name", "location", "quote")
    list_editable = ("is_approved", "sort_order")
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    fieldsets = (
        ("الرأي المعتمد", {"fields": ("name", "location", "initials", "quote", "rating")}),
        ("النشر", {"fields": ("is_approved", "sort_order")}),
        ("سجل التحديث", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "is_active", "sort_order")
    list_filter = ("is_active",)
    search_fields = ("question", "answer")
    list_editable = ("is_active", "sort_order")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("السؤال والإجابة", {"fields": ("question", "answer")}),
        ("العرض في الموقع", {"fields": ("is_active", "sort_order")}),
        ("سجل التحديث", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )


@admin.register(TrialRequest)
class TrialRequestAdmin(admin.ModelAdmin):
    list_display = (
        "student_name",
        "parent_name",
        "subject",
        "country",
        "whatsapp",
        "status",
        "created_at",
    )
    list_filter = ("status", "subject", "country", "created_at")
    search_fields = ("student_name", "parent_name", "whatsapp", "email")
    readonly_fields = ("submission_key", "created_at", "updated_at", "source_ip", "user_agent")
    date_hierarchy = "created_at"
    fieldsets = (
        ("الطالب", {"fields": ("student_name", "age", "level", "subject", "course", "notes")}),
        ("الموعد", {"fields": ("preferred_day", "preferred_period", "timezone")}),
        ("ولي الأمر", {"fields": ("parent_name", "whatsapp", "email", "country")}),
        ("المتابعة", {"fields": ("status", "admin_notes")}),
        ("بيانات تقنية", {"classes": ("collapse",), "fields": ("submission_key", "source_ip", "user_agent", "created_at", "updated_at")}),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "subject", "email", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("submission_key", "created_at", "updated_at", "source_ip", "user_agent")
    date_hierarchy = "created_at"
    fieldsets = (
        ("المرسل", {"fields": ("name", "email")}),
        ("الرسالة", {"fields": ("subject", "message")}),
        ("المتابعة", {"fields": ("status", "admin_notes")}),
        ("بيانات تقنية", {"classes": ("collapse",), "fields": ("submission_key", "source_ip", "user_agent", "created_at", "updated_at")}),
    )


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("الهوية", {"fields": ("academy_name", "slogan", "site_url")}),
        ("التواصل", {"fields": ("email", "phone", "whatsapp", "contact_hours")}),
        ("التواصل الاجتماعي", {"fields": ("facebook_url", "instagram_url", "youtube_url")}),
        ("سجل التحديث", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
