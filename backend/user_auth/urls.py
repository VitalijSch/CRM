from django.urls import path
from . import views

urlpatterns = [
    path('user_auth/sign-up', views.SignUpView.as_view(), name='sign-up'),
]
