import './App.css';
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Define your map container style
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Set the center of the map
const center = {
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

      {/* Logo with a notification dot (conditionally rendered based on hasIssues) */}
      <div className="logo-container" onClick={toggleDropdown}>
        <img src="your-logo-url.png" alt="Logo" className="logo" />
        {hasIssues && <span className="notification-dot"></span>} {/* Use the hasIssues state here */}
      </div>

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
      {/*<DataUploader />*/}
    </div>
  );
}

export default App;
