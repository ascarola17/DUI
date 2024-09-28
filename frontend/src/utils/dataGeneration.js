// src/utils/dataGeneration.js

// Function to generate a random latitude or longitude within a range
const generateRandomCoordinate = (min, max) => Math.random() * (max - min) + min;

// Define the boundaries (latitude and longitude ranges) for each city
const cityBoundaries = {
  "El Paso": { 
    latMin: 31.7000, latMax: 31.8000,  // Latitude range for El Paso
    lngMin: -106.5200, lngMax: -106.4000  // Longitude range for El Paso
  },
  "Las Vegas": { 
    latMin: 36.1000, latMax: 36.2000,  // Latitude range for Las Vegas
    lngMin: -115.2000, lngMax: -115.1000  // Longitude range for Las Vegas
  },
  "Phoenix": { 
    latMin: 33.4000, latMax: 33.5000,  // Latitude range for Phoenix
    lngMin: -112.1000, lngMax: -112.0000  // Longitude range for Phoenix
  }
};

// Function to generate incidents for a given city
export const generateCityIncidents = (city, numberOfIncidents) => {
  const incidents = [];
  const boundaries = cityBoundaries[city];

  for (let i = 0; i < numberOfIncidents; i++) {
    incidents.push({
      city: city,
      latitude: generateRandomCoordinate(boundaries.latMin, boundaries.latMax),
      longitude: generateRandomCoordinate(boundaries.lngMin, boundaries.lngMax),
      severity: Math.floor(Math.random() * 5) + 1,  // Random severity between 1 and 5
      date: new Date().toISOString().slice(0, 10)  // Today's date in YYYY-MM-DD format
    });
  }

  return incidents;
};
