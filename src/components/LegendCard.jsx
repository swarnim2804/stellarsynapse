import React from 'react';
import './HallOfFame.css';

const LegendCard = ({ legend, onClick }) => (
  <div className="legend-card" onClick={onClick}>
    <img src={legend.image} alt={legend.name} />
    <h3>{legend.name}</h3>
    <p>{legend.role}</p>
  </div>
);

export default LegendCard;
