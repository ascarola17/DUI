// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';  // Import DirectionsRenderer
import RouteComponent from './components/RouteComponent';  // Import RouteComponent
import ReportFeature from './components/ReportFeature';    // Import ReportFeature
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';
import ReportFeature from './components/ReportFeature';
import HeatMap from './components/HeatMap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Set the center of the map as a fallback if user location is unavailable
const defaultCenter = {
  lat: 31.7619, // El Paso latitude
  lng: -106.4850, // El Paso longitude
};

function App() {
  const [userLocation, setUserLocation] = useState(null);  // State to store user's location
  const [directions, setDirections] = useState(null);  // State to store the directions result

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // If geolocation is supported, get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          toast.error("Unable to access your location.");  // Show error message if location cannot be retrieved
        (error) => {
          console.error('Error obtaining location:', error);
          toast.error('Unable to access your location.');
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");  // Show error if geolocation is unsupported
      alert('Geolocation is not supported by this browser.');
    }
  };

  // useEffect to get the user's location when the component mounts
  useEffect(() => {
    getCurrentLocation();  // Call the function to get user's location
    getCurrentLocation();
  }, []);

  // Debugging log to ensure that setDirections is passed correctly
  console.log("setDirections function in App.js:", setDirections);

  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk</h1>  {/* App title */}
      </header>

      <div className="content">
        {/* Report Section */}
        <div className="report">
          <h2>Report</h2>
          <ReportFeature /> {/* Integrate ReportFeature component */}
        </div>

        {/* Inputs for Route Calculation */}
        <div className="route-section">
          {/* Pass setDirections to RouteComponent for handling directions */}
          <RouteComponent userLocation={userLocation} setDirections={setDirections} />
        </div>

        {/* Map Section */}
        <div className="map">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={['visualization']} // Include 'visualization' library for HeatMap
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}  // Map container style
              center={userLocation ? userLocation : { lat: 31.7619, lng: -106.4850 }}  // Center the map on user location if available
              zoom={userLocation ? 14 : 9}  // Adjust zoom based on whether user location is available
              mapContainerStyle={containerStyle}
              center={userLocation ? userLocation : defaultCenter} // Center map on userLocation when available
              zoom={userLocation ? 14 : 12} // Zoom in closer when userLocation is available
            >
              {/* Render the directions on the map if available */}
              {directions && <DirectionsRenderer directions={directions} />}
              {/* If userLocation is available, render a marker */}
              {userLocation && (
                <Marker
                  position={userLocation} // Show the marker at user's location
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Optional: Blue dot icon
                  }}
                />
              )}

              {/* Render HeatMap Component */}
              <HeatMap />

              {/* Render Route Component */}
              <RouteComponent
                userLocation={userLocation}
                mapCenter={userLocation || defaultCenter}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Toast Notifications for error messages */}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
