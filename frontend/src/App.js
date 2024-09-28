import './App.css';
import DataUploader from './components/DataUploader';  // Ensure the path to DataUploader is correct
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Set the center of the map
const center = {
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

        {/* Map Section */}
        <div className="map">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={9}
            >
              {/* Additional Map components (like markers) can go here */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Simulated Data Uploader */}
      <DataUploader />
    </div>
  );
}

export default App;