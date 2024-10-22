from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'user_profile', 'password']

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            email=validated_data['email'],
            user_profile=validated_data['user_profile']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
