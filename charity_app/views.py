from django.core.paginator import Paginator
from django.shortcuts import render

# Create your views here.
from django.views import View

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
        categories = Category.objects.all()
        institutions = Institution.objects.all()
        return render(request, "form.html", {"categories": categories, "institutions": institutions})

    def post(self, request):
        return render(request, "form-confirmation.html")


class ConfForm(View):
    def get(self, request):
        return render(request, "form-confirmation.html")