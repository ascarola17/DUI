// src/components/ReportButton.js

import React, { useState } from 'react';

const ReportButton = ({ onReport, isRecording }) => {
  const [hover, setHover] = useState(false);

  const getBackgroundColor = () => {
    if (hover) {
      return isRecording ? '#FF4136' : '#e63946';
    } else {
      return isRecording ? '#e63946' : '#FF4136';
    }
  };

  return (
    <button
      onClick={onReport}
      style={{
        ...buttonStyle,
        backgroundColor: getBackgroundColor(),
      }}
      aria-label="Report Incident"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {isRecording ? 'Stop' : 'Report'}
    </button>
  );
};

// Inline styles for the button
const buttonStyle = {
  position: 'fixed',
  bottom: '85px',
  right: '60px',
  padding: '15px 25px',
  fontSize: '15px',
  color: '#fff',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  zIndex: 3000, // Ensures the button stays on top of other elements
  transition: 'background-color 0.3s ease',
};

export default ReportButton;
