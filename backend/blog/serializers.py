from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only =True)
    confirm_password = serializers.CharField(write_only =True)


    class Meta:
        model = User
        fields = ['username', 'email','first_name','last_name', 'password', 'confirm_password']


     # Username Validation
    def validate_username(self, value):
            value = value.strip()

            if len(value) < 4:
                raise serializers.ValidationError(
                    "Username must be at least 4 characters long."
                )

            if len(value) > 30:
                raise serializers.ValidationError(
                    "Username cannot exceed 30 characters."
                )

            if User.objects.filter(username__iexact=value).exists():
                raise serializers.ValidationError(
                    "Username already exists."
                )

            return value

        # Email Validation
    def validate_email(self, value):
            value = value.strip().lower()

            try:
                validate_email(value)
            except DjangoValidationError:
                raise serializers.ValidationError(
                    "Enter a valid email address."
                )

            if User.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError(
                    "Email is already registered."
                )

            return value

        # First Name Validation
    def validate_first_name(self, value):
            value = value.strip()

            if not value:
                raise serializers.ValidationError(
                    "First name cannot be empty."
                )

            if not value.replace(" ", "").isalpha():
                raise serializers.ValidationError(
                    "First name should contain only letters."
                )

            return value

        # Last Name Validation
    def validate_last_name(self, value):
            value = value.strip()

            if not value:
                raise serializers.ValidationError(
                    "Last name cannot be empty."
                )

            if not value.replace(" ", "").isalpha():
                raise serializers.ValidationError(
                    "Last name should contain only letters."
                )

            return value

        # Object-Level Validation
    def validate(self, data):

            # Password Match
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError({
                    "confirm_password": "Passwords do not match."
                })

            # Django Password Validators
            validate_password(data['password'])

            return data

    
    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )

        return user