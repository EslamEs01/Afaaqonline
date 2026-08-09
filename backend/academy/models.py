import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField("تاريخ الإنشاء", auto_now_add=True)
    updated_at = models.DateTimeField("آخر تحديث", auto_now=True)

    class Meta:
        abstract = True


class Course(TimestampedModel):
    class Category(models.TextChoices):
        ARABIC = "arabic", "اللغة العربية"
        QURAN = "quran", "القرآن الكريم"
        ISLAMIC = "islamic", "التربية الإسلامية"

    class Accent(models.TextChoices):
        MINT = "mint", "أخضر فاتح"
        GOLD = "gold", "ذهبي"
        SKY = "sky", "سماوي"
        ROSE = "rose", "وردي هادئ"
        LAVENDER = "lavender", "بنفسجي هادئ"
        EMERALD = "emerald", "زمردي"

    slug = models.SlugField("الرابط المختصر", max_length=120, unique=True)
    title = models.CharField("اسم الكورس", max_length=180)
    category = models.CharField("التصنيف", max_length=20, choices=Category.choices, db_index=True)
    summary = models.CharField("الوصف المختصر", max_length=320)
    description = models.TextField("الوصف الكامل")
    age_group = models.CharField("الفئة العمرية", max_length=100)
    level = models.CharField("المستوى", max_length=100)
    duration = models.CharField("مدة البرنامج", max_length=120)
    lesson_length = models.CharField("مدة الحصة", max_length=100)
    goals = models.JSONField("أهداف الكورس", default=list)
    outcomes = models.JSONField("النتائج المتوقعة", default=list)
    accent = models.CharField("لون البطاقة", max_length=20, choices=Accent.choices, default=Accent.MINT)
    is_featured = models.BooleanField("كورس مميز", default=False)
    is_active = models.BooleanField("ظاهر في الموقع", default=True, db_index=True)
    sort_order = models.PositiveSmallIntegerField("الترتيب", default=0)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "كورس"
        verbose_name_plural = "الكورسات"

    def __str__(self) -> str:
        return self.title


