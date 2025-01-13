from django.urls import path
from .views import LocationList

urlpatterns = [
    path('api/locations/', LocationList.as_view(), name='location_list'),
]
