"""items_for_charity_foundation URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path, include

from accounts.views import CreateUser
from charity_app.views import LandingPage, AddDonation, ConfForm, DonationListView, UserProfilView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('django.contrib.auth.urls')),
    path('register/', CreateUser.as_view(), name="register-view"),
    path("", LandingPage.as_view(), name="main-menu"),
    path("form/", AddDonation.as_view(), name="form-view"),
    path("form_com/", ConfForm.as_view(), name="comf-view"),
    path("doantions/", DonationListView.as_view(), name="donation-listview"),
    path("profil_details/", UserProfilView.as_view(), name="profil-view"),
]
