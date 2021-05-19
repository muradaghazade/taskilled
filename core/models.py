from django.db import models
from accounts.models import User
from datetime import datetime

# Create your models here.
class Course(models.Model):
    title = models.CharField('Title',max_length=50)
    techer = models.ForeignKey(User,on_delete=models.CASCADE, db_index=True, related_name='course_teacher')
    price = models.DecimalField('Price',max_digits=6, decimal_places=2)
    image = models.ImageField('Image',upload_to='images/')
    description = models.TextField('Ddescription')
    course_deadline = models.IntegerField('Deadline',blank=True)
    minimum_age = models.IntegerField('Minimum age',blank=True,null=False)
    is_shared = models.BooleanField('is shared',default=0)
    shared_at = models.DateTimeField('shared_at')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        verbose_name = 'Kurs'
        verbose_name_plural = 'Kurslar'
        # ordering = ('-created_at', '-title')

    def __str__(self):
        return f"{self.title}" 



