from django.core.paginator import Paginator
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View

from charity_app.form import MainForm
from charity_app.models import Institution, Donation, Category


class LandingPage(View):

    def get(self, request):
        foundList = Institution.objects.all().filter(type=1)
        nationalOffList = Institution.objects.all().filter(type=2)
        localList = Institution.objects.all().filter(type=3)
        sumLst = len(foundList) + len(nationalOffList) + len(localList)
        sum_packages = 0
        for pack in Donation.objects.all():
            sum_packages += int(pack.quantity)
        paginator1 = Paginator(foundList, 3)
        paginator2 = Paginator(nationalOffList, 3)
        paginator3 = Paginator(localList, 3)
        page_number1 = request.GET.get("page")
        page_obj1 = paginator1.get_page(page_number1)
        page_number2 = request.GET.get("page")
        page_obj2 = paginator2.get_page(page_number2)
        page_number3 = request.GET.get("page")
        page_obj3 = paginator3.get_page(page_number3)
        return render(request, "index.html", {"found": page_obj1, "offn": page_obj2, "local_found": page_obj3,
                                              "sum_lst": sumLst, "sum_pack": sum_packages
                                              })


class AddDonation(View):

    def get(self, request):
        form = MainForm()
        categories = Category.objects.all()
        institutions = Institution.objects.all()
        return render(request, "form.html", {"form": form, "categories": categories, "institutions": institutions})

    def post(self, request):
        form = MainForm(request.POST)
        if form.is_valid():
            quantity = request.POST.get("bags")
            institution = request.POST.get("organization")
            address = request.POST.get("address")
            phone_number = request.POST.get("phone")
            city = request.POST.get("city")
            zip_code = request.POST.get("post_code")
            pick_up_date = request.POST.get("data")
            pick_up_time = request.POST.get("time")
            pick_up_comment = request.POST.get("more_info")
            user = self.request.user
            donation = Donation.objects.create(quantity=quantity,
                                               institution=Institution.objects.get(name=institution),
                                               address=address, phone_number=phone_number, city=city,
                                               zip_code=zip_code, pick_up_date=pick_up_date,
                                               pick_up_time=pick_up_time, pick_up_comment=pick_up_comment, user=user)
            donation.save()
            return redirect("/form_com/")
        else:
            return HttpResponse(f'Upss... coś poszło nie tak!')


class ConfForm(View):
    def get(self, request):
        return render(request, "form-confirmation.html")