class Testimonial(TimestampedModel):
    quote = models.TextField("التقييم")
    name = models.CharField("الاسم الظاهر", max_length=120)
    location = models.CharField("الدولة أو الوصف", max_length=120, blank=True)
    initials = models.CharField("الحروف المختصرة", max_length=3, blank=True)
    rating = models.PositiveSmallIntegerField(
        "التقييم من 5", default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_approved = models.BooleanField("معتمد للنشر", default=False, db_index=True)
    sort_order = models.PositiveSmallIntegerField("الترتيب", default=0)

    class Meta:
        ordering = ("sort_order", "-created_at")
        verbose_name = "رأي عميل"
        verbose_name_plural = "آراء العملاء"

    def __str__(self) -> str:
        return self.name


class FAQ(TimestampedModel):
    question = models.CharField("السؤال", max_length=300)
    answer = models.TextField("الإجابة")
    is_active = models.BooleanField("ظاهر في الموقع", default=True, db_index=True)
    sort_order = models.PositiveSmallIntegerField("الترتيب", default=0)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "سؤال شائع"
        verbose_name_plural = "الأسئلة الشائعة"

    def __str__(self) -> str:
        return self.question


class SiteSettings(TimestampedModel):
    academy_name = models.CharField("اسم الأكاديمية", max_length=120, default="أكاديمية آفاق")
    slogan = models.CharField("الشعار النصي", max_length=180, default="نرسّخ الهوية ونبني المستقبل")
    site_url = models.URLField("رابط الموقع", default="https://afaaqinstitute.com")
    email = models.EmailField("البريد الإلكتروني", default="afaaqinstitute@gmail.com")
    phone = models.CharField("رقم الهاتف", max_length=40, default="+20 104 139 1631")
    whatsapp = models.CharField("رقم واتساب الدولي", max_length=40, default="201041391631")
    contact_hours = models.CharField(
        "أوقات التواصل", max_length=220, default="يوميًا من 10 صباحًا حتى 10 مساءً بتوقيت القاهرة"
    )
    facebook_url = models.URLField("فيسبوك", blank=True)
    instagram_url = models.URLField("إنستجرام", blank=True)
    youtube_url = models.URLField("يوتيوب", blank=True)
    home_hero_eyebrow = models.CharField("عبارة أعلى عنوان الرئيسية", max_length=180, default="أكاديمية عربية لكل بيت")
    home_hero_title_prefix = models.CharField("بداية عنوان الرئيسية", max_length=120, default="نرسّخ")
    home_hero_title_highlight = models.CharField("الكلمة المميزة في عنوان الرئيسية", max_length=120, default="الهوية")
    home_hero_title_suffix = models.CharField("نهاية عنوان الرئيسية", max_length=180, default="ونبني المستقبل")
    home_hero_description = models.TextField(
        "وصف واجهة الرئيسية",
        default=(
            "تعليم العربية والقرآن والتربية الإسلامية بطريقة فردية تفاعلية تناسب أبناءنا في كل مكان، "
            "وتمنح الأسرة راحة وثقة في رحلة التعلّم."
        ),
    )
    about_hero_description = models.TextField(
        "وصف واجهة من نحن",
        default="أكاديمية تعليمية وُجدت لتقرب أبناءنا من لغتهم وقرآنهم وهويتهم، أينما كانت بيوتهم.",
    )
    about_heading_prefix = models.CharField(
        "بداية عنوان من نحن", max_length=220, default="التعليم ليس معلومات فقط، بل"
    )
    about_heading_highlight = models.CharField("العبارة المميزة في عنوان من نحن", max_length=180, default="جسر إلى الهوية")
    about_body_primary = models.TextField(
        "الفقرة الأولى في من نحن",
        default=(
            "نساعد الأطفال والطلاب العرب والمسلمين المقيمين خارج العالم العربي على الارتباط بلغتهم "
            "ودينهم، من خلال برامج أُعدت بعناية لتناسب العمر والمستوى وطبيعة التعلم أونلاين."
        ),
    )
    about_body_secondary = models.TextField(
        "الفقرة الثانية في من نحن",
        default=(
            "نؤمن أن جودة التعليم تبدأ بفهم الطالب، وأن الثقة تُبنى عندما يرى ولي الأمر خطة واضحة "
            "وتقدمًا حقيقيًا واهتمامًا مستمرًا."
        ),
    )
    vision_title = models.CharField("عنوان الرؤية", max_length=220, default="جيل يعتز بلغته ويعيش قيمه بوعي")
    vision_description = models.TextField(
        "نص الرؤية",
        default="أن تكون آفاق شريكًا موثوقًا للأسر المسلمة في بناء صلة مستمرة بين أبنائها والعربية والقرآن والهوية.",
    )
    mission_title = models.CharField("عنوان الرسالة", max_length=220, default="تعليم فردي قريب من الطالب وحياته")
    mission_description = models.TextField(
        "نص الرسالة",
        default="تقديم تجربة تعليمية مرنة وعالية الجودة تجمع العلم والتفاعل والمتابعة، وتراعي احتياج كل طالب.",
    )
    goal_title = models.CharField("عنوان الهدف", max_length=220, default="أثر يبقى بعد انتهاء الحصة")
    goal_description = models.TextField(
        "نص الهدف", default="أن يخرج الطالب بمعرفة يستخدمها، وثقة تنمو، وعلاقة أجمل بلغته ودينه ومجتمعه."
    )
    footer_description = models.TextField(
        "وصف تذييل الموقع",
        default=(
            "تعليم فردي مباشر للغة العربية والقرآن الكريم والتربية الإسلامية، يساعد أبناءنا على فهم "
            "لغتهم والاعتزاز بهويتهم."
        ),
    )
    cta_eyebrow = models.CharField("عبارة أعلى دعوة الحجز", max_length=180, default="خطوة صغيرة، أثر كبير")
    cta_title = models.CharField("عنوان دعوة الحجز", max_length=220, default="ابدأ رحلة ابنك مع آفاق اليوم")
    cta_description = models.TextField(
        "وصف دعوة الحجز",
        default="دعنا نتعرف إلى احتياجاته ونرشح له نقطة البداية الأنسب في حصة تجريبية مجانية.",
    )

    class Meta:
        verbose_name = "إعدادات الموقع"
        verbose_name_plural = "إعدادات الموقع"

    def __str__(self) -> str:
        return self.academy_name

    def save(self, *args, **kwargs) -> None:
        self.pk = 1
        super().save(*args, **kwargs)


class TrialRequest(TimestampedModel):
    class Status(models.TextChoices):
        NEW = "new", "جديد"
        CONTACTED = "contacted", "تم التواصل"
        SCHEDULED = "scheduled", "تم تحديد الموعد"
        COMPLETED = "completed", "اكتملت الحصة"
        CANCELLED = "cancelled", "ملغي"

    submission_key = models.UUIDField("مفتاح منع التكرار", default=uuid.uuid4, unique=True, editable=False)
    subject = models.CharField("المادة", max_length=120)
    course = models.CharField("الكورس المطلوب", max_length=180, blank=True)
    student_name = models.CharField("اسم الطالب", max_length=180)
    age = models.CharField("العمر", max_length=80)
    level = models.CharField("المستوى", max_length=120)
    preferred_day = models.CharField("اليوم المفضل", max_length=80)
    preferred_period = models.CharField("الفترة المفضلة", max_length=80)
    timezone = models.CharField("المنطقة الزمنية", max_length=180)
    parent_name = models.CharField("اسم ولي الأمر", max_length=180)
    whatsapp = models.CharField("واتساب", max_length=50)
    email = models.EmailField("البريد الإلكتروني", blank=True)
    country = models.CharField("الدولة", max_length=120)
    notes = models.TextField("ملاحظات", blank=True)
    status = models.CharField("الحالة", max_length=20, choices=Status.choices, default=Status.NEW, db_index=True)
    admin_notes = models.TextField("ملاحظات الفريق", blank=True)
    source_ip = models.GenericIPAddressField("عنوان IP", null=True, blank=True)
    user_agent = models.CharField("المتصفح", max_length=500, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "طلب حصة تجريبية"
        verbose_name_plural = "طلبات الحصة التجريبية"

    def __str__(self) -> str:
        return f"{self.student_name} — {self.parent_name}"


class ContactMessage(TimestampedModel):
    class Status(models.TextChoices):
        NEW = "new", "جديدة"
        IN_PROGRESS = "in_progress", "قيد المتابعة"
        REPLIED = "replied", "تم الرد"
        CLOSED = "closed", "مغلقة"

    submission_key = models.UUIDField("مفتاح منع التكرار", default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField("الاسم", max_length=180)
    email = models.EmailField("البريد الإلكتروني")
    subject = models.CharField("الموضوع", max_length=180)
    message = models.TextField("الرسالة")
    status = models.CharField("الحالة", max_length=20, choices=Status.choices, default=Status.NEW, db_index=True)
    admin_notes = models.TextField("ملاحظات الفريق", blank=True)
    source_ip = models.GenericIPAddressField("عنوان IP", null=True, blank=True)
    user_agent = models.CharField("المتصفح", max_length=500, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "رسالة تواصل"
        verbose_name_plural = "رسائل التواصل"

    def __str__(self) -> str:
        return f"{self.name} — {self.subject}"
