import React from 'react';
import '../style.css';

const footer = () => {
  return (
    <div>
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
  )
}

export default footer