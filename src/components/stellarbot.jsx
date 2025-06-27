import React, { useState } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import robotAnimation from '../assets/Animation - 1751051228254.json';
import starsVideo from '../assets/stars2.mp4'; // Make sure path is right

const StellarBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = 'AIzaSyBaDmUJeyDyDB3oVEqRtvQLpdAGGJgHdss';

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: input }] }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '🤖 No reply received.';
      setMessages((prev) => [...prev, { role: 'bot', content: botReply }]);
    } catch (err) {
      console.error('Gemini Error:', err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: '⚠️ Error contacting Gemini API' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 🔹 Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={starsVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Optional Overlay (transparent black layer to darken slightly) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        }}
      />

      {/* 🔹 Main Chat Container */}
      <div
        style={{
          padding: '2rem',
          maxWidth: '700px',
          margin: '3rem auto',
          borderRadius: '12px',
          background: '#000000cc', // semi-transparent black
          fontFamily: 'Segoe UI, sans-serif',
          color: '#ffffff',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            color: '#00ffff',
            marginBottom: '1.5rem',
            textShadow: '0 0 10px #00ffff',
          }}
        >
          🌌 StellarBot
        </h2>

        <div
          style={{
            marginBottom: '1.5rem',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#1e1e2e',
            padding: '1rem',
            borderRadius: '10px',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: '0.75rem 0',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.75rem',
                  backgroundColor: msg.role === 'user' ? '#3b82f6' : '#38bdf8',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  color: '#000',
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : 'StellarBot'}:</strong> {msg.content}
              </span>
            </div>
          ))}
          {loading && (
            <p
              style={{
                textAlign: 'center',
                color: '#00ffff',
                animation: 'pulse 1.5s infinite',
              }}
            >
              👽 StellarBot is typing...
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about space..."
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '10px',
              border: 'none',
              fontSize: '1rem',
              outline: 'none',
              background: '#2a2a40',
              color: '#fff',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00ffff',
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
              transition: '0.3s',
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* 🔹 Robot Animation */}
      <div
        style={{
          padding: '2rem 0',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Player
          autoplay
          loop
          src={robotAnimation}
          style={{ height: '300px', width: '300px' }}
        />
      </div>
    </div>
  );
};

export default StellarBot;
