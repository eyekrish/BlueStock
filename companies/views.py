from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Company
from .serializers import CompanySerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

