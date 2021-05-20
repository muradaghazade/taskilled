from django.urls import path
from core.views import *

app_name = 'core'

urlpatterns = [
    path('',MainPageView.as_view(),name ='main'),
    path('course-list',CourseListView.as_view(),name = 'course-list'),
    path('course-detail',CourseDetailView.as_view(),name = 'course-detail'),
    path('profile',ProfileView.as_view(),name = 'profile'),
    path('create-task',CreateTaskView.as_view(),name = 'create-task'),
]