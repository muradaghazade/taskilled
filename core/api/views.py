from django.db.models import query
from rest_framework.generics import CreateAPIView, ListAPIView
from core.models import Course, Subject, Question , Option, Order, UserAnswer, AnswerType
from rest_framework.views import APIView
from .serializers import (
    CourseSerializer, 
    SubjectSerializer, 
    QuestionSerializer, 
    OptionSerializer, 
    OrderSerializer,
    UserAnswerSerializer,
    CreateCourseSerializer,
    AnswerTypeSerializer
)
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class AnswerTypeDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        answer_type = get_object_or_404(AnswerType, pk=kwargs['id'])
        serializer = AnswerTypeSerializer(answer_type)
        return Response(serializer.data)

class CourseAPIView(CreateAPIView):
    model = Course
    serializer_class = CreateCourseSerializer

class CourseListAPIView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        title = self.request.data.get('title')
        queryset = Course.objects.order_by('-id')
        print(title)

        if title:
            queryset = queryset.filter(title__icontains=title)

        return queryset

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class CourseDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            course = serializer.save()
            return Response(CourseSerializer(course).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        course.delete()
        return Response("Course deleted", status=status.HTTP_204_NO_CONTENT)

class CreateSubjectAPIView(CreateAPIView):
    model = Subject
    serializer_class = SubjectSerializer

class SubjectListAPIView(ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        queryset = Subject.objects.order_by('id')
        return queryset

class SubjectDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        serializer = SubjectSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            subject = serializer.save()
            return Response(SubjectSerializer(subject).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        subject.delete()
        return Response("Subject deleted", status=status.HTTP_204_NO_CONTENT)


class QuestionCreateAPIView(CreateAPIView):
    model = Question
    serializer_class = QuestionSerializer


class QuestionListAPIView(ListAPIView):
    serializer_class = QuestionSerializer
    def get_queryset(self):
        queryset = Question.objects.order_by('id')
        return queryset


class QuestionDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            question = serializer.save()
            return Response(QuestionSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        question.delete()
        return Response("Question deleted", status=status.HTTP_204_NO_CONTENT)


class OptionCreateAPIView(CreateAPIView):
    model = Option
    serializer_class = OptionSerializer


class OptionListAPIView(ListAPIView):
    serializer_class = OptionSerializer
    def get_queryset(self):
        queryset = Option.objects.order_by('id')
        return queryset


class OptionDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        serializer = OptionSerializer(option)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        serializer = OptionSerializer(option, data=request.data, partial=True)
        if serializer.is_valid():
            option = serializer.save()
            return Response(OptionSerializer(option).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        option.delete()
        return Response("Option deleted", status=status.HTTP_204_NO_CONTENT)


class OrderCreateAPIView(CreateAPIView):
    model = Order
    serializer_class = OrderSerializer


class OrderListAPIView(ListAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        queryset = Order.objects.order_by('id')
        return queryset

class OrderDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            order = serializer.save()
            return Response(OrderSerializer(order).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        order.delete()
        return Response("Order deleted", status=status.HTTP_204_NO_CONTENT)


class UserAnswerCreateAPIView(CreateAPIView):
    model = UserAnswer
    serializer_class = UserAnswerSerializer


class UserAnswerListAPIView(ListAPIView):
    serializer_class = UserAnswerSerializer
    def get_queryset(self):
        queryset = UserAnswer.objects.order_by('id')
        return queryset

class UserAnswerDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        serializer = UserAnswerSerializer(user_answer)
        return Response(serializer.data)
    def patch(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        serializer = UserAnswerSerializer(user_answer, data=request.data, partial=True)
        if serializer.is_valid():
            user_answer = serializer.save()
            return Response(UserAnswerSerializer(user_answer).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        user_answer.delete()
        return Response("User Answer deleted", status=status.HTTP_204_NO_CONTENT)