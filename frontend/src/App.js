// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';  // Import DirectionsRenderer
import RouteComponent from './components/RouteComponent';  // Import RouteComponent
import ReportFeature from './components/ReportFeature';    // Import ReportFeature
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userLocation, setUserLocation] = useState(null);  // State to store user's location
  const [directions, setDirections] = useState(null);  // State to store the directions result

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // If geolocation is supported, get the current position
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          toast.error("Unable to access your location.");  // Show error message if location cannot be retrieved
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");  // Show error if geolocation is unsupported
    }
  };

  // useEffect to get the user's location when the component mounts
  useEffect(() => {
    getCurrentLocation();  // Call the function to get user's location
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
          <ReportFeature />  {/* Integrate ReportFeature component */}
        </div>

        {/* Inputs for Route Calculation */}
        <div className="route-section">
          {/* Pass setDirections to RouteComponent for handling directions */}
          <RouteComponent userLocation={userLocation} setDirections={setDirections} />
        </div>

        {/* Map Section */}
        <div className="map">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}  // Map container style
              center={userLocation ? userLocation : { lat: 31.7619, lng: -106.4850 }}  // Center the map on user location if available
              zoom={userLocation ? 14 : 9}  // Adjust zoom based on whether user location is available
            >
              {/* Render the directions on the map if available */}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Toast Notifications for error messages */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
