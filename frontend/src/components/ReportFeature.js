// src/components/ReportFeature.js
import React, { useState } from 'react';
import ReportButton from './ReportButton';
import { getCurrentLocation } from '../utils/getLocation';
import { startSpeechRecognition } from '../utils/speechToText';
import { toast } from 'react-toastify';

const ReportFeature = () => {
  const [isListening, setIsListening] = useState(false);
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem('reports');
    return savedReports ? JSON.parse(savedReports) : [];
  });

  const handleReport = async () => {
    try {
      // Step 1: Capture Location
      const location = await getCurrentLocation();

      // Step 2: Start Speech Recognition
      setIsListening(true);
      const transcription = await startSpeechRecognition();
      setIsListening(false);

      // Step 3: Create Report Object
      const newReport = {
        id: Date.now(),
        description: transcription,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: new Date().toISOString(),
      };

      // Step 4: Update Local State and Local Storage
      setReports((prevReports) => {
        const updatedReports = [...prevReports, newReport];
        localStorage.setItem('reports', JSON.stringify(updatedReports));
        return updatedReports;
      });

      // Step 5: Notify User
      toast.success('Report submitted successfully!');
    } catch (error) {
      setIsListening(false);
      console.error('Error during report submission:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <ReportButton onReport={handleReport} />
      {isListening && (
        <div style={listeningStyle}>
          Listening...
        </div>
      )}
      {/* Display Reports */}
      <div style={reportsContainerStyle}>
        <h2>Recent Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <ul>
            {reports.map((report) => (
              <li key={report.id}>
                <strong>{new Date(report.timestamp).toLocaleString()}</strong>: {report.description} <br />
                Location: ({report.latitude.toFixed(4)}, {report.longitude.toFixed(4)})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

// Inline styles for simplicity
const listeningStyle = {
  position: 'fixed',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  zIndex: 1000,
};

const reportsContainerStyle = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  width: '300px',
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  zIndex: 999,
};

export default ReportFeature;
