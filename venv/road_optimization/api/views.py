from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Location
from .serializer import LocationSerializer

class LocationList(APIView):
    def get(self, request):
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)
