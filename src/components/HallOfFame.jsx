import React, { useState } from 'react';
import legends from '../data/legendsData';
import starsBg from '../assets/stars-bg2.mp4';
import Navbar from './Navbar';
import LegendCard from './LegendCard';
import LegendModal from './LegendModal';
import './HallOfFame.css';

const categories = ["All", "Astronauts", "Engineers", "Astrophysicists", "Women in Space", "Mission Commanders"];

const HallOfFame = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLegend, setSelectedLegend] = useState(null);

  const filteredLegends = selectedCategory === "All"
    ? legends
    : legends.filter((legend) => legend.category === selectedCategory);

  return (
    <div className="hall-of-fame-container">
       <Navbar />
      <video autoPlay loop muted className="video-bg">
        <source src={starsBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-banner">
        <h1>Hall of Galactic Heroes</h1>
        <p>Honoring those who dared to defy gravity</p>
        <q>“The Earth is the cradle of humanity, but one cannot live in the cradle forever.”</q>
      </div>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="legend-grid">
        {filteredLegends.map((legend) => (
          <LegendCard
            key={legend.id}
            legend={legend}
            onClick={() => setSelectedLegend(legend)}
          />
        ))}
      </div>

      {selectedLegend && (
        <LegendModal legend={selectedLegend} onClose={() => setSelectedLegend(null)} />
      )}
    </div>
  );
};

export default HallOfFame;
