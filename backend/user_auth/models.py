from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    user_profile = models.ImageField(
        upload_to='user_profile/', blank=True, null=True)
    password = models.CharField(max_length=128)
    remember_me = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.email
