// src/components/BlackHoleMystery.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import './BlackHoleMystery.css';
import Navbar from './Navbar';

const BlackHole = () => {
  const ref = useRef();

  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
   vec3 darkColor = vec3(0.3, 0.22, 0.05); // soft golden glow
    vec3 goldGlow = vec3(0.0, 0.0, 0.0);            // soft golden hue
    vec3 finalColor = mix(darkColor, goldGlow, intensity);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;


  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[4, 64, 64]} />
    </mesh>
  );
};

const AccretionDisk = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.002; // Spin around Y
      groupRef.current.rotation.y -= -0.001; // Subtle tilt
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    void main() {
      float r = distance(vUv, vec2(0.5));
      float glow = smoothstep(0.5, 0.2, r);
      vec3 color = mix(vec3(0.0), vec3(0.9, 0.6, 0.2), glow);
      gl_FragColor = vec4(color, 0.9 - r);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const rings = [];
  for (let i = -0.5; i <= 0.5; i += 0.03) {
    rings.push(
      <mesh
        key={i}
        rotation={[2, 0, 2]}
        position={[0, i, 0]}
        material={material}
        geometry={new THREE.RingGeometry(4.2, 7.5, 128)}
      />
    );
  }

  return <group ref={groupRef}>{rings}</group>;
};





const Rocket = ({ position }) => {
  const group = useRef();

  useFrame(() => {
    if (group.current) {
      group.current.position.set(position.x, position.y, position.z);
    }
  });

  return (
    <group ref={group}>
      <Html center>
  <div style={{
    fontSize: '1.3rem',  // ↓ from 2.5rem
    transform: 'rotate(-45deg)',
    color: '#fff',
    filter: 'drop-shadow(0 0 6px red)',
    position: 'relative'
  }}>
    🚀
    <div style={{
      position: 'absolute',
      bottom: -15,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '6px',
      height: '13px',
      background: 'orange',
      borderRadius: '50%',
      animation: 'flame 0.2s infinite alternate',
    }} />
  </div>
</Html>

    </group>
  );
};

const BlackHoleMystery = () => {
  const [rocketPos, setRocketPos] = useState({ x: 7, y: 0, z: 0 });
  const [distance, setDistance] = useState(0);
  const [dilation, setDilation] = useState(1);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [inEscapeZone, setInEscapeZone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      const delta = 0.1;
      setRocketPos((prev) => {
        switch (e.key) {
          case 'ArrowUp': return { ...prev, z: prev.z - delta };
          case 'ArrowDown': return { ...prev, z: prev.z + delta };
          case 'ArrowLeft': return { ...prev, x: prev.x - delta };
          case 'ArrowRight': return { ...prev, x: prev.x + delta };
          case 'w': return { ...prev, y: prev.y + delta };
          case 's': return { ...prev, y: prev.y - delta };
          default: return prev;
        }
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;
      setRocketPos((prev) => {
        const dist = Math.sqrt(prev.x ** 2 + prev.y ** 2 + prev.z ** 2);
        const pull = dist < 1.4 ? 0.12 : dist < 7.5 ? 0.05 : 0.0;

        return {
          x: prev.x - prev.x * pull,
          y: prev.y - prev.y * pull,
          z: prev.z - prev.z * pull,
        };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const dist = Math.sqrt(rocketPos.x ** 2 + rocketPos.y ** 2 + rocketPos.z ** 2);
    setDistance((dist * 500).toFixed(1));
    setDilation((100 / (dist + 0.01)).toFixed(2));

  if (dist < 0.4 && !gameOver) {
   setMessage(
    `🌀 You’ve crossed the event horizon...
🌍 A singularity awaits — and perhaps a gateway to another universe...`
  );
  setGameOver(true);
  setTimeout(() => navigate('/mystery/parallel'), 5000);
} else if (dist > 7.5 && !gameOver) {
  const estimatedYears = (dilation * 10).toFixed(1); // assume 10 years inside = 1 Earth year
  setMessage(
    `✅ Escape Successful! 
📡 Signals stabilizing... barely.
⏱ Due to extreme time dilation (${dilation}x), Earth has aged nearly ${estimatedYears} years.
⚠ Memory logs corrupted. Energy levels critical.
🧭 You're alive—but the universe may have changed forever.`
  );
  setInEscapeZone(true);
} else if (!gameOver) {
  setInEscapeZone(false);
    if (dist < 1.2) {
    setMessage(`⚠️ WARNING: Approaching event horizon!
🧭 Boost away from the black hole before it's too late.`);
  } else if (dist < 2.5) {
    setMessage(`🛰 Stay alert!
Gravitational pull increasing. Maintain distance.`);
  } else {
    setMessage('');
  }
}

  }, [rocketPos, gameOver]);

  return (
    <div className="blackhole-scene">
      <Navbar />
      <audio autoPlay loop src="/sounds/space-ambience.mp3" />
      <div className="canvas-container">
        <div className="instruction-text">
  🚀 Use arrow keys or W/S to move the rocket. Avoid getting pulled in!
</div>

        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Stars radius={100} depth={50} count={2000} factor={4} fade />
          <BlackHole />
          <AccretionDisk />
          <Rocket position={rocketPos} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="hud">
        <p>🛰 Distance from Black Hole: <strong>{distance} km</strong></p>
        <p>⏳ Time Dilation: <strong>{dilation}x</strong></p>
      </div>

      {message && <div className="escape-message">{message}</div>}
    </div>
  );
};

export default BlackHoleMystery;
