
import React, { useState } from 'react';

const RouteComponent = ({ userLocation, setDirections, highRiskZones }) => {
  const [origin, setOrigin] = useState(userLocation ? `${userLocation.lat},${userLocation.lng}` : '');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState(null);
  const [directionsResult, setDirectionsResult] = useState(null); // Store the entire DirectionsResult
  const [showOptions, setShowOptions] = useState(false);

  const isRouteSafe = (route, heatZones) => {
    // Implement your safety logic here
    return true; // Placeholder
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }

    const DirectionsServiceOptions = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true,
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(DirectionsServiceOptions, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        console.log("Received directions:", result);

        setDirectionsResult(result); // Store the entire DirectionsResult
        setShowOptions(true);
      } else {
        console.error('Directions request failed:', result);
        setError('Failed to get directions.');
      }
    });
  };

  const chooseFastestRoute = () => {
    const fastestRouteIndex = 0; // Assuming the first route is the fastest
    const newDirectionsResult = {
      ...directionsResult,
      routes: [directionsResult.routes[fastestRouteIndex]],
    };
    setDirections(newDirectionsResult);
    setShowOptions(false);
  };

  const chooseSafestRoute = () => {
    const safeRoutes = directionsResult.routes.filter((route) => isRouteSafe(route, highRiskZones));
    if (safeRoutes.length > 0) {
      const newDirectionsResult = {
        ...directionsResult,
        routes: [safeRoutes[0]], // Take the first safe route
      };
      setDirections(newDirectionsResult);
    } else {
      alert("No safe routes available, defaulting to fastest route.");
      chooseFastestRoute(); // Fall back to the fastest route
    }
    setShowOptions(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter current location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {showOptions && (
        <div>
          <button onClick={chooseFastestRoute}>Take Fastest Route</button>
          <button onClick={chooseSafestRoute}>Take Safest Route</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RouteComponent;
