// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';  // Import the new route component
import ReportFeature from './components/ReportFeature';    // Import the ReportFeature component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Logo from './Logo.webp'; // Make sure the path is correct

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Set the center of the map as a fallback if user location is unavailable
const defaultCenter = {
  lat: 31.7619, // Example latitude (El Paso)
  lng: -106.4850, // Example longitude (El Paso)
};

function App() {
  // State for controlling dropdown and notification dot
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasIssues, setHasIssues] = useState(true);  // Example: Assume there's an issue

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setHasIssues(false);
  };

  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error("Error obtaining location:", error);
          toast.error("Unable to access your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Get user's location when component mounts
  useEffect(() => {
    getCurrentLocation();
    // Optionally, set up a watcher for location changes
    // const watchId = navigator.geolocation.watchPosition(position => {
    //   setUserLocation({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   });
    // });
    // return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk</h1>
      </header>

      {/* Logo with a notification dot (conditionally rendered based on hasIssues) */}
      <div className="logo-container" onClick={toggleDropdown}>
        <img src="logo.jpg" alt="Description of image" className="logo" />
        {hasIssues && <span className="notification-dot"></span>} {/* Use the hasIssues state here */}
      </div>

      <div className="content">
        {/* Report Section */}
          <ReportFeature />  {/* Integrate ReportFeature component */}

        {/* Map Section */}
        <div className="map">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation ? userLocation : defaultCenter}  // Center map on userLocation when available
              zoom={userLocation ? 14 : 9}  // Zoom in closer when userLocation is available
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
              <RouteComponent userLocation={userLocation} mapCenter={userLocation || defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Simulated Data Uploader */}
      {/* <DataUploader /> */}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
