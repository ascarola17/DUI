// src/components/RouteComponent.js
import React, { useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const RouteComponent = ({ userLocation, mapCenter }) => {
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState('');
  const [routeRequested, setRouteRequested] = useState(false);

  // Handle form submission for getting the route
  const handleSubmit = (e) => {
    e.preventDefault();
    setRouteRequested(true);  // Indicate that route has been requested
  };

  // Handle destination input change
  const handleChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <div>
      {/* Form to input the destination */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter destination" 
          value={destination}
          onChange={handleChange}
        />
        <button type="submit">Get Route</button>
      </form>

      {/* DirectionsService to request the route */}
      {routeRequested && userLocation && (
        <DirectionsService
          options={{
            destination: destination,
            origin: userLocation,
            travelMode: 'DRIVING',  // You can change to 'WALKING', 'BICYCLING', etc.
          }}
          callback={(response) => {
            if (response !== null && response.status === 'OK') {
              setDirections(response);  // Set directions to render the route
            } else {
              console.log('Directions request failed');
            }
          }}
        />
      )}

      {/* DirectionsRenderer to render the route on the map */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
        />
      )}
    </div>
  );
};

export default RouteComponent;
