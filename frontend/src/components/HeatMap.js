import React, { useEffect, useState } from 'react';
import { HeatmapLayer } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure your Firebase config is correct
import coordinates from '../coordinates.json'; // Adjust the path as necessary

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps API is not loaded');
      return;
    }

    const fetchData = async () => {
      let data = [];
      try {
        // Attempt to fetch data from Firebase
        const reportsCollection = collection(db, 'drunkDrivingIncidents');
        const snapshot = await getDocs(reportsCollection);
        data = snapshot.docs.map((doc) => doc.data());
        console.log('Fetched data from Firebase:', data);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        if (error.code === 'resource-exhausted') {
          console.error('Firebase quota exceeded. Falling back to JSON data.');
        } else {
          console.error('An error occurred while fetching data. Falling back to JSON data.');
        }
        // Fallback to JSON data
        data = transformCoordinatesData();
      }

      // Process data to create heatmapData
      const locations = data
        .filter((point) => point.latitude && point.longitude)
        .map((point) => {
          const location = new window.google.maps.LatLng(point.latitude, point.longitude);
          return {
            location,
            weight: point.weight || 1,
          };
        });

      setHeatmapData(locations);
    };

    const transformCoordinatesData = () => {
      let data = [];

      Object.keys(coordinates).forEach((cityKey) => {
        const cityCoordinates = coordinates[cityKey];

        cityCoordinates.forEach((coordinatePair) => {
          coordinatePair.forEach((point) => {
            const [latitude, longitude] = point;
            data.push({
              latitude,
              longitude,
              weight: 1, // Adjust weight as needed
            });
          });
        });
      });

      return data;
    };

    fetchData();
  }, []);

  // Custom gradient for high-risk zones
  const gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(255, 0, 127, 1)',
    'rgba(255, 0, 0, 1)',
  ];

  return (
    <>
      {heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 30,
            opacity: 0.8,
            gradient: gradient,
          }}
        />
      )}
    </>
  );
};

export default HeatMap;
