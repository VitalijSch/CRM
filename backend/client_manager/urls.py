from django.urls import path
from .views import CustomerListCreateView, CustomerDeleteView

urlpatterns = [
    path('customers/', CustomerListCreateView.as_view(), name='customers'),
    path('customers/delete/<int:pk>/', CustomerDeleteView.as_view(), name='customers-delete'),
]
