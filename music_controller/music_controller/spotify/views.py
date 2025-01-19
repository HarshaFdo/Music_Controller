from django.shortcuts import render
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post

class AuthURL(APIView):
  def get(self, request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currectly-playing'

    url = Request('GET', 'https://accounts.spotify.com/authorize' params={
      'scope' : scopes,
      'respose_type' : 'code',
      'redirect_uri' : REDIRECT_URI,
    })