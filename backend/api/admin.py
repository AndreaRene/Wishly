from django.contrib import admin
from .models import Event, Wishlist, WishlistItem, Friendship, Notification

# Inline for displaying WishlistItems within the Wishlist admin view
class WishlistItemInline(admin.TabularInline):
    model = WishlistItem
    extra = 1  # Number of empty forms to display

# Customized admin for Wishlist with inlines
@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at', 'updated_at')
    search_fields = ('name', 'user__username')
    list_filter = ('created_at', 'updated_at')
    inlines = [WishlistItemInline]

# Customized admin for WishlistItem
@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'wishlist', 'category', 'price', 'store')
    search_fields = ('name', 'wishlist__name')
    list_filter = ('category', 'store')

# Customized admin for Event
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'user', 'is_recurring', 'visible_to_friends')
    search_fields = ('name', 'user__username')
    list_filter = ('is_recurring', 'visible_to_friends', 'date')

# Customized admin for Friendship
@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'status', 'created_at')
    search_fields = ('from_user__username', 'to_user__username')
    list_filter = ('status', 'created_at')

# Customized admin for Notification
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'created_at', 'read')
    search_fields = ('user__username', 'message')
    list_filter = ('read', 'created_at')

# Optionally customize the admin site headers and titles
admin.site.site_header = "Wishly Admin Panel"
admin.site.site_title = "Wishly Admin"
admin.site.index_title = "Welcome to the Wishly Admin Panel"
