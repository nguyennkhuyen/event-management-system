from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegistrationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Event
from .forms import EventForm

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password_confirm = request.POST['password_confirm']

        if password != password_confirm:
            messages.error(request, "Passwords do not match!")
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered!")
            return redirect('register')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        messages.success(request, "Registration successful! Please login.")
        return redirect('login')

    return render(request, 'register.html')

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Replace 'home' with your desired redirect URL
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required
def home(request):
    user_events = Event.objects.filter(created_by=request.user)  # Fetch events created by the user
    print(f"User: {request.user}, Events: {user_events}")  # Debugging line
    return render(request, 'home.html', {'user_events': user_events})

@login_required
def event_list(request):
    events = Event.objects.all()
    return render(request, 'event_list.html', {'events': events})

@login_required
def add_event(request):
    if request.method == "POST":
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.created_by = request.user
            event.save()
            form.save_m2m()  # Save many-to-many data for guests
            messages.success(request, "Event added successfully!")
            return redirect('event_list')  # Redirect to your event list view
    else:
        form = EventForm()
    return render(request, 'add_event.html', {'form': form})

@login_required
def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    return render(request, 'event_detail.html', {'event': event})

@login_required
def delete_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    # Ensure only the creator of the event can delete it
    if event.created_by != request.user:
        messages.error(request, "You do not have permission to delete this event.")
        return redirect('event_detail', event_id=event.id)  # Adjust the redirect as needed

    if request.method == "POST":
        event.delete()
        messages.success(request, "Event deleted successfully!")
        return redirect('event_list')  # Redirect to a list of events or other appropriate page

    return render(request, 'events/delete_event.html', {'event': event})



