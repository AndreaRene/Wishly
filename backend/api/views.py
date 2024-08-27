# Django Imports
from django.contrib.auth.models import User
from django.db.models import Q

# Django REST Framework Imports
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# Django REST Framework Simple JWT Imports
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

# Local Imports (Your Models and Serializers)
from .models import Event, Wishlist, WishlistItem, Friendship, Notification
from .serializers import (
    EventSerializer, 
    RegisterSerializer, 
    UserSerializer, 
    WishlistSerializer, 
    WishlistItemSerializer, 
    FriendshipSerializer, 
    NotificationSerializer
)

import logging
logger = logging.getLogger('myapp')

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        Wishlist.objects.create(user=user, name=f"{user.username}'s Wishlist")

# User Logout
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Blacklist the refresh token
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            return Response(status=204)
        except Exception as e:
            return Response(status=400)

# User Profile (View and Update)
class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# JWT Login (Token Obtain)
class LoginView(TokenObtainPairView):
    pass

# JWT Token Refresh
class RefreshTokenView(TokenRefreshView):
    pass

# List Events owned by the user
class OwnEventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(user=self.request.user)

# Retrieve an Event owned by the user
class OwnEventRetrieveView(generics.RetrieveAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(user=self.request.user)

# List friend's Events    
class EventListCreate(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friend_id = self.request.query_params.get('friend_id')

        if friend_id:
            friends = Friendship.objects.filter(
                Q(from_user=user, to_user_id=friend_id, status='A') |
                Q(from_user_id=friend_id, to_user=user, status='A')
            )

            if friends.exists():
                return Event.objects.filter(user_id=friend_id, visible_to_friends=True)

        from_friends = list(Friendship.objects.filter(from_user=user, status='A').values_list('to_user_id', flat=True))
        to_friends = list(Friendship.objects.filter(to_user=user, status='A').values_list('from_user_id', flat=True))

        friend_ids = from_friends + to_friends

        return Event.objects.filter(
            Q(user=user) | Q(user__in=friend_ids, visible_to_friends=True)
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# List friend's Events    
class FriendEventListView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friend_id = self.request.query_params.get('friend_id')

        if friend_id:
            friends = Friendship.objects.filter(
                Q(from_user=user, to_user_id=friend_id, status='A') |
                Q(from_user_id=friend_id, to_user=user, status='A')
            )

            if friends.exists():
                return Event.objects.filter(user_id=friend_id, visible_to_friends=True)

        from_friends = list(Friendship.objects.filter(from_user=user, status='A').values_list('to_user_id', flat=True))
        to_friends = list(Friendship.objects.filter(to_user=user, status='A').values_list('from_user_id', flat=True))

        friend_ids = from_friends + to_friends

        return Event.objects.filter(
            Q(user=user) | Q(user__in=friend_ids, visible_to_friends=True)
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Retrieve a friend's Event
class FriendEventRetrieveView(generics.RetrieveAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friend_id = self.kwargs['friend_id']

        friends = Friendship.objects.filter(
            Q(from_user=user, to_user_id=friend_id, status='A') |
            Q(from_user_id=friend_id, to_user=user, status='A')
        )

        if friends.exists():
            return Event.objects.filter(user_id=friend_id, visible_to_friends=True)
        else:
            return Event.objects.none()

# Retrieve, Update, and Delete an Event
class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        friend_ids = Friendship.objects.filter(
            Q(from_user=user, status='A') | Q(to_user=user, status='A')
        ).values_list('from_user', flat=True) | Friendship.objects.filter(
            Q(from_user=user, status='A') | Q(to_user=user, status='A')
        ).values_list('to_user', flat=True)

        return Event.objects.filter(
            Q(user=user) | Q(user__in=friend_ids, visible_to_friends=True)
        )

    def perform_update(self, serializer):
        event = self.get_object()
        user = self.request.user

        if event.user != user:
            raise PermissionDenied("You do not have permission to modify this event.")
        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user

        if instance.user != user:
            raise PermissionDenied("You do not have permission to delete this event.")
        instance.delete()

# Own Wishlist: Retrieve, Update, Delete
class OwnWishlistRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Wishlist.objects.get(user=self.request.user)


# Own Wishlist Items: Create
class OwnWishlistItemCreateView(generics.CreateAPIView):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        wishlist = Wishlist.objects.get(user=self.request.user)
        serializer.save(wishlist=wishlist)

# Own Wishlist Items: Retrieve, Update, Delete
class OwnWishlistItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishlistItem.objects.filter(wishlist__user=self.request.user)

# Friend's Wishlist: Read Only
class FriendWishlistRetrieveView(generics.RetrieveAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        friend_id = self.kwargs['friend_id']

        friendship_exists = Friendship.objects.filter(
            Q(from_user=user, to_user_id=friend_id, status='A') |
            Q(from_user_id=friend_id, to_user=user, status='A')
        ).exists()

        if not friendship_exists:
            raise PermissionDenied("You do not have permission to view this wishlist.")

        return Wishlist.objects.get(user_id=friend_id)

# Create a Friendship Request
class FriendshipRequestCreate(generics.CreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)

# List Friendships
class FriendshipListView(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Friendship.objects.filter(to_user=self.request.user)

# Delete a Friendship
class FriendshipDeleteView(generics.DestroyAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'to_user_id'

    def get_queryset(self):
        return Friendship.objects.filter(
            Q(from_user=self.request.user, to_user=self.kwargs['to_user_id']) |
            Q(from_user=self.kwargs['to_user_id'], to_user=self.request.user)
        )

# List Notifications (User can only list their notifications)
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

# Retrieve and Delete a Notification (No update capability)
class NotificationRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
