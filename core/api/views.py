from django.db.models import query
from rest_framework.generics import CreateAPIView, ListAPIView
from core.models import Course, Subject, Question
from rest_framework.views import APIView
from .serializers import CourseSerializer, SubjectSerializer, QuestionSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class CourseAPIView(CreateAPIView):
    model = Course
    serializer_class = CourseSerializer

class CourseListAPIView(ListAPIView):
    serializer_class = CourseSerializer
    def get_queryset(self):
        queryset = Course.objects.order_by('id')
        return queryset
    

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