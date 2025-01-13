from django.db import models

from django.db import models

# Model to store location details
class Location(models.Model):
    name = models.CharField(max_length=100)  # Name of the location
    latitude = models.FloatField()           # Latitude coordinate
    longitude = models.FloatField()          # Longitude coordinate

    def __str__(self):
        return self.name


# Model to store route details
class Route(models.Model):
    start_location = models.ForeignKey(Location, related_name='start_routes', on_delete=models.CASCADE)
    end_location = models.ForeignKey(Location, related_name='end_routes', on_delete=models.CASCADE)
    waypoints = models.ManyToManyField(Location, related_name='waypoint_routes', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the route was created

    def __str__(self):
        return f"Route from {self.start_location.name} to {self.end_location.name}"


# Model to store optimization results
class OptimizationResult(models.Model):
    route = models.OneToOneField(Route, on_delete=models.CASCADE, related_name='optimization_result')
    optimized_path = models.TextField()  
    total_distance = models.FloatField()  
    total_time = models.FloatField()  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Optimized result for {self.route}"