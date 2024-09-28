// src/components/DataUploader.js
import React, { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Correct path to firebase.js
import { generateCityIncidents } from '../utils/dataGeneration';  // Import data generation script

const DataUploader = () => {
  // Function to upload incidents to Firebase
  const uploadDataToFirebase = async () => {
    // Generate incidents for each city
    const elPasoIncidents = generateCityIncidents('El Paso', 50);
    const lasVegasIncidents = generateCityIncidents('Las Vegas', 50);
    const phoenixIncidents = generateCityIncidents('Phoenix', 50);

    // Combine all incidents into one array
    const allIncidents = [...elPasoIncidents, ...lasVegasIncidents, ...phoenixIncidents];

    try {
      // Loop through each incident and upload it to Firestore
      for (const incident of allIncidents) {
        await addDoc(collection(db, "drunkDrivingIncidents"), {
          city: incident.city,
          latitude: incident.latitude,
          longitude: incident.longitude,
          severity: incident.severity,
          date: incident.date
        });
      }
      console.log("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  // Use useEffect to automatically upload data on component mount
  useEffect(() => {
    uploadDataToFirebase();
  }, []);

  return (
    <div>
    {/* <h2>Uploading Data to Firebase...</h2>*/ } 
    </div>
  );
};

export default DataUploader;
