// src/components/ReportFeature.js

import React, { useState, useEffect, useRef } from 'react';
import ReportButton from './ReportButton';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReportFeature = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem('reports');
    return savedReports ? JSON.parse(savedReports) : [];
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Save reports to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleReport = async () => {
    if (isRecording) {
      // Stop Recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info('Processing your report...');
    } else {
      // Start Recording
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Your browser does not support audio recording.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus', // Adjusted MIME type
        });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          try {
            // Send audioBlob to the backend server
            const formData = new FormData();
            formData.append('audio', audioBlob, 'report.webm');

            const response = await axios.post('http://localhost:5001/transcribe', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            const transcription = response.data.transcription;

            const newReport = {
              id: Date.now(),
              description: transcription,
              timestamp: new Date().toISOString(),
            };
            setReports((prevReports) => [...prevReports, newReport]);
            toast.success('Report submitted successfully!');
          } catch (error) {
            console.error('Transcription error:', error.response?.data || error.message);
            toast.error(`Transcription failed: ${error.response?.data?.error || error.message}`);
          }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast.info('Recording started. Click the Report button again to stop.');
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast.error('Unable to access your microphone.');
      }
    }
  };

  const clearReports = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all reports?');
    if (confirmClear) {
      setReports([]);
      toast.info('All reports have been cleared.');
    }
  };

  return (
    <>
      <ReportButton onReport={handleReport} isRecording={isRecording} />
      {isRecording && (
        <div style={recordingStyle}>
          <p>Recording... Click the Report button again to stop.</p>
        </div>
      )}

        


      {/* Display Reports */}
      <div style={reportsContainerStyle}>
        <h2>Recent Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <ul style={reportsListStyle}>
            {reports.map((report) => (
              <li key={report.id} style={reportItemStyle}>
                <div style={reportCardStyle}>
                  <strong>{new Date(report.timestamp).toLocaleString()}</strong>
                  <p>{report.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {reports.length > 0 && (
          <button onClick={clearReports} style={clearButtonStyle}>
            Clear All Reports
          </button>
        )}
      </div>
    </>
  );
};

// Inline styles for simplicity
const recordingStyle = {
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  zIndex: 1000,
};

const reportsContainerStyle = {
  position: 'absolute',
  top: '80px',
  right: '60px', 
  width: '300px', // Fixed width for the report
  maxHeight: '70vh', // Adjust the max-height to 70% of the viewport height
  backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent background to match .report
  padding: '20px', // Padding for content inside the report
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Match the shadow for visual effect
  borderRadius: '8px', // Rounded corners
  zIndex: 4, // Ensure it's on top of other elements like the map
  overflowY: 'auto',
};

const reportsListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const reportItemStyle = {
  marginBottom: '10px',
};

const reportCardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const clearButtonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  fontSize: '14px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
};

export default ReportFeature;
