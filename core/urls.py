from django.urls import path
from core.views import *

app_name = 'core'

urlpatterns = [
    path('',MainPageView.as_view(),name ='main'),
    path('course-list',CourseListView.as_view(),name = 'course-list'),
    path('course/<int:pk>/',CourseDetailView.as_view(),name = 'course-detail'),
    path('profile',ProfileView.as_view(),name = 'profile'),
    path('create-task',CreateTaskView.as_view(),name = 'create-task'),
    path('question',QuestionView.as_view(),name = 'question'),
    path('register',RegisterView.as_view(),name = 'register'),
    path('register-type',RegChooseView.as_view(),name = 'register-type'),
    path('register-student',RegStudentView.as_view(),name = 'register-student'),
    path('login',LoginView.as_view(),name = 'login'),
    path('create-course',CreateCourseView.as_view(),name = 'create-course'),
    path('create-subject',CreateSubjectView.as_view(),name = 'create-subject'),
    path('create-question',CreateQuestionView.as_view(),name = 'create-question'),
    path('create-option',CreateOptionView.as_view(),name = 'create-option')
]