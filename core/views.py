from django.shortcuts import render,redirect ,get_object_or_404
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView , DetailView , View, CreateView
from core.models import *
# from django.core.paginator import Paginator


class MainPageView(TemplateView):
    template_name = 'main-page.html'


class CourseListView(ListView):
    model = Course
    template_name = 'course_list.html'


class CourseDetailView(DetailView):
    model = Course
    context_object_name = "course"
    template_name = 'course_detail.html'


class ProfileView(TemplateView):
    model = Course
    template_name = 'profile.html'


class QuestionView(DetailView):
    model = Question
    context_object_name = "question"
    template_name = 'question.html'

class CreateTaskView(TemplateView):
    model = Course
    template_name = 'create-task.html'


class RegisterView(TemplateView):
    template_name = 'register.html'

class RegChooseView(TemplateView):
    template_name = 'reg-choose.html'

class RegStudentView(TemplateView):
    template_name = 'reg-student.html'

class LoginView(TemplateView):
    template_name = 'login.html'


class CreateCourseView(TemplateView):
    template_name = 'create-course.html'


class CreateSubjectView(TemplateView):
    template_name = 'create-subject.html'


class CreateQuestionView(TemplateView):
    template_name = 'create-question.html'


class CreateOptionView(TemplateView):
    template_name = 'create-option.html'