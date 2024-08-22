from rest_framework import generics
from .models import Event
from django.contrib.auth.models import User
from .serializers import EventSerializer, RegisterSerializer, UserSerializer
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

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
