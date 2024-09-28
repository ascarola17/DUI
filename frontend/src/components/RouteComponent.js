import React, { useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const RouteComponent = ({ userLocation }) => {
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState('');
  const [routeRequested, setRouteRequested] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission for getting the route
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    console.log("Form submitted. Origin:", origin, "Destination:", destination);  // Check if the form is submitted
    
    if (origin.trim() === '' || destination.trim() === '') {
      alert('Please enter both the current location and destination!');
      return;
    }
    
    setRouteRequested(true);  // Indicate that route has been requested
    setError(null);  // Clear any previous errors
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

      {/* Show error message if route fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* DirectionsService to request the route */}
      {routeRequested && (
  <DirectionsService
    options={{
      destination: destination,
      origin: origin,
      travelMode: 'DRIVING',  // You can change this to 'WALKING' or 'BICYCLING' for testing
    }}
    callback={(response, status) => {
      console.log("Directions API response:", response, "Status:", status);  // Log the API response
      if (status === 'OK' && response !== null) {
        setDirections(response);  // Set the route response
      } else {
        setError('Failed to get directions, please try again.');
        console.log('Directions request failed:', response);
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
