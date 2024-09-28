import './App.css';
import DataUploader from './components/DataUploader';  // Ensure the path to DataUploader is correct
import React, { useState, useEffect } from 'react';  // Add this line
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';  // Import the new route component

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
  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Get user's location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

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
              {/* If userLocation is available, render a marker */}
              {userLocation && (
                <Marker
                  position={userLocation}  // Show the marker at user's location
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'  // Optional: Blue dot icon
                  }}
                />
              )}

              {/* Render Route Component */}
              <RouteComponent userLocation={userLocation} mapCenter={center} />
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
