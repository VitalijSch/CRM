from rest_framework import serializers
from .models import Customer, Product, Order


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name',
                  'email', 'mobile', 'is_edit']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product', 'category',
                  'price', 'total_in_stock', 'is_edit']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'product', 'quantity',
                  'amount', 'customer', 'order_date', 'is_edit']
