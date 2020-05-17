from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, BasePermission,  IsAuthenticated
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login, logout as django_logout
from django.views.decorators.csrf import csrf_exempt

# i have used  function based views,  we can use class based views also


@api_view(['POST', ])
@permission_classes((AllowAny, ))
def register_manager(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        manager = serializer.save()
        data['email'] = manager.email
        data['username'] = manager.username
        data['address'] = manager.address
        data['company'] = manager.company
        data['first_name'] = manager.first_name
        data['last_name'] = manager.last_name
        token = Token.objects.get(user=manager).key
        data['token'] = token
    else:
        data = serializer.errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'success': True, 'message': 'Manager added successfully !', 'data': data})


@api_view(['POST', ])
@permission_classes((AllowAny, ))
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]
    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, 'success': True, 'userid': token.user_id})


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def employeeList(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response({'success': True, 'data': serializer.data})


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createEmployee(request):

    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': "Employee added successfully !", 'data': serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def updateEmployee(request, pk):
    try:
        employee = Employee.objects.get(id=pk)
    except Employee.DoesNotExist:
        return Response({'success':False,'message':'Employee does not exist !','status':status.HTTP_404_NOT_FOUND} )

    serializer = EmployeeSerializer(instance=employee, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'success':True,'message':'Employee updated successfully','data':serializer.data})


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteEmployee(request, pk):
    try:
        employee = Employee.objects.get(id=pk)
    except Employee.DoesNotExist:
        return Response({'success': False, 'message': 'Employee does not exist !', status: status.HTTP_404_NOT_FOUND})

    employee.delete()
    return Response({'success': True, 'message': 'Employee deleted successfully !'})
