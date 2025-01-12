import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import logo from './logo.png';
import './style.css';
import Page2 from './Components/page2';
import Page3 from './Components/page3';

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

<Page2></Page2>
<Page3></Page3>
    

    <section className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>About RoadWay</h4>
          <ul className="links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Customer Success</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Explore Route Optimization</h4>
          <ul className="links">
            <li><a href="#">Route Planning</a></li>
            <li><a href="#">Traffic Alerts</a></li>
            <li><a href="#">Best Routes</a></li>
            <li><a href="#">Real-time Navigation</a></li>
            <li><a href="#">Fleet Management</a></li>
            <li><a href="#">User Reviews</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal & Privacy</h4>
          <ul className="links">
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">GDPR Compliance</a></li>
            <li><a href="#">Data Security</a></li>
            <li><a href="#">Customer Testimonials</a></li>
            <li><a href="#">Press Kit</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p>Stay ahead with new features and enhancements to make your daily commute or long-distance trips smarter and faster.</p>
          <form action="#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className="icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}

export default App;
