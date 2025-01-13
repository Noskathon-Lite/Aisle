from django.contrib import admin
from .models import Location, Route, OptimizationResult

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'latitude', 'longitude')  # Fields to display in the admin list view

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_location', 'end_location', 'created_at')

@admin.register(OptimizationResult)
class OptimizationResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'route', 'total_distance', 'total_time', 'created_at')
