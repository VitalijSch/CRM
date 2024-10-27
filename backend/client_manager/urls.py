from django.urls import path
from .views import CustomerListCreateView, CustomerDeleteView, CustomerUpdateView

urlpatterns = [
    path('customers/', CustomerListCreateView.as_view(), name='customers'),
    path('customers/update/<int:pk>/',
         CustomerUpdateView.as_view(), name='customer-update'),
    path('customers/delete/<int:pk>/',
         CustomerDeleteView.as_view(), name='customers-delete'),
]
