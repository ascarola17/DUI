// src/App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import HeatMap from './components/HeatMap'; // HeatMap component
import ReportFeature from './components/ReportFeature'; // Report feature component
import RouteComponent from './components/RouteComponent'; // Route component
import DataUploader from './components/DataUploader'; // Data uploader component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Set the default center of the map (El Paso coordinates)
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
  const [showReportList, setShowReportList] = useState(false); // Define state for showing report list
  const [hasNewReport, setHasNewReport] = useState(false); // Define state for indicating new reports
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);  // State to store user's location
  const [directions, setDirections] = useState(null);  // State to store the directions result


  const toggleReports = () => {
    setShowReportList(!showReportList);
    setHasNewReport(false); // Turn off the red dot when the logo is clicked
  };

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
    }
  };

  // Get user's location when the component mounts
  useEffect(() => {
    getCurrentLocation();  // Call the function to get user's location
    getCurrentLocation();
  }, []);

  const onNewReportAdded = () => {
    setHasNewReport(true); // Turn the red dot back on when a new report is added
  };

  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk Heatmap</h1>
      </header>

      <div className="logo-container" onClick={toggleReports}>
        <img src="logo.jpg" alt="DUI Logo" className="logo" />
        <span className={`notification-dot ${!hasNewReport ? 'off' : ''}`}></span>
      </div>

      <div className="content">
        {/* Report Section */}
        <div className="report">
          <h2>Report an Incident</h2>
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
        {showReportList && (
          <ReportFeature showReportList={showReportList} onNewReport={onNewReportAdded} />
        )}

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