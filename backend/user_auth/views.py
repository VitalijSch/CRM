from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import login


class SignUpView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        remember_me = request.data.get('remember_me')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Benutzer nicht gefunden.'}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user.password):
            login(request, user)

            if remember_me:

                request.session.set_expiry(60 * 60 * 24 * 30)
            else:
                request.session.set_expiry(0)

            user_profile_url = request.build_absolute_uri(
                user.user_profile.url) if user.user_profile else None

            return Response({
                'id': user.id,
                'name': user.name,
                'user_profile': user_profile_url,
                'remember_me': user.remember_me
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Falsches Passwort.'}, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')  # Benutzer-ID von der URL
        try:
            user = self.get_object()  # holt den Benutzer basierend auf der ID
            return Response({
                'email': user.email,
                'name': user.name,
                'user_profile': user.user_profile.url if user.user_profile else None,
                'remember_me': user.remember_me
            })
        except User.DoesNotExist:
            return Response({'error': 'Benutzer nicht gefunden.'}, status=status.HTTP_404_NOT_FOUND)
