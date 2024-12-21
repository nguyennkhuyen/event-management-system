from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    guests = models.ManyToManyField(User, related_name="events_attending", blank=True)

    def __str__(self):
        return self.name

class Attendee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relate to the User model
    event = models.ForeignKey(Event, on_delete=models.CASCADE)  # Relate to Event
    status = models.CharField(max_length=50, choices=[('RSVP', 'RSVP'), ('Not Responded', 'Not Responded')], default='Not Responded')
    attending = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.event.name} ({self.status})"