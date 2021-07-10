from django.db import models
from accounts.models import User
from datetime import datetime
from accounts.models import User

# Create your models here.
class Course(models.Model):
    title = models.CharField('Title',max_length=50)
    teacher = models.ForeignKey(User,on_delete=models.CASCADE, db_index=True, related_name='course_teacher')
    price = models.DecimalField('Price',max_digits=6, decimal_places=2)
    image = models.ImageField('Image',upload_to='images/')
    video = models.FileField('Video',upload_to='videos/', null=True, blank=True)
    description = models.TextField('Description')
    course_deadline = models.CharField('Deadline',blank=True,max_length=50)
    minimum_age = models.IntegerField('Minimum age',blank=True,null=False)
    is_shared = models.BooleanField('is shared',default=0)
    category = models.ForeignKey("Category", on_delete=models.CASCADE, db_index=True, related_name='category_course', null=True, blank=True)
    # shared_at = models.DateTimeField('shared_at')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def __str__(self):
        return f"{self.title}" 

class Category(models.Model):
    title = models.CharField('Title',max_length=50, null=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return f"{self.title}" 

class Question(models.Model):
    
    title = models.CharField('Title',max_length=50)
    description = models.TextField('Description', null=True, blank=True)
    correct_answer = models.CharField('Correct answer',max_length=125,null=True,blank=True)
    image = models.ImageField('Image',upload_to='images/', null=True, blank=True)
    video = models.FileField('Video',upload_to='videos/', null=True, blank=True)
    edu_url = models.CharField('Url',max_length=200,null=True,default=False)
    # answer_file = models.FileField('File',upload_to='files/', null=True, blank=True)
    # audio_record = models.FileField('File',upload_to='files/', null=True, blank=True)
    answer_type = models.ManyToManyField('AnswerType',  verbose_name=("Answer Type"), db_index=True, related_name="answer_type_question", null=True, blank=True)
    
    
    is_auto = models.BooleanField('Is auto', default=1)
    is_success = models.BooleanField('Is succes', default=0)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, db_index=True, related_name='questionn', null=True)

    class Meta():
        verbose_name = 'Question'
        verbose_name_plural = 'Questions'
    def __str__(self):
        return f"{self.title}" 

class AnswerType(models.Model):
    title = models.CharField('Title',max_length=50)

    class Meta():
        verbose_name = 'AnswerType'
        verbose_name_plural = 'AnswerTypes'

    def __str__(self):
        return f"{self.title}" 

class UserAnswer(models.Model):
    feedback = models.TextField('Feedback', null=True, blank=True)
    answer = models.TextField('Answer')
    image = models.ImageField('Image',upload_to='images/', null=True, blank=True)
    video = models.FileField('Video',upload_to='videos/', null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_index=True, related_name='user_answer_q')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True, related_name='user_answer')

    def save(self, *args, **kwargs):
        super(UserAnswer, self).save(*args, **kwargs)
        if self.question.is_auto == True:
            print(self.answer)
            print(self.question.id)
            print(self.question.correct_answer)
            if self.answer == self.question.correct_answer:
                self.question.is_success = True
                print('done', self.question.is_success)
            else:
                print('wrong', self.question.is_success)

    class Meta:
        verbose_name = 'Answer'
        verbose_name_plural = 'Answers'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True, related_name='order')
    course = models.ForeignKey("Course", on_delete=models.CASCADE, db_index=True, related_name='the_order')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

class Option(models.Model):
    content = models.CharField('Title',max_length=255)
    question = models.ForeignKey('Question', on_delete=models.CASCADE, db_index=True, related_name='option')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Option'
        verbose_name_plural = 'Options'

    def __str__(self):
        return f"{self.content}" 

class Subject(models.Model):
    title = models.CharField('Title',max_length=50)
    deadline = models.IntegerField('Deadline',blank=True,null=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, db_index=True, related_name='subject')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'

    def __str__(self):
        return f"{self.title}" 



     
