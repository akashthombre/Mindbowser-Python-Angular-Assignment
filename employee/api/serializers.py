from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *
from rest_framework import exceptions
from django.http import JsonResponse

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manager
        fields = ['email', 'username', 'password',
                  'address', 'company', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):

        manager = Manager(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            address=self.validated_data['address'],
            company=self.validated_data['company'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )
        password = self.validated_data['password']
        manager.set_password(password)
        manager.save()
        return manager


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                data["user"] = user
            else:
                msg = "Unable to login with given credentials."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Must provide username and password both."
            raise exceptions.ValidationError(msg)
        return data
