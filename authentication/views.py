from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Token
from .serializers import UserSerializer, TokenSerializer
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import hashlib
import uuid
from django.contrib.auth import get_user_model

URL = "http://localhost:5173"  


def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
        <html>
        <body style="text-align: center; font-family: Verdana, serif; color: #000;">
            <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
            <p style="text-align: left;">{content}</p>
            <a href="{button_url}" target="_blank">
                <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
            </a>
            <p style="text-align: left;">
                If you are unable to click the above button, copy paste the below URL into your address bar
            </p>
            <a href="{button_url}" target="_blank">
                <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
            </a>
            </div>
        </body>
        </html>"""
class RegisteredEmailsView(APIView):
    def get(self, request):
        emails = list(User.objects.values_list('email', flat=True))
        return Response({"emails": emails}, status=status.HTTP_200_OK)

# class RegistrationView(APIView):
#     def post(self, request, format=None):
#         request.data["password"] = make_password(request.data["password"])
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {"success": True, "message": "You are now registered on our website!"},
#                 status=status.HTTP_200_OK,
#             )
#         else:
#             error_msg = ""
#             for key in serializer.errors:
#                 error_msg += serializer.errors[key][0]
#             return Response(
#                 {"success": False, "message": error_msg},
#                 status=status.HTTP_200_OK,
#             )

class RegistrationView(APIView):
    def post(self, request, format=None):
        data = request.data.copy()
        data["password"] = make_password(data["password"])
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print("User created:", serializer.data)
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            print("Validation errors:", serializer.errors)
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"success": False, "message": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not check_password(password, user.password):
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "success": True,
                "message": "You are now logged in!",
                "user": {
                    "id": user.id,
                    "name": user.name if hasattr(user, "name") else user.get_full_name(),
                    "email": user.email,
                },
            },
            status=status.HTTP_200_OK,
        )


class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        if not email:
            return Response(
                {"success": False, "message": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "User with this email does not exist."},
                status=status.HTTP_200_OK,
            )

        created_at = timezone.now()
        expires_at = created_at + timedelta(days=1)
        salt = uuid.uuid4().hex
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode("utf-8")
        ).hexdigest()

        token_obj = {
            "token": token,
            "created_at": created_at,
            "expires_at": expires_at,
            "user_id": user.id,
        }

        serializer = TokenSerializer(data=token_obj)
        if serializer.is_valid():
            serializer.save()
            subject = "Forgot Password Link"
            content = mail_template(
                "We have received a request to reset your password. Please reset your password using the link below.",
                f"{URL}/resetPassword?id={user.id}&token={token}",
                "Reset Password",
            )
            send_mail(
                subject=subject,
                message=content,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                html_message=content,
            )
            return Response(
                {
                    "success": True,
                    "message": "A password reset link has been sent to your email.",
                },
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )


class ResetPasswordView(APIView):
    def post(self, request, format=None):
        user_id = request.data.get("id")
        token = request.data.get("token")
        password = request.data.get("password")

        try:
            token_obj = Token.objects.filter(user_id=user_id).order_by("-created_at")[0]
        except IndexError:
            return Response(
                {"success": False, "message": "Invalid or expired reset link."},
                status=status.HTTP_200_OK,
            )

        if token_obj.expires_at < timezone.now():
            return Response(
                {"success": False, "message": "Password reset link has expired."},
                status=status.HTTP_200_OK,
            )

        if token_obj.token != token or token_obj.is_used:
            return Response(
                {"success": False, "message": "Invalid or already used reset link."},
                status=status.HTTP_200_OK,
            )

        token_obj.is_used = True
        hashed_password = make_password(password)
        ret_code = User.objects.filter(id=user_id).update(password=hashed_password)
        if ret_code:
            token_obj.save()
            return Response(
                {"success": True, "message": "Your password has been reset successfully!"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": False, "message": "Something went wrong."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
