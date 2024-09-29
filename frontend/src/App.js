// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import HeatMap from './components/HeatMap'; // HeatMap component
import ReportFeature from './components/ReportFeature'; // Report feature component
import RouteComponent from './components/RouteComponent'; // Route component
import DataUploader from './components/DataUploader'; // Data uploader component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100vh', // Full viewport height
};

// Set the default center of the map (El Paso coordinates)
const defaultCenter = {
  lat: 31.7619, // El Paso latitude
  lng: -106.4850, // El Paso longitude
};

function App() {
  const [userLocation, setUserLocation] = useState(null);

  // Function to get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error obtaining location:', error);
          toast.error('Unable to access your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Get user's location when the component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk Heatmap</h1>
      </header>

      <div className="content">
        {/* Report Section */}
        <div className="report">
          <h2>Report an Incident</h2>
          <ReportFeature /> {/* Integrate ReportFeature component */}
        </div>

        {/* Map Section */}
        <div className="map">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Ensure your API key is set in .env
            libraries={['visualization']} // Include 'visualization' library for HeatMap
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation ? userLocation : defaultCenter} // Center map on userLocation if available
              zoom={userLocation ? 14 : 12} // Zoom in if userLocation is available
            >
              {/* User Location Marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue marker for user location
                  }}
                />
              )}

              {/* HeatMap Component */}
              <HeatMap />

              {/* Route Component */}
              <RouteComponent
                userLocation={userLocation}
                mapCenter={userLocation || defaultCenter}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* DataUploader Component */}
      {/* 
        Uncomment the line below to upload data to Firestore.
        Ensure that you only upload data once to prevent duplicates.
        After uploading, it's recommended to remove or comment out this component.
      */}
     {/*<DataUploader />*/}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
