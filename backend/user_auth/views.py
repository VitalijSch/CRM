from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import User
from .serializers import UserSerializer


class SignUpView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Benutzer nicht gefunden.'}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user.password):
            return Response({'success': 'Anmeldung erfolgreich!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Falsches Passwort.'}, status=status.HTTP_400_BAD_REQUEST)
