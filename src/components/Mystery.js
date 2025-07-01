// src/components/Mystery.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mystery.css';
import Navbar from './Navbar';
import bgVideo from '../assets/background-stars.mp4';

const Mystery = () => {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/mystery/${id}`);
  };

  const mysteries = [
    { id: 'blackhole', title: 'Black Hole' },
    { id: 'alien', title: 'Alien Signal' },
    { id: 'parallel', title: 'Parallel Universe' },
  ];

  return (
    <div className="mystery-container">
      <Navbar />
      <video autoPlay muted loop className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1 className="mystery-title">🧪 Mystery Section</h1>
        <div className="mystery-grid">
          {mysteries.map((item) => (
            <div
              key={item.id}
              className="mystery-card"
              onClick={() => handleSelect(item.id)}
            >
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mystery;
