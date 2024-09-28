// src/components/ReportButton.js
import React from 'react';

const ReportButton = ({ onReport }) => {
  return (
    <button
      onClick={onReport}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#FF4136',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        zIndex: 1000, 
      }}
      aria-label="Report Incident"
    >
      Report
    </button>
  );
};

export default ReportButton;
