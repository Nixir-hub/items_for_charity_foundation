from django.shortcuts import render

# Create your views here.
from django.views import View


class LandingPage(View):

    def get(self, request):
        return render(request, "index.html")


class AddDonation(View):

    def get(self, request):
        return render(request, "form.html")

    def post(self, request):
        return render(request, "form-confirmation.html")
