import React from 'react';
import './MoonCarousel.css';

const moonPhases = [
  'new_moon', 'waxing_crescent', 'first_quarter',
  'waxing_gibbous', 'full_moon', 'waning_gibbous',
  'last_quarter', 'waning_crescent',
];

const MoonCarousel = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {[...moonPhases, ...moonPhases].map((phase, i) => (
          <div key={i} className="moon-slide">
            <img
              src={`/moon_phases/${phase}.png`}
              alt={phase.replace('_', ' ')}
              className="moon-icon"
            />
            <p>{phase.replace('_', ' ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoonCarousel;
