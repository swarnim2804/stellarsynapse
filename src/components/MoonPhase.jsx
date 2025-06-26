// src/components/MoonPhase.jsx
import React, { useState } from 'react';
import './MoonPhase.css';
import Navbar from './Navbar';
import MoonCarousel from './MoonCarousel';
import MoonQuiz from './MoonQuiz';

const MoonPhase = () => {
  const [dob, setDob] = useState('');
  const [phase, setPhase] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!dob) return alert('Please enter a valid date.');

    const timestamp = Math.floor(new Date(dob).getTime() / 1000);

    try {
      const response = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`);
      const data = await response.json();

      const moonPhase = data[0]?.Phase;
      console.log("Returned Phase:", moonPhase);
      setPhase(moonPhase);

      const phaseAliases = {
        "New Moon": "new_moon",
        "Waxing Crescent": "waxing_crescent",
        "First Quarter": "first_quarter",
        "Waxing Gibbous": "waxing_gibbous",
        "Full Moon": "full_moon",
        "Waning Gibbous": "waning_gibbous",
        "Last Quarter": "last_quarter",
        "Third Quarter": "third_quarter",
        "Waning Crescent": "waning_crescent",
      };

      const fileName = phaseAliases[moonPhase]?.toLowerCase() + '.png';
      setImageUrl(`/moon_phases/${fileName}`);
    } catch (error) {
      console.error('Error fetching moon phase:', error);
      setPhase('');
      setImageUrl('');
    }
  };

  const handleDownloadCertificate = () => {
    if (!phase || !dob) return alert('Please generate your moon phase first.');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    const background = new Image();
    background.src = imageUrl;

    background.onload = () => {
      ctx.drawImage(background, 0, 0, 600, 400);
      ctx.fillStyle = 'white';
      ctx.font = '24px Orbitron';
      ctx.fillText(`Moon Phase on ${dob}`, 20, 40);
      ctx.fillText(`${phase}`, 20, 80);

      const link = document.createElement('a');
      link.download = `Moon_Phase_Certificate_${dob}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <div className="moon-phase-container">
      <Navbar />
      <h1 style={{ fontFamily: 'Georgia, serif' }}>Moon On My Day</h1>
      <h2>Ever Wonder What the Moon Looked Like on Your Birthday?</h2>

      <div className="input-section">
        <label htmlFor="dob">Enter your Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button onClick={handleSubmit}>Find your Moon Moment</button>
      </div>

      {phase && (
        <div className="result-section">
          <h2>{phase}</h2>
          {imageUrl ? (
            <>
              <img src={imageUrl} alt={phase} className="moon-image" />
              <br />
              <button onClick={handleDownloadCertificate} className="download-btn">
                🎓 Download Lunar Certificate 🎓
              </button>
            </>
          ) : (
            <p>Moon image not available for this phase.</p>
          )}
        </div>
      )}

      <div className="carousel-wrapper">
<h2 style={{ fontFamily: 'Georgia, serif' }} className="carousel-heading">
  See the Moon Evolve
</h2>
        <MoonCarousel />
      </div>

      <div className="quiz-wrapper">
        <MoonQuiz />
      </div>
    </div>
  );
};

export default MoonPhase;
