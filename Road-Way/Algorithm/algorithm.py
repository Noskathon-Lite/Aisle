import pandas as pd
import numpy as np
import folium
import osmnx as ox
import networkx as nx
from ortools.constraint_solver import pywrapcp
from ortools.constraint_solver import routing_enums_pb2

# Load Dataset
dataset_file = "kathmandu_valley_cities.csv"  # Update with your actual file path
city = "Kathmandu"

# Load and filter the dataset
dtf = pd.read_csv(dataset_file)
dtf = dtf[dtf["District"] == city][["City", "Latitude", "Longitude"]].reset_index(drop=True)
dtf = dtf.reset_index().rename(columns={"index": "id", "Latitude": "y", "Longitude": "x"})
print(f"Total locations: {len(dtf)}")
print(dtf.head())

# Ask for starting and destination points
start_city = input("Enter the name of the starting city: ").strip().lower()
destination_city = input("Enter the name of the destination city: ").strip().lower()

dtf["City_lower"] = dtf["City"].str.lower()
if start_city not in dtf["City_lower"].values or destination_city not in dtf["City_lower"].values:
    raise ValueError("One or both of the specified cities are not in the dataset.")

start = dtf[dtf["City_lower"] == start_city][["y", "x"]].values[0]  # Starting point
destination = dtf[dtf["City_lower"] == destination_city][["y", "x"]].values[0]  # Destination point
print(f"Starting point: {start}, Destination point: {destination}")

# Prepare data
data = dtf.copy()
data["color"] = ''
data.loc[data['City_lower'] == start_city, 'color'] = 'red'  # Mark the starting point
data.loc[data['City_lower'] == destination_city, 'color'] = 'blue'  # Mark the destination point
data.loc[(data['City_lower'] != start_city) & (data['City_lower'] != destination_city), 'color'] = 'black'

# Visualize initial locations on a map
map = folium.Map(location=start, tiles="cartodbpositron", zoom_start=12)
data.apply(lambda row: 
    folium.CircleMarker(
        location=[row["y"], row["x"]],
        color=row["color"], fill=True, radius=5).add_to(map), axis=1)
map.save("initial_map.html")
print("Initial map saved as 'initial_map.html'")

# Build Road Network Graph
print("Building road network graph...")
G = ox.graph_from_point(start, dist=10000, network_type="drive")
G = ox.add_edge_speeds(G)
G = ox.add_edge_travel_times(G)
fig, ax = ox.plot_graph(G, bgcolor="black", node_size=5, node_color="white", figsize=(16, 8))

# Match nodes in the graph to locations in the dataset
dtf["node"] = dtf[["y", "x"]].apply(lambda x: ox.distance.nearest_nodes(G, x[1], x[0]), axis=1)
dtf = dtf.drop_duplicates("node", keep='first')
print(dtf.head())

# Create Distance Matrix
def compute_distance(a, b):
    try:
        return nx.shortest_path_length(G, source=a, target=b, method='dijkstra', weight='travel_time')
    except:
        return np.nan

distance_matrix = np.asarray([[compute_distance(a, b) for b in dtf["node"]] for a in dtf["node"]])
distance_matrix = pd.DataFrame(distance_matrix, columns=dtf["node"].values, index=dtf["node"].values)


# Solve Shortest Path from start to destination
start_node = ox.distance.nearest_nodes(G, start[1], start[0])
destination_node = ox.distance.nearest_nodes(G, destination[1], destination[0])
print(f"Start Node: {start_node}, Destination Node: {destination_node}")

# Shortest Path Calculation using Dijkstra
path = nx.shortest_path(G, source=start_node, target=destination_node, weight='travel_time')
path_distance = nx.shortest_path_length(G, source=start_node, target=destination_node, weight='travel_time')

print(f"Optimized Route (Node IDs): {path}")

# Visualize Route on Map
def visualize_route_on_map(G, path, output_file="route_map.html"):
    route_map = folium.Map(location=start, tiles="cartodbpositron", zoom_start=12)
    
    # Add route
    for i in range(len(path) - 1):
        a, b = path[i], path[i + 1]
        path_coords = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in [a, b]]
        folium.PolyLine(path_coords, color="blue", weight=5, opacity=0.7).add_to(route_map)
    
    # Add start and end markers
    folium.Marker(location=start, popup="Start", icon=folium.Icon(color="green")).add_to(route_map)
    folium.Marker(location=[G.nodes[path[-1]]['y'], G.nodes[path[-1]]['x']],
                  popup="End", icon=folium.Icon(color="red")).add_to(route_map)
    
    route_map.save(output_file)
    print(f"Route map saved as {output_file}")
    return route_map

# Visualize the optimized route on map
visualize_route_on_map(G, path)