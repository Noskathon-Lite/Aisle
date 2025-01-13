from rest_framework import serializers
from .models import Location, Route, OptimizationResult

# Serializer for the Location model
from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

# Serializer for the Route model
class RouteSerializer(serializers.ModelSerializer):
    start_location = LocationSerializer()  # Nested serializer for start location
    end_location = LocationSerializer()    # Nested serializer for end location
    waypoints = LocationSerializer(many=True)  # Nested serializer for waypoints

    class Meta:
        model = Route
        fields = ['id', 'start_location', 'end_location', 'waypoints', 'created_at']

    def create(self, validated_data):
        # Extract nested location data
        start_location_data = validated_data.pop('start_location')
        end_location_data = validated_data.pop('end_location')
        waypoints_data = validated_data.pop('waypoints', [])

        # Create or get the start and end locations
        start_location = Location.objects.get_or_create(**start_location_data)[0]
        end_location = Location.objects.get_or_create(**end_location_data)[0]

        # Create the route
        route = Route.objects.create(
            start_location=start_location,
            end_location=end_location
        )

        # Add waypoints
        for waypoint_data in waypoints_data:
            waypoint = Location.objects.get_or_create(**waypoint_data)[0]
            route.waypoints.add(waypoint)

        return route


# Serializer for the OptimizationResult model
class OptimizationResultSerializer(serializers.ModelSerializer):
    route = RouteSerializer()  # Nested serializer for the associated route

    class Meta:
        model = OptimizationResult
        fields = ['id', 'route', 'optimized_path', 'total_distance', 'total_time', 'created_at']

    def create(self, validated_data):
        # Extract nested route data
        route_data = validated_data.pop('route')
        route_serializer = RouteSerializer(data=route_data)
        route_serializer.is_valid(raise_exception=True)
        route = route_serializer.save()

        # Create the optimization result
        optimization_result = OptimizationResult.objects.create(route=route, **validated_data)
        return optimization_result


# Serializer for the UserRoute model (optional if using authentication)
# class UserRouteSerializer(serializers.ModelSerializer):
#     user = serializers.StringRelatedField()  # Display username as a string
#     route = RouteSerializer()  # Nested serializer for route

#     class Meta:
#         model = UserRoute
#         fields = ['id', 'user', 'route', 'created_at']

#     def create(self, validated_data):
#         # Extract nested route data
#         route_data = validated_data.pop('route')
#         route_serializer = RouteSerializer(data=route_data)
#         route_serializer.is_valid(raise_exception=True)
#         route = route_serializer.save()

#         # Create the user route
#         user_route = UserRoute.objects.create(route=route, **validated_data)
#         return user_route

