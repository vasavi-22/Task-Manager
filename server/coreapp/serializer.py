from rest_framework import serializers
from .models import Tasks

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"
        # fields = ["task_name","description","assigned_date","due_date","priority_level"]

