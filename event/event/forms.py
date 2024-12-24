from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Event, Location

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

class EventForm(forms.ModelForm):
    location_name = forms.CharField(max_length=255, required=False, label="Location Name")
    location_address = forms.CharField(widget=forms.Textarea, required=False, label="Location Address")

    class Meta:
        model = Event
        fields = ['name', 'description', 'date', 'guests']
        widgets = {
            'date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }
    
    def save(self, commit=True):
        # Handle the new location
        location_name = self.cleaned_data.get('location_name')
        location_address = self.cleaned_data.get('location_address')

        if location_name and location_address:
            location, created = Location.objects.get_or_create(name=location_name, address=location_address)
            self.instance.location = location
        return super().save(commit)