from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
# Register your models here.

# register here models to show in admin dashboard
class ManagerAdmin(UserAdmin):
    # fields to view in admin dashboard
    list_display = ('email', 'username', 'address', 'company','first_name','last_name',
                    'date_joined', 'last_login', 'is_admin', 'is_superuser')
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Manager, ManagerAdmin)

admin.site.register(Employee)
