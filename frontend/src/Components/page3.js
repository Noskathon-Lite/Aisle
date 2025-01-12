import React from 'react';
import Image from '../Components/imgs.jpg';  

const page3 = () => {
  return (
    <div>
      <section className="page3-section">
        <div className="page3-content">
          <h2>Route Optimization for Your Convenience</h2>
          <p>Our advanced route optimization technology ensures that you get the most efficient paths for your journeys. Save time, reduce fuel consumption, and avoid unnecessary delays.</p>
          <p>With real-time data, we help you navigate through the best possible routes whether you're commuting daily or planning a longer trip.</p>
        </div>
        <div className="page3-image">
          <img src={Image} alt="Route Optimization" className="page3-img" /> {/* Image added here */}
        </div>
      </section>
    </div>
  );
}

export default page3;
