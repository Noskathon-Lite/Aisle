import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import logo from './logo.png';
import './style.css';
import Page2 from './Components/page2';
import Page3 from './Components/page3';
import Page1 from './Components/page1';
import Footer from './Components/footer';

function App() {
  const mapRef = useRef(null);

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

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
      .then(response => response.json())
      .then(startData => {
        const startCoords = startData[0];
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
          .then(response => response.json())
          .then(endData => {
            const endCoords = endData[0];

            if (mapRef.current) {  // Ensure map is defined
              L.marker([startCoords.lat, startCoords.lon]).addTo(mapRef.current).bindPopup("Start Point").openPopup();
              L.marker([endCoords.lat, endCoords.lon]).addTo(mapRef.current).bindPopup("End Point").openPopup();

              console.log('Start:', startCoords);
              console.log('End:', endCoords);
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


<Page1></Page1>
<Page2></Page2>
<Page3></Page3>
<Footer></Footer>  

    </div>
  );
}

export default App;
