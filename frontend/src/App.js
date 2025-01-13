import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Importing leaflet-routing-machine
import logo from './logo.png';
import './style.css';
import Page2 from './Components/page2';
import Page3 from './Components/page3';
import 'leaflet/dist/leaflet.css';
import Footer from './Components/footer';
import 'font-awesome/css/font-awesome.min.css';

// Import Leaflet default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet default marker icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor for the bottom of the icon
  popupAnchor: [1, -34], // Popup anchor point
  tooltipAnchor: [16, -28], // Tooltip anchor point
  shadowSize: [41, 41], // Shadow size
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const mapRef = useRef(null);
  const [routeControl, setRouteControl] = useState(null);  // State to hold the route control instance

  useEffect(() => {
    if (!mapRef.current) {
      const nepalCenter = [28.3949, 84.1240]; // Latitude and Longitude of Nepal
      const zoomLevel = 7; // Adjusted zoom level for Nepal

      const mapInstance = L.map('map').setView(nepalCenter, zoomLevel);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
  }, []);

  const calculateRoute = () => {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    if (!start || !end) {
      alert('Please provide both start and end points.');
      return;
    }

    // Clear existing route if any
    if (routeControl) {
      routeControl.setWaypoints([]);
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
      .then(response => response.json())
      .then(startData => {
        const startCoords = startData[0];

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
          .then(response => response.json())
          .then(endData => {
            const endCoords = endData[0];

            if (mapRef.current) {
              L.marker([startCoords.lat, startCoords.lon]).addTo(mapRef.current).bindPopup("Start Point").openPopup();
              L.marker([endCoords.lat, endCoords.lon]).addTo(mapRef.current).bindPopup("End Point").openPopup();

              // Create a route control for routing between start and end
              const newRouteControl = L.Routing.control({
                waypoints: [
                  L.latLng(startCoords.lat, startCoords.lon),
                  L.latLng(endCoords.lat, endCoords.lon)
                ],
                routeWhileDragging: true, // Optional: allows you to drag the route while editing
              }).addTo(mapRef.current);

              setRouteControl(newRouteControl);  // Update routeControl state
            }
          });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <img src={logo} className="logo" alt="logo" />
          <nav>
            <ul className="nav_links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div className="butn">
            <a className="login" href="#"><button>Login</button></a>
            <a className="sign_up" href="#"><button>Sign Up</button></a>
          </div>
        </div>
      </header>

      <section className="page1">
        <div id="map"></div>
        <div className="container">
          <div className="form">
            <h2>Route Optimization</h2>
            <form id="routeForm" onSubmit={e => e.preventDefault()}>
              <div>
                Source Point <br /><i className="fa-solid fa-house"></i>
                <input type="text" id="start" placeholder="Address of starting point" /><br />
              </div>
              <div>
                Destination Point<br /><i className="fa-solid fa-location-dot"></i>
                <input type="text" id="end" placeholder="Address of end point" /><br />
              </div>
              <div className="btn_form">
                <button className="one" type="button" onClick={calculateRoute}>Optimize</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Page2 />
      <Page3 />
      <Footer />
    </div>
  );
}

export default App;
