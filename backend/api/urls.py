from django.urls import path
from .views import (
    RegisterView,
    UserProfileView,
    LoginView,
    RefreshTokenView,
    EventListCreate,
    EventRetrieveUpdateDestroy,
    WishlistListCreate,
    WishlistRetrieveUpdateDestroy,
    WishlistItemCreate,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-retrieve-update-destroy'),
    path('wishlists/', WishlistListCreate.as_view(), name='wishlist-list-create'),
    path('wishlists/<int:pk>/', WishlistRetrieveUpdateDestroy.as_view(), name='wishlist-retrieve-update-destroy'),
    path('wishlists/<int:pk>/item/', WishlistItemCreate.as_view(), name='wishlist-item-create'),
]
