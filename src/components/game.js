import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gameBg from '../assets/gamebg.jpeg';


const Game = () => {
  const gameRef = useRef(null);
  const [rocketX, setRocketX] = useState(180);
  const [asteroids, setAsteroids] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') setRocketX((prev) => Math.max(prev - 15, 0));
      else if (e.key === 'ArrowRight') setRocketX((prev) => Math.min(prev + 15, 330));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setAsteroids((prev) => [...prev, { id: Date.now(), x: Math.random() * 330, y: 0, angle: 0 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    let animationFrameId;
    const update = () => {
      setAsteroids((prev) => {
        const updated = prev.map((a) => ({
          ...a,
          y: a.y + 4,
          angle: a.angle + 4,
        }));
        updated.forEach((a) => {
          if (a.y >= 580 && Math.abs(a.x - rocketX) < 30) setGameOver(true);
        });
        return updated.filter((a) => a.y < 640);
      });
      setScore((s) => s + 1);
      animationFrameId = requestAnimationFrame(update);
    };
    if (!gameOver) animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rocketX, gameOver]);

  const restartGame = () => {
    setRocketX(180);
    setAsteroids([]);
    setScore(0);
    setGameOver(false);
  };

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${gameBg})`,
backgroundSize: 'cover',
backgroundPosition: 'center',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Orbitron', sans-serif",
      color: 'white',
      zIndex: 1,
      overflow: 'hidden',
    },
    card: {
      position: 'relative',
      width: '360px',
      height: '640px',
      borderRadius: '25px',
      background: 'linear-gradient(to bottom, #050505, #111)',
      overflow: 'hidden',
      boxShadow: '0 0 25px 5px rgba(0, 255, 255, 0.5)',
      animation: 'pulseGlow 2s infinite alternate',
    },
    rocket: {
      position: 'absolute',
      bottom: '40px',
      left: `${rocketX}px`,
      transform: 'translateX(-50%)',
      fontSize: '2.2rem',
      zIndex: 2,
      transition: 'left 0.1s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    flame: {
      fontSize: '1rem',
      color: 'orange',
      animation: 'flicker 0.2s infinite',
    },
    asteroid: (x, y, angle) => ({
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      fontSize: '1.4rem',
      zIndex: 2,
      transform: `rotate(${angle}deg)`,
    }),
    score: {
      position: 'absolute',
      top: '10px',
      left: '20px',
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '5px 12px',
      borderRadius: '8px',
      zIndex: 3,
    },
    gameOver: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      background: 'rgba(0, 0, 0, 0.85)',
      padding: '20px 30px',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(255, 0, 0, 0.6)',
      zIndex: 4,
    },
    button: {
      marginTop: '16px',
      padding: '10px 25px',
      border: 'none',
      backgroundColor: '#00bcd4',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '20px',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(0, 188, 212, 0.7)',
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 5,
      padding: '6px 12px',
      fontSize: '0.8rem',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container} ref={gameRef}>
      <div style={styles.card}>
        <div style={styles.rocket}>
          🚀
          <div style={styles.flame}>🔥</div>
        </div>

        {asteroids.map((a) => (
          <div key={a.id} style={styles.asteroid(a.x, a.y, a.angle)}>☄️</div>
        ))}

        <div style={styles.score}>Score: {score}</div>

        {gameOver && (
          <div style={styles.gameOver}>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>💥 Game Over!</p>
            <p style={{ fontSize: '1rem', margin: '10px 0' }}>Your Score: {score}</p>
            <button style={styles.button} onClick={restartGame}>🔁 Play Again</button>
          </div>
        )}

        <button style={styles.backButton} onClick={() => navigate('/')}>🏠 Back</button>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }

        @keyframes pulseGlow {
          from { box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); }
          to { box-shadow: 0 0 30px rgba(0, 255, 255, 0.9); }
        }
      `}</style>
    </div>
  );
};

export default Game;
