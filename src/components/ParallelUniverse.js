import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './ParallelUniverse.css';
import Navbar from './Navbar';

const ParallelUniverse = () => {
  const containerRef = useRef(null);
  const [name, setName] = useState('');
  const [reversedName, setReversedName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const starCount = 5000;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 600 - 300;
      positions[i * 3 + 1] = Math.random() * 600 - 300;
      positions[i * 3 + 2] = Math.random() * 600 - 300;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      const posAttr = stars.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.array[i * 3 + 2] += 1.5;
        if (posAttr.array[i * 3 + 2] > 300) {
          posAttr.array[i * 3 + 2] = -300;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const generateAlterEgo = (userName) => {
    if (!userName) return "Nameless Wanderer";

    const traits = [
      { letter: 'z', name: 'Zenthar Shadow' },
      { letter: 'x', name: 'Xenovibe' },
      { letter: 'a', name: 'Altair Vortex' },
      { letter: 'r', name: 'Riftborn Echo' },
      { letter: 'k', name: 'Kryon Blaze' },
      { letter: 'l', name: 'Lumora' },
      { letter: 'n', name: 'Nova Mirage' },
      { letter: 's', name: 'Synapse Phantom' },
      { letter: 'm', name: 'Mirrorkind' },
    ];

    const match = traits.find(trait =>
      userName.toLowerCase().includes(trait.letter)
    );

    return match ? match.name : "Echo from the Unknown";
  };

  const handleReverse = () => {
    const reversed = name.split('').reverse().join('');
    setReversedName(reversed);
    const generated = generateAlterEgo(name);
    setAlterEgo(generated);
  };

  const flipUniverse = () => {
    setFlip(true);
    setTimeout(() => setFlip(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className={`universe-container ${flip ? 'flip-universe' : ''}`}
    >
       <Navbar />
      <lottie-player
        src="https://lottie.host/581086ff-60d9-4395-b4a7-176034c88c2f/oezUD9VfX4.json"
        background="transparent"
        speed="1"
        loop
        autoplay
        direction="1"
        className="lottie-left"
      ></lottie-player>

      <lottie-player
        src="https://lottie.host/581086ff-60d9-4395-b4a7-176034c88c2f/oezUD9VfX4.json"
        background="transparent"
        speed="1"
        loop
        autoplay
        direction="1"
        className="lottie-right"
      ></lottie-player>

      <div className="text-overlay glitch">
        <h1>WELCOME TO THE PARALLEL UNIVERSE</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleReverse}>Reveal Your Alter Ego</button>

        {reversedName && (
          <div className="identity-card">
            <h2>🌌 Parallel Identity</h2>
            <p><strong>Distorted Name:</strong> <span className="reversed-name">{reversedName}</span></p>
            <p><strong>Alter Ego:</strong> <span className="alter-ego">{alterEgo}</span></p>
            <p><strong>Origin World:</strong> Zeta-9</p>
            <p><strong>Quantum Code:</strong> #{Math.floor(Math.random() * 999999)}</p>
          </div>
        )}

        <button onClick={flipUniverse}>Flip Universe</button>
      </div>
    </div>
  );
};

export default ParallelUniverse;
