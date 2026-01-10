from django.urls import path
from .views import ask,explain_code, project_flow

urlpatterns = [
    path("ask/",ask),
    path("explain_code/",explain_code),
    path("project_flow/",project_flow)
]
