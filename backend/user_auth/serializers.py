from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'user_profile', 'password', 'remember_me']

    def create(self, validated_data):
        user = User(
            name=validated_data.get('name'),
            email=validated_data.get('email'),
            user_profile=validated_data.get('user_profile'),
            remember_me=validated_data.get('remember_me', False)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
