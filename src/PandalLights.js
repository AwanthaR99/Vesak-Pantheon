import React from 'react';
import './PandalLights.css'; // Make sure to create this file too

const bulbPositions = [
  { top: '9.3%', left: '50.0%', color: 'red' },
  { top: '16.6%', left: '40.0%', color: 'blue' },
  { top: '16.6%', left: '60.1%', color: 'orange' },
  { top: '29.3%', left: '31.2%', color: 'green' },
  { top: '29.3%', left: '68.8%', color: 'purple' },
  { top: '42.0%', left: '23.4%', color: 'yellow' },
  { top: '42.0%', left: '76.7%', color: 'cyan' },
  { top: '56.6%', left: '17.6%', color: 'pink' },
  { top: '56.6%', left: '82.5%', color: 'lime' },
  { top: '70.3%', left: '11.7%', color: 'aqua' },
  { top: '70.3%', left: '88.4%', color: 'gold' },
  { top: '85.4%', left: '50.0%', color: 'red' },
  { top: '85.4%', left: '41.0%', color: 'orange' },
  { top: '85.4%', left: '59.1%', color: 'blue' },
];

const PandalLights = () => {
  return (
    <div className="pandal-container">
      <img src="/pandal.png" alt="Pandal" className="pandal-image" />
      {bulbPositions.map((pos, index) => (
        <div
          key={index}
          className={`bulb ${
            index % 3 === 0 ? 'flicker' : index % 2 === 0 ? 'glow' : 'chase'
          }`}
          style={{
            top: pos.top,
            left: pos.left,
            backgroundColor: pos.color,
            boxShadow: `0 0 10px ${pos.color}`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default PandalLights;
