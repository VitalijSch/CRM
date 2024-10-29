from django.db import models
from django.utils import timezone


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15)
    is_edit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Product(models.Model):
    product = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    price = models.FloatField()
    total_in_stock = models.IntegerField()
    is_edit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product} {self.category}"


class Order(models.Model):
    product = models.CharField(max_length=50)
    quantity = models.IntegerField()
    amount = models.FloatField()
    customer = models.CharField(max_length=50)
    order_date = models.DateField(auto_now=True)
    is_edit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product} for {self.customer}"
