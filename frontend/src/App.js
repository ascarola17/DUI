import './App.css';
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Set the center of the map as a fallback if user location is unavailable
const defaultCenter = {
  lat: 31.7619, // Example latitude (El Paso)
  lng: -106.4850 // Example longitude (El Paso)
};

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk</h1>
      </header>

      <div className="content">
        {/* Report Section */}
        <div className="report">
          <h2>Report</h2>
          <p>Report content will go here.</p>
        </div>

        {/* Route Input Section */}
        <div className="route-input">
          <h2>Get Directions</h2>
          <RouteComponent />
        </div>

        {/* Map Section */}
        <div className="map">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}

            loadingElement={<div>Loading Map...</div>}  // Add async loading element
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}  // Center map on default location
              zoom={9}  // Default zoom level
            >
              {/* The route will be rendered by the DirectionsRenderer in RouteComponent */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default App;
