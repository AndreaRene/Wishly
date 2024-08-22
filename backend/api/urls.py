from django.urls import path
from .views import (
    RegisterView,
    UserProfileView,
    LoginView,
    RefreshTokenView,
    EventListCreate,
    EventRetrieveUpdateDestroy
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-retrieve-update-destroy'),
]
