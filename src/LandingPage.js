import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ufo from './assets/ufo.png';
import alien from './assets/alien.png';
import startStarfield from './Starfield';
import introSound from './assets/sounds/intro-sound.mp3'; // ✅ Import sound

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBeginJourney = () => {
    // ✅ Play sound when button is clicked (not blocked)
    const audio = new Audio(introSound);
    audio.volume = 0.5; // adjust volume as needed
    audio.play();

    // Start animation and navigate
    startStarfield(() => {
      navigate('/on-this-day');
    });
  };

  return (
    <div className="wrapper">
      <video autoPlay loop muted className="videoBackground">
        <source src={require('./assets/stars.mp4')} type="video/mp4" />
      </video>
      <canvas id="starfield"></canvas>
      <div className="moonSurface"></div>
      <img src={ufo} className="ufo" alt="ufo" />
      <img src={alien} className="alien" alt="alien" />

      <div className="dialogue">
        <p>Greetings, Human!</p>
        <p>The universe is calling. Will you answer?</p>
        <button className="exploreBtn" onClick={handleBeginJourney}>
          Begin The Journey
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
