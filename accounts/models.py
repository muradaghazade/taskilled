from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    image = models.ImageField(upload_to='images/')
    email = models.EmailField(('email adress'), unique=True, null=True)
    password2 = models.CharField(('password2'), max_length=200)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'