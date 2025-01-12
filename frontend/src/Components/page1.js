import React from 'react';
import '../style.css';

const Page1 = () => {
  const calculateRoute = () => {
    console.log('Route optimization triggered!');
  };

  return (
    <div>
      <section className="page1">
        <div id="map"></div>
        <div className="container">
          <div className="form">
            <h2>Route Optimization</h2>
            <form id="routeForm" onSubmit={(e) => e.preventDefault()}>
              <div>
                Source Point <br />
                <i className="fa-solid fa-house"></i>
                <input type="text" id="start" placeholder="Address of starting point" />
                <br />
              </div>
              <div>
                Destination Point<br />
                <i className="fa-solid fa-location-dot"></i>
                <input type="text" id="end" placeholder="Address of end point" />
                <br />
              </div>
              <div className="btn_form">
                <button className="one" type="button" onClick={calculateRoute}>
                  Optimize
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page1;
