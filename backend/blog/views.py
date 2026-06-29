import csv
from django.http import HttpResponse
from django.db.models import Sum, Q
from django.db.models.functions import TruncMonth
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer, UserSerializer,
    
)


# ─────────────────────────────────────────────
# Auth Views 
# ─────────────────────────────────────────────

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {'detail': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            'access': access_token,          # frontend stores this in localStorage
            'user': UserSerializer(user).data
        })

        # Refresh token goes in an HttpOnly cookie — JS can never read it
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,   # set True in production (HTTPS only)
            samesite='Lax',
            max_age=7 * 24 * 60 * 60,  # 7 days, matches SIMPLEJWT setting
            path='/api/',
        )

        return response


class CookieTokenRefreshAPIView(APIView):
    """
    POST /api/token/refresh/
    Reads the refresh_token from the HttpOnly cookie (not the request body).
    Returns a fresh access token in the JSON body.
    If refresh rotation is enabled, also rotates the cookie.
    """
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {'detail': 'Refresh token cookie missing.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            token = RefreshToken(refresh_token)
            new_access = str(token.access_token)

            response = Response({'access': new_access})

            # If rotation is on, SimpleJWT already blacklisted old token above;
            # issue a new refresh token and rotate the cookie.
            new_refresh = str(token)   # after calling .access_token, the token is rotated
            response.set_cookie(
                key='refresh_token',
                value=new_refresh,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60,
                path='/api/',
            )
            return response

        except Exception:
            return Response(
                {'detail': 'Refresh token is invalid or expired.'},
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass  # already invalid — that's fine

        response = Response(status=status.HTTP_205_RESET_CONTENT)
        # Clear the cookie by setting it with max_age=0
        response.delete_cookie('refresh_token', path='/api/')
        return response

