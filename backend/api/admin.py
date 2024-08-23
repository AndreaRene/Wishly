from django.contrib import admin
from .models import Event, Wishlist, WishlistItem, Friendship, Notification

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'user__username')

@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'wishlist', 'price')
    search_fields = ('name', 'wishlist__name')

admin.site.register(Event)
admin.site.register(Friendship)
admin.site.register(Notification)