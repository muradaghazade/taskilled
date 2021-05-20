from django.db import models
from core.models import Course, Question, Subject
from rest_framework import serializers

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'title', 'teacher', 'price', 'image', 'description', 'course_deadline', 'minimum_age', 'is_shared')


    def create(self, validated_data):
        course = Course.objects.create(
            title=validated_data['title'],
            teacher=validated_data['teacher'],
            price=validated_data['price'],
            image=validated_data['image'],
            description=validated_data['description'],
            course_deadline=validated_data['course_deadline'],
            minimum_age=validated_data['minimum_age'],
            is_shared=validated_data['is_shared']
        )

        course.save()

        return course

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'deadline', 'course')


    def create(self, validated_data):
        subject = Subject.objects.create(
            title=validated_data['title'],
            deadline=validated_data['deadline'],
            course=validated_data['course']
        )

        subject.save()

        return subject


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'title', 'description', 'correct_answer','question_type','is_auto','is_success','subject')

    
    def create(self, validated_data):
        question = Course.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            correct_answer=validated_data['correct_answer'],
            question_type=validated_data['question_type'],
            is_auto=validated_data['is_auto'],
            is_success=validated_data['is_success'],
            subject=validated_data['subject'],
        )

        question.save()

        return question