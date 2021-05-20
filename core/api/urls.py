from django.urls import path
from .views import CourseAPIView, CourseDetailAPIView, CourseListAPIView

app_name = 'taskilled'

urlpatterns = [
    path('course/', CourseAPIView.as_view(), name='course'),
    path('all-courses/', CourseListAPIView.as_view(), name='all-courses'),
    path('course/<int:id>/', CourseDetailAPIView.as_view(), name='course-detail'),
    
]