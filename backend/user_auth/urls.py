from django.urls import path
from .views import SignUpView, LoginView, UserDetailView

urlpatterns = [
    path('users/', SignUpView.as_view(), name='users'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
