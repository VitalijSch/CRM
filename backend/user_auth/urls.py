from django.urls import path
from .views import SignUpView, LoginView

urlpatterns = [
    path('users/', SignUpView.as_view(), name='users'),
    path('login/', LoginView.as_view(), name='login'),
]
