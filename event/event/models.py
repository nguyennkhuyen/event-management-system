from django.db import models

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

    def __str__(self):
        return self.name

class Attendee(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    events = models.ManyToManyField(Event)

    def __str__(self):
        return self.name