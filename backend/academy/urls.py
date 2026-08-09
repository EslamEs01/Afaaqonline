from django.urls import path

from .views import (
    ContactMessageCreateView,
    CourseDetailView,
    CourseListView,
    FAQListView,
    SiteSettingsView,
    TestimonialListView,
    TrialRequestCreateView,
    health,
)


app_name = "academy"

urlpatterns = [
    path("health/", health, name="health"),
    path("courses/", CourseListView.as_view(), name="course-list"),
    path("courses/<slug:slug>/", CourseDetailView.as_view(), name="course-detail"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonial-list"),
    path("faqs/", FAQListView.as_view(), name="faq-list"),
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("trial-requests/", TrialRequestCreateView.as_view(), name="trial-request-create"),
    path("contact-messages/", ContactMessageCreateView.as_view(), name="contact-message-create"),
]
