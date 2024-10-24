from django.urls import path
from .views import CreateUserView, UserLoginView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('user/login/', UserLoginView.as_view(), name='login'),
]
