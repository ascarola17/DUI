import './App.css';
import DataUploader from './components/DataUploader';  // Ensure the path to DataUploader is correct
import React, { useState, useEffect } from 'react';  // Add this line
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';  // Import the new route component

const containerStyle = {
  width: '100%',
  height: '400px'
};

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
    <div className="App">
      <h1>My Google Maps Integration</h1>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Other child components like markers can be added here */}
          <RouteComponent userLocation={userLocation} mapCenter={center} />
        </GoogleMap>
      </LoadScript>

      {/*Similauted Data Uploaded here */}
      {/*<DataUploader /> */}
    </div>
  );
}

export default App;
