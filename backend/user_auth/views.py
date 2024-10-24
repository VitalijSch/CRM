from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserLoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Greife auf den Benutzer zu, der das Token generiert hat
        user = serializer.user
        token = serializer.validated_data['access']

        # Gebe die Benutzerinformationen zusammen mit dem Token zurück
        return Response({
            'access': token,
            'username': user.username,
            'email': user.email,
            'profile_image': user.profile_image.url if user.profile_image else None,
        }, status=status.HTTP_200_OK)
