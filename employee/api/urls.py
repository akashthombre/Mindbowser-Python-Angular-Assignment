from django.urls import path
from . import views
# from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('login/', views.login, name="login"),
    path('register-manager/', views.register_manager, name='register-manager'),
    path('employee-list/', views.employeeList, name='employee-list'),
    path('create-employee/', views.createEmployee, name='create-employee'),
    path('update-employee/<int:pk>', views.updateEmployee, name='update-employee'),
    path('delete-employee/<int:pk>', views.deleteEmployee, name='delete-employee'),
]
