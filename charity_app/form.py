from django import forms


class MainForm(forms.Form):
    categories = forms.CharField()
    bags = forms.CharField()
    organization = forms.CharField()
    address = forms.CharField()
    city = forms.CharField()
    post_code = forms.CharField()
    phone = forms.CharField()
    data = forms.CharField()
    time = forms.CharField()
    more_info = forms.CharField()
