from django.contrib.auth.models import User
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View

from accounts.form import SignUpForm


class CreateUser(View):

    def get(self, request):
        form = SignUpForm()
        return render(request, "registration/register.html", {"form": form})

    def post(self, request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            username = request.POST.get('first_name') + " " + request.POST.get('last_name')
            user = User.objects.create(username=request.POST.get("email"),
                                       first_name=request.POST.get("first_name"),
                                       last_name=request.POST.get("last_name"),
                                       email=request.POST.get("email"))
            user.set_password(request.POST.get("password1"))
            user.save()
            return redirect("/login")
        return render(request, 'registration/register.html', {'form': form})
