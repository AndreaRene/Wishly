from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    
    class RecurrenceChoices(models.TextChoices):
        DAILY = 'DA', _('Daily')
        WEEKLY = 'WE', _('Weekly')
        MONTHLY = 'MO', _('Monthly')
        YEARLY = 'YE', _('Yearly')

    recurrence_pattern = models.CharField(
        max_length=2,
        choices=RecurrenceChoices.choices,
        blank=True,
        null=True
    )
    recurrence_end_date = models.DateField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events', default=1)
    visible_to_friends = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Wishlist(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists', default=1)
    visible_to_friends = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    store = models.CharField(max_length=100, blank=True, null=True)  # New store field

    def __str__(self):
        return self.name
