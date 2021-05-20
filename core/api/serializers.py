from django.db import models
from core.models import Course
from rest_framework import serializers
from core.models import Course

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