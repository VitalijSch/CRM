from django.urls import path
from . import views

urlpatterns = [
    path('customers/', views.CustomerListCreateView.as_view(), name='customers'),
    path('customers/update/<int:pk>/',
         views.CustomerUpdateView.as_view(), name='customer-update'),
    path('customers/delete/<int:pk>/',
         views.CustomerDeleteView.as_view(), name='customers-delete'),
    path('products/', views.ProductListCreateView.as_view(), name='products'),
    path('products/update/<int:pk>/',
         views.ProductUpdateView.as_view(), name='product-update'),
    path('products/delete/<int:pk>/',
         views.ProductDeleteView.as_view(), name='products-delete'),
    path('orders/', views.OrderListCreateView.as_view(), name='orders'),
    path('orders/update/<int:pk>/',
         views.OrderUpdateView.as_view(), name='order-update'),
    path('orders/delete/<int:pk>/',
         views.OrderDeleteView.as_view(), name='orders-delete'),
]
