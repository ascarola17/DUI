// src/components/RouteComponent.js
import React, { useState } from 'react';

const RouteComponent = ({ userLocation, setDirections }) => {
  // State for storing the origin (default to user's location) and destination
  const [origin, setOrigin] = useState(userLocation ? `${userLocation.lat},${userLocation.lng}` : '');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState(null);  // State to store any errors related to fetching directions

  // Debugging log to ensure setDirections is received correctly from App.js
  console.log("Received setDirections function in RouteComponent:", setDirections);

  // Handle form submission to get directions
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent form from refreshing the page

    // Check if both origin and destination are provided
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }

    // Set up options for the DirectionsService
    const DirectionsServiceOptions = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'  // Specify driving as the travel mode
    };

    // Create a new DirectionsService instance to request route information
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(DirectionsServiceOptions, (result, status) => {
      // Check if the Directions API returned a valid result
      if (status === window.google.maps.DirectionsStatus.OK) {
        console.log("Received directions:", result);  // Debugging log for the returned directions
        setDirections(result);  // Pass the directions result to App.js using setDirections
      } else {
        console.error('Directions request failed:', result);  // Log any errors from the Directions API
        setError('Failed to get directions.');  // Set error message
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter current location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}  // Update origin as user types
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}  // Update destination as user types
        />
        <button type="submit">Get Directions</button>  {/* Button to submit the form and get directions */}
      </form>

      {/* Show error message if the directions request fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RouteComponent;
