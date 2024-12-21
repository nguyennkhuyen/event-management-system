"""
URL configuration for event project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView
from django.views.static import serve
from django.conf import settings
import os
from django.conf.urls.static import static

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),  # Login page
    path('logout/', LogoutView.as_view(), name='logout'),  # Logout
    path('register/', views.register, name='register'),  # Registration page
    path('', views.home, name='home'),  # Home page
    path('events/', views.event_list, name='event_list'),
    path('events/add/', views.add_event, name='add_event'),
    path('events/<int:event_id>/', views.event_detail, name='event_detail'),
    path('assets/<path:path>/', serve, {'document_root': os.path.join(settings.BASE_DIR, 'assets')})
] + static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'assets')