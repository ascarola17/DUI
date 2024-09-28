import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import RouteComponent from './components/RouteComponent';
import ReportFeature from './components/ReportFeature';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 31.7619, // Example latitude (El Paso)
  lng: -106.4850, // Example longitude (El Paso)
};

function App() {
  const [showReportList, setShowReportList] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const toggleReports = () => {
    setShowReportList(!showReportList); // Toggle the visibility of the report list
  };

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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>DUI Risk</h1>
      </header>

      <div className="logo-container" onClick={toggleReports}>
        <img src="logo.jpg" alt="Description of image" className="logo" />
        {<span className="notification-dot"></span>}
      </div>

      <div className="content">
        {/* Report Section */}
        {showReportList && (
          <ReportFeature />  // Conditionally render the ReportFeature when showReports is true
        )}

        {/* Map Section */}
        <div className="map">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation ? userLocation : defaultCenter}
              zoom={userLocation ? 14 : 9}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  }}
                />
              )}
              <RouteComponent userLocation={userLocation} mapCenter={userLocation || defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;