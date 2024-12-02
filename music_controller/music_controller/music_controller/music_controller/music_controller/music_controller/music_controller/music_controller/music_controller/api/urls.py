from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, RoomJoin

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('room-join', RoomJoin.as_view())
]