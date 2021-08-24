from django.shortcuts import render,redirect ,get_object_or_404
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView , DetailView , View, CreateView
from core.models import *
# from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.exceptions import PermissionDenied
# import xmltodict

class MainPageView(TemplateView):
    template_name = 'main-page.html'


class CourseListView(ListView):
    model = Course
    template_name = 'course_list.html'

class InternshipListView(ListView):
    model = Course
    template_name = 'internship_list.html'

class BTaskListView(ListView):
    model = Course
    template_name = 'b_task.html'

@method_decorator(csrf_exempt, name='dispatch')
class CourseDetailView(DetailView):
    model = Course
    context_object_name = "course"
    template_name = 'course_detail.html'

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(request.POST)
        response = request.POST['xmlmsg']
        dict_resp = xmltodict.parse(response)
        print(dict_resp['Message']['OrderStatus'])
        order_id = int(dict_resp['Message']['OrderDescription'])
        if dict_resp['Message']['OrderStatus'] == "APPROVED":
            Order.objects.filter(pk=order_id).update(successfuly_paid=1)
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

class ProfileView(TemplateView):
    model = Course
    template_name = 'profile.html'

@method_decorator(csrf_exempt, name='dispatch')
class QuestionView(DetailView):
    model = Question
    context_object_name = "question"
    template_name = 'question.html'

    # def post(self, request, *args, **kwargs):
    #     self.object = self.get_object()
    #     print(request.POST, 'post burda')
    #     context = self.get_context_data(object=self.object)
    #     # print(request.POST, 'yeah')
    #     return self.render_to_response(context)
    
    # def dispatch(self, request, *args, **kwargs):
    #     # if self.request.user.username != self.get_object().username:
    #     print(self.request.user)
    #     raise PermissionDenied
    #     return super(ProfileView, self).dispatch(request, *args, **kwargs)


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
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['answer_types'] = AnswerType.objects.all()
        return context


class CreateOptionView(TemplateView):
    template_name = 'create-option.html'


class StudentProfileView(TemplateView):
    template_name = 'student_profile.html'


class QuizView(TemplateView):
    template_name = 'quiz.html'


class FeedbackView(TemplateView):
    template_name = 'feedback.html'

class EditCourseView(DetailView):
    model = Course
    context_object_name = "course"
    template_name = 'edit-course.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        course = self.get_object()
        context['subject'] = Subject.objects.filter(course=course.id).first
        return context

class CourseQuestionView(DetailView):
    model = Course
    context_object_name = "question"
    template_name = 'course-questions.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        course = self.get_object()
        context['subject'] = Subject.objects.filter(course=course.id).first
        return context

class EditQuestionView(DetailView):
    model = Question
    context_object_name = "question"
    template_name = 'edit-question.html'


class EditProfile(TemplateView):
    template_name = 'edit-profile.html'
