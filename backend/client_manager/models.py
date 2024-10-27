from django.db import models


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15)
    is_edit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
