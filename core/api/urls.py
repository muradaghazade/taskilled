from django.urls import path
from .views import *

app_name = 'taskilled'

urlpatterns = [
    path('course/', CourseAPIView.as_view(), name='course'),
    path('create-subject/', CreateSubjectAPIView.as_view(), name='subject'),
    path('all-courses/', CourseListAPIView.as_view(), name='all-courses'),
    path('all-subjects/', SubjectListAPIView.as_view(), name='all-subjects'),
    path('course/<int:id>/', CourseDetailAPIView.as_view(), name='course-detail'),
    path('subject/<int:id>/', SubjectDetailAPIView.as_view(), name='subject-detail'),
    
]