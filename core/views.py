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


class QuestionView(TemplateView):
    model = Course
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