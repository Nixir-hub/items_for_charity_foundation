from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    error_messages = {
        'password_mismatch': 'Hasła nie są takie same.',
    }
    password1 = forms.CharField(label="Hasło", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Powtórz hasło", widget=forms.PasswordInput)

    class Meta:
        model = User
        form = "register.html"
        fields = ("first_name", "last_name", "email", "password1", "password2")
        labels = {
            "first_name": "Imię",
            "last_name": "Nazwisko",
            "email": "Adres email",
            "password1": "Hasło",
            "password2": "Powtórz hasło"
        }
        widgets = {
        }
