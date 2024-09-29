// src/components/HeatMap.js
import React, { useEffect, useState } from 'react';
import { HeatmapLayer } from '@react-google-maps/api';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (!window.google) return;

    const reportsCollection = collection(db, 'drunkDrivingIncidents');

    const unsubscribe = onSnapshot(reportsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const locations = data
        .filter((report) => report.latitude && report.longitude)
        .map((report) => {
          return {
            location: new window.google.maps.LatLng(report.latitude, report.longitude),
            weight: report.severity || 1,
          };
        });
      setHeatmapData(locations);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 20,
            opacity: 0.6,
          }}
        />
      )}
    </>
  );
};

export default HeatMap;
