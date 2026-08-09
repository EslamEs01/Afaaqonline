from django.contrib import admin
from django.urls import include, path


admin.site.site_header = "لوحة إدارة أكاديمية آفاق"
admin.site.site_title = "أكاديمية آفاق"
admin.site.index_title = "مرحبًا بك في لوحة إدارة أكاديمية آفاق"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("academy.urls")),
]
