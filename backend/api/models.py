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
    CATEGORY_CHOICES = [
    ('choose', 'Choose a Category'),
    ('electronics', 'Electronics'),
    ('books', 'Books'),
    ('clothing', 'Clothing'),
    ('home', 'Home & Kitchen'),
    ('toys', 'Toys & Games'),
    ('sports', 'Sports & Outdoors'),
    ('beauty', 'Beauty & Personal Care'),
    ('other', 'Other'),
    ]
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    store = models.CharField(max_length=100, blank=True, null=True) 
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name

class Friendship(models.Model):
    from_user = models.ForeignKey(User, related_name='friendships_sent', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='friendships_received', on_delete=models.CASCADE)
    
    class Status(models.TextChoices):
        PENDING = 'P', 'Pending'
        ACCEPTED = 'A', 'Accepted'
        DECLINED = 'D', 'Declined'

    status = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f"{self.from_user} -> {self.to_user} ({self.get_status_display()})"