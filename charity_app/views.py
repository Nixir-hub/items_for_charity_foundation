from django.shortcuts import render

# Create your views here.
from django.views import View


class IndexView(View):

    def get(self, request):
        return render(request, "index.html")


class FormView(View):

    def get(self, request):
        return render(request, "form.html")

    def post(self, request):
        return render(request, "form-confirmation.html")
