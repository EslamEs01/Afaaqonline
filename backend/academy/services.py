import logging

from django.conf import settings
from django.core.mail import send_mail

from .models import ContactMessage, TrialRequest


logger = logging.getLogger(__name__)


def notify_trial_request(trial: TrialRequest) -> None:
    body = "\n".join(
        [
            "تم استلام طلب حصة تجريبية جديد.",
            f"الطالب: {trial.student_name}",
            f"العمر: {trial.age}",
            f"المادة: {trial.subject}",
            f"الكورس: {trial.course or 'غير محدد'}",
            f"ولي الأمر: {trial.parent_name}",
            f"واتساب: {trial.whatsapp}",
            f"الدولة: {trial.country}",
            f"الموعد المفضل: {trial.preferred_day} — {trial.preferred_period}",
            f"المنطقة الزمنية: {trial.timezone}",
            f"ملاحظات: {trial.notes or 'لا توجد'}",
        ]
    )
    _send_notification(f"طلب حصة تجريبية — {trial.student_name}", body)


def notify_contact_message(message: ContactMessage) -> None:
    body = "\n".join(
        [
            "تم استلام رسالة تواصل جديدة.",
            f"الاسم: {message.name}",
            f"البريد: {message.email}",
            f"الموضوع: {message.subject}",
            "",
            message.message,
        ]
    )
    _send_notification(f"رسالة جديدة — {message.subject}", body)


def _send_notification(subject: str, body: str) -> None:
    if not settings.AFQ_EMAIL_NOTIFICATIONS_ENABLED:
        logger.info("Afaaq email notification skipped because SMTP notifications are disabled")
        return
    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.AFQ_NOTIFICATION_EMAIL],
            fail_silently=False,
        )
    except Exception:
        logger.exception("Could not send Afaaq notification email")
