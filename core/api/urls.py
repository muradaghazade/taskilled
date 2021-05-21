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
    path('question/', QuestionCreateAPIView.as_view(), name='question'),
    path('all-questions/', QuestionListAPIView.as_view(), name='all-question'),
    path('question/<int:id>/', QuestionDetailAPIView.as_view(), name='question-detail'),
    path('option/', OptionCreateAPIView.as_view(), name='option'),
    path('all-options/', OptionListAPIView.as_view(), name='all-options'),
    path('option/<int:id>/', OptionDetailAPIView.as_view(), name='option-detail')
    
]