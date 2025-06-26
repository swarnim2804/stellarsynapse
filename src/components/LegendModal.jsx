import React from 'react';
import './HallOfFame.css';

const LegendModal = ({ legend, onClose }) => (
  <div className="legend-modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <img src={legend.image} alt={legend.name} />
      <h2>{legend.name}</h2>
      <p><strong>Role:</strong> {legend.role}</p>
      <p><strong>Known for:</strong> {legend.knownFor}</p>
      <p><strong>Years active:</strong> {legend.yearsActive}</p>
      <p><strong>Country:</strong> {legend.country}</p>
      <blockquote>“{legend.quote}”</blockquote>
      <p>{legend.bio}</p>
    </div>
  </div>
);

export default LegendModal;
