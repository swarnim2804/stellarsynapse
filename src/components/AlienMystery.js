import React, { useState, useEffect } from 'react';
import './AlienMystery.css';
import Navbar from './Navbar';

const AlienMystery = () => {
  const [frequency, setFrequency] = useState(3);
  const [amplitude, setAmplitude] = useState(30);
  const [phase, setPhase] = useState(1);
  const [matched, setMatched] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [showDecoder, setShowDecoder] = useState(false);
  const [showAlien, setShowAlien] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);

  const target = { freq: 2, amp: 40, phase: 0 };
  const finalMessage =
    "We come in peace. We've traveled across galaxies seeking alliance. Transmission linked. Awaiting your response. But beware... you're not the only ones listening.";
  const alienSpeech = "We're transmitting a vital signal. Match our frequency to unlock it.";

  // Validate frequency match
  useEffect(() => {
    const closeEnough = (a, b) => Math.abs(a - b) < 0.3;
    if (
      showDecoder &&
      closeEnough(frequency, target.freq) &&
      closeEnough(amplitude, target.amp) &&
      closeEnough(phase, target.phase)
    ) {
      setMatched(true);
    } else {
      setMatched(false);
      setDecodedText('');
    }
  }, [frequency, amplitude, phase, showDecoder]);

  // Decode final message
  useEffect(() => {
    if (matched && decodedText.length < finalMessage.length) {
      const timeout = setTimeout(() => {
        setDecodedText(finalMessage.slice(0, decodedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [matched, decodedText]);

  // Timed Sequence: Show Alien, Speech, Decoder
  useEffect(() => {
    const alienDrop = setTimeout(() => {
      setShowAlien(true);
    }, 5000); // After UFO lands

    const speakAfterLand = setTimeout(() => {
      setShowSpeech(true);
    }, 11000); // Alien finishes descending

    const decoderDelay = setTimeout(() => {
      setShowDecoder(true);
    }, 11500 + alienSpeech.length * 60 + 2000); // Wait full speech + 2s

    return () => {
      clearTimeout(alienDrop);
      clearTimeout(speakAfterLand);
      clearTimeout(decoderDelay);
    };
  }, []);

  // Typing effect for alien speech
  useEffect(() => {
    if (showSpeech && speechText.length < alienSpeech.length) {
      const typing = setTimeout(() => {
        setSpeechText(alienSpeech.slice(0, speechText.length + 1));
      }, 60);
      return () => clearTimeout(typing);
    }
  }, [showSpeech, speechText]);

  const renderWave = (freq, amp, phaseShift, color) => {
    const points = Array.from({ length: 100 }, (_, i) => {
      const x = i * 3;
      const y = 100 + amp * Math.sin((i / 10) * freq + phaseShift);
      return `${x},${y}`;
    }).join(' ');
    return <polyline points={points} fill="none" stroke={color} strokeWidth="2" />;
  };

  return (
    <div className="alien-scene">
      <Navbar />
      <div className="stars" />
      <div className="ufo1">
        <div className="ufo-dome" />
        <div className="ufo-body" />
        <div className="ufo-lights">
          <div className="light" />
          <div className="light" />
          <div className="light" />
          <div className="light" />
        </div>
        <div className="ufo-beam" />
      </div>
      <div className="moon">
        <div className="crater crater1" />
        <div className="crater crater2" />
        <div className="crater crater3" />
      </div>
      <div className="caption">
        <h1>👽 UFO Lands on the Moon</h1>
        <p>A mysterious spacecraft has arrived. It's emitting signals... but something's missing.</p>
      </div>

      {showAlien && (
        <div className="alien-character animate-descent">
          <div className="alien-body" />
          {showSpeech && <div className="speech-bubble">{speechText}</div>}
        </div>
      )}

      {showDecoder && (
        <div className="decoder-panel">
          <h2>🛰️ Alien Signal Decoder</h2>
          <svg width="300" height="200">
            {renderWave(target.freq, target.amp, target.phase, 'red')}
            {renderWave(frequency, amplitude, phase, 'lime')}
          </svg>

          <div className="sliders">
            <label>Frequency: {frequency.toFixed(1)}
              <input type="range" min="1" max="5" step="0.1" value={frequency} onChange={e => setFrequency(parseFloat(e.target.value))} />
            </label>
            <label>Amplitude: {amplitude.toFixed(1)}
              <input type="range" min="10" max="80" step="1" value={amplitude} onChange={e => setAmplitude(parseFloat(e.target.value))} />
            </label>
            <label>Phase: {phase.toFixed(1)}
              <input type="range" min="-3.14" max="3.14" step="0.1" value={phase} onChange={e => setPhase(parseFloat(e.target.value))} />
            </label>
          </div>

          {matched && <div className="decoded-text">✅ Decoded: {decodedText}</div>}
        </div>
      )}
    </div>
  );
};

export default AlienMystery;
