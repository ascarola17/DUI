// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';  // Import DirectionsRenderer
import RouteComponent from './components/RouteComponent';  // Import RouteComponent
import ReportFeature from './components/ReportFeature';
import HeatMap from './components/HeatMap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Logo from './Logo.webp'; // Make sure the path is correct

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Set the center of the map as a fallback if user location is unavailable
const defaultCenter = {
  lat: 31.7619, // El Paso latitude
  lng: -106.4850, // El Paso longitude
};

// Example high-risk zones (replace with actual data)
const highRiskZones = [
  { lat: 31.7641, lng: -106.4900 },  // Example of a high-risk area
  { lat: 31.7622, lng: -106.4875 },  // Another example of a high-risk area
];


function App() {
  // State for controlling dropdown and notification dot
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasIssues, setHasIssues] = useState(true);  // Example: Assume there's an issue
  const [userLocation, setUserLocation] = useState(null);  // State to store user's location
  const [directions, setDirections] = useState(null);  // State to store the directions result

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setHasIssues(false);
  };

  
  // Function to get user's current location
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
      toast.error("Geolocation is not supported by this browser.");
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

      {/* Logo with a notification dot (conditionally rendered based on hasIssues) */}
      <div className="logo-container" onClick={toggleDropdown}>
        <img src="logo.jpg" alt="Description of image" className="logo" />
        {hasIssues && <span className="notification-dot"></span>} {/* Use the hasIssues state here */}
      </div>

      <div className="content">
        {/* Report Section */}
        <div className="report">
          <h2>Report</h2>
          <ReportFeature /> {/* Integrate ReportFeature component */}
        </div>

        {/* Inputs for Route Calculation */}
        <div className="route-section">
          {/* Pass setDirections to RouteComponent for handling directions */}
          <RouteComponent 
            userLocation={userLocation} 
            setDirections={setDirections} 
            highRiskZones={highRiskZones}  // Pass the high-risk zones to RouteComponent
          />
        </div>
          <ReportFeature />  {/* Integrate ReportFeature component */}

        {/* Map Section */}
        <div className="map">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={['visualization','places']} // Include 'visualization' library for HeatMap
          >
            <GoogleMap
              mapContainerStyle={containerStyle}  // Map container style
              center={userLocation ? userLocation : defaultCenter}  // Center the map on user location if available
              zoom={userLocation ? 14 : 9}  // Adjust zoom based on whether user location is available
            >
              {directions && (
          <>
              {console.log("Rendering Directions:", directions)}  // Add this to debug
            <DirectionsRenderer directions={directions} />
            </>
            )}

              {/* Render HeatMap Component */}
              <HeatMap />

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
