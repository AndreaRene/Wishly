from django.db import models  # 1
from django.utils.translation import gettext_lazy as _  # 2

class Event(models.Model):  # 3
    name = models.CharField(max_length=100)  # 4
    date = models.DateField()  # 5
    description = models.TextField(blank=True, null=True)  # 6
    is_recurring = models.BooleanField(default=False)  # 7
    
    class RecurrenceChoices(models.TextChoices):  # 8
        DAILY = 'DA', _('Daily')  # 9
        WEEKLY = 'WE', _('Weekly')
        MONTHLY = 'MO', _('Monthly')
        YEARLY = 'YE', _('Yearly')

    recurrence_pattern = models.CharField(  # 10
        max_length=2,  # 11
        choices=RecurrenceChoices.choices,  # 12
        blank=True,  # 13
        null=True  # 14
    )
    recurrence_end_date = models.DateField(blank=True, null=True)  # 15

    def __str__(self):  # 16
        return self.name

class WishList(models.Model):  # 17
    name = models.CharField(max_length=100)  # 18
    
    event = models.ForeignKey(Event, on_delete=models.CASCADE)  # 19

    def __str__(self):  # 20
        return self.name