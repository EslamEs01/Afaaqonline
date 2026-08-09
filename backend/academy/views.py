from django.db import connection, transaction
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import ScopedRateThrottle

from .models import ContactMessage, Course, FAQ, SiteSettings, Testimonial, TrialRequest
from .serializers import (
    ContactMessageSerializer,
    CourseSerializer,
    FAQSerializer,
    SiteSettingsSerializer,
    TestimonialSerializer,
    TrialRequestSerializer,
)
from .services import notify_contact_message, notify_trial_request


def health(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        cursor.fetchone()
    return JsonResponse({"status": "ok", "service": "afaaq-api"})


def client_ip(request) -> str | None:
    value = request.META.get("HTTP_X_REAL_IP") or request.META.get("REMOTE_ADDR")
    return value or None


class CourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    throttle_classes = []
    authentication_classes = []
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Course.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        if category in Course.Category.values:
            queryset = queryset.filter(category=category)
        if self.request.query_params.get("featured") in {"1", "true"}:
            queryset = queryset.filter(is_featured=True)
        return queryset


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    lookup_field = "slug"
    throttle_classes = []
    authentication_classes = []
    permission_classes = [AllowAny]


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_approved=True)
    serializer_class = TestimonialSerializer
    throttle_classes = []
    authentication_classes = []
    permission_classes = [AllowAny]


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    throttle_classes = []
    authentication_classes = []
    permission_classes = [AllowAny]


class SiteSettingsView(generics.GenericAPIView):
    serializer_class = SiteSettingsSerializer
    throttle_classes = []
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        settings_object, _ = SiteSettings.objects.get_or_create(pk=1)
        return Response(self.get_serializer(settings_object).data)


class TrialRequestCreateView(generics.CreateAPIView):
    queryset = TrialRequest.objects.all()
    serializer_class = TrialRequestSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "trial_requests"
    authentication_classes = []
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        trial = serializer.save(
            source_ip=client_ip(self.request),
            user_agent=self.request.META.get("HTTP_USER_AGENT", "")[:500],
        )
        if serializer.created_new:
            transaction.on_commit(lambda: notify_trial_request(trial))

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "message": "تم استلام طلبك بنجاح.",
                "reference": serializer.instance.pk,
            },
            status=status.HTTP_201_CREATED if serializer.created_new else status.HTTP_200_OK,
        )


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact_messages"
    authentication_classes = []
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        message = serializer.save(
            source_ip=client_ip(self.request),
            user_agent=self.request.META.get("HTTP_USER_AGENT", "")[:500],
        )
        if serializer.created_new:
            transaction.on_commit(lambda: notify_contact_message(message))

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "message": "وصلتنا رسالتك وسيرد عليك فريق آفاق في أقرب وقت.",
                "reference": serializer.instance.pk,
            },
            status=status.HTTP_201_CREATED if serializer.created_new else status.HTTP_200_OK,
        )
