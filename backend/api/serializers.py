from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, Wishlist, WishlistItem, Friendship, Notification
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'description', 'is_recurring', 'recurrence_pattern', 'recurrence_end_date', 'visible_to_friends']

class WishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = ['id', 'name', 'description', 'link', 'price', 'wishlist', 'category']

    def validate_category(self, value):
        if value == 'choose':
            raise serializers.ValidationError("Please select a valid category.")
        return value


class WishlistSerializer(serializers.ModelSerializer):
    item = WishlistItemSerializer(many=True, read_only=True)
    class Meta:
        model = Wishlist
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'item', 'visible_to_friends']

class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['from_user', 'to_user', 'status', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'created_at', 'read']