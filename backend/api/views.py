from rest_framework import generics, permissions
from .models import Event, Wishlist, WishlistItem, Friendship
from django.contrib.auth.models import User
from .serializers import EventSerializer, RegisterSerializer, UserSerializer, WishlistSerializer, WishlistItemSerializer, FriendshipSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

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

# List and Create Events
class EventListCreate(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        friends = Friendship.objects.filter(
            from_user=user, status='A'
        ).values_list('to_user', flat=True) | Friendship.objects.filter(
            to_user=user, status='A'
        ).values_list('from_user', flat=True)

        return Event.objects.filter(
            (Q(user=user) | Q(user__in=friends, visible_to_friends=True))
        )

# Retrieve, Update, and Delete an Event
class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# List and Create Wishlists
class WishlistListCreate(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        friends = Friendship.objects.filter(
            from_user=user, status='A'
        ).values_list('to_user', flat=True) | Friendship.objects.filter(
            to_user=user, status='A'
        ).values_list('from_user', flat=True)
        
        return Wishlist.objects.filter(
            (Q(user=user) | Q(user__in=friends, visible_to_friends=True))
        )

# Retrieve, Update, and Delete a Wishlist
class WishlistRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

# Add item to a Wishlist
class WishlistItemCreate(generics.CreateAPIView):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        wishlist = Wishlist.objects.get(pk=self.kwargs['pk'], user=self.request.user)
        serializer.save(wishlist=wishlist)

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

    def get_queryset(self):
        return Friendship.objects.filter(
            from_user=self.request.user,
            to_user=self.kwargs['to_user_id']
        ) | Friendship.objects.filter(
            from_user=self.kwargs['to_user_id'],
            to_user=self.request.user
        )