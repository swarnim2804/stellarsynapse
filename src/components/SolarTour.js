import React, { useState, useEffect, useRef } from 'react';
import './SolarTour.css';
import solartourVideo from '../assets/solartour1.mp4';
import starsBg2 from '../assets/stars-bg2.mp4';
import { FaEye } from 'react-icons/fa';
import sunVideo from '../assets/sun-video.mp4';
import mercuryVideo from '../assets/mercury-video.mp4';
import venusVideo from '../assets/venus-video.mp4';
import earthVideo from '../assets/earth-video.mp4';
import marsVideo from '../assets/mars-video.mp4';
import jupiterVideo from '../assets/jupiter-video.mp4';
import saturnVideo from '../assets/saturn-video.mp4';
import uranusVideo from '../assets/uranus-video.mp4';
import neptuneVideo from '../assets/neptune-video.mp4';
import orbitVideo from '../assets/planet-orbit.mp4';
import Navbar from './Navbar';



const planetData = {
  sun: { info: 'The Sun is a giant ball of hot plasma at the center of the Solar System. It provides the energy and light that sustain life on Earth. Composed mostly of hydrogen and helium, it generates energy through nuclear fusion in its core.', video: sunVideo },
  mercury: { info: 'Mercury is the smallest and closest planet to the Sun. It has a very thin atmosphere, and its surface experiences extreme temperatures, ranging from scorching heat to freezing cold. It has no moons.', video: mercuryVideo },
  venus: { info: 'Venus is the hottest planet due to its thick atmosphere, which traps heat. Known as Earth’s sister planet because of its similar size, it rotates in the opposite direction compared to most planets and has no moons.', video: venusVideo },
  earth: { info: 'Earth is the third planet from the Sun and the only known planet to support life. It has liquid water, a breathable atmosphere, and one moon, known as the Moon. It has diverse climates, ecosystems, and is home to millions of species.', video: earthVideo },
  mars: { info: 'Mars is known as the Red Planet because of its reddish appearance due to iron oxide on its surface. It has the largest volcano in the solar system and signs that water once flowed on its surface. Mars has two moons, Phobos and Deimos.', video: marsVideo },
  jupiter: { info: 'Jupiter is the largest planet in the Solar System, known for its massive storms, including the Great Red Spot. It’s a gas giant composed mostly of hydrogen and helium, and it has at least 79 moons, including the four large Galilean moons.', video: jupiterVideo },
  saturn: { info: 'Saturn is famous for its stunning ring system, made of ice, dust, and rock. It is another gas giant, mainly composed of hydrogen and helium, and has more than 80 moons, with Titan being the largest and most intriguing.', video: saturnVideo },
  uranus: { info: 'Uranus is unique because it rotates on its side, likely due to a collision with an Earth-sized object in the past. It has a faint ring system and is mostly made of hydrogen, helium, and methane, which gives it a pale blue color. It has 27 known moons.', video: uranusVideo },
  neptune: { info: 'Neptune, the farthest planet from the Sun, is known for its deep blue color and strong winds, the fastest in the Solar System. Like Uranus, it is a gas giant with a faint ring system and at least 14 moons, the largest of which is Triton.', video: neptuneVideo },
};

const SolarTour = () => {
  const [showOrbit, setShowOrbit] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [modalPlanet, setModalPlanet] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.onended = () => {
        setShowSecondVideo(true);
      };
    }
  }, []);

  return (
    <div className="solar-container">
       <Navbar />
      {!showSecondVideo && (
        <video ref={videoRef} className="solar-video" autoPlay muted>
          <source src={solartourVideo} type="video/mp4" />
        </video>
      )}

      {showSecondVideo && (
        <>
          <video className="solar-video" autoPlay muted loop>
            <source src={starsBg2} type="video/mp4" />
          </video>

          <div className="planet-ui">
            <div className="container">
              {Object.entries(planetData).map(([planetKey, data]) => (
                <div key={planetKey} className="planet-block">
                  <div
                    className={`celestial-body ${planetKey}`}
                    onMouseEnter={() => setHoveredPlanet(planetKey)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                  >
                    <img src={`${planetKey}-modified1.png`} alt={planetKey} />
                  </div>
                  <div className="planet-label">
                    <span className="planet-name">
                      {planetKey.charAt(0).toUpperCase() + planetKey.slice(1)}
                    </span>
                  </div>
                  <div className="eye-wrapper">
                    <FaEye className="eye-icon" onClick={() => setModalPlanet(planetKey)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-view-button-wrapper">
  <button className="orbit-view-button" onClick={() => setShowOrbit(true)}>
    Orbit View
  </button>
</div>


          {hoveredPlanet && (
            <div className="planet-info-window" onMouseLeave={() => setHoveredPlanet(null)}>
              <div className="planet-info-box">
                <h2>{hoveredPlanet.charAt(0).toUpperCase() + hoveredPlanet.slice(1)}</h2>
                <p>{planetData[hoveredPlanet].info}</p>
              </div>
            </div>
          )}

          {modalPlanet && (
            <div className="video-modal-small" onClick={() => setModalPlanet(null)}>
              <div className="video-wrapper" onClick={(e) => e.stopPropagation()}>
                <video autoPlay muted loop playsInline>
                  <source src={planetData[modalPlanet].video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span className="close" onClick={() => setModalPlanet(null)}>✖</span>
              </div>
            </div>
          )}

          {showOrbit && (
  <div className="orbit-modal" onClick={() => setShowOrbit(false)}>
    <div className="orbit-content" onClick={(e) => e.stopPropagation()}>
     <video autoPlay loop muted controls={false}>
  <source src={orbitVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <span className="close" onClick={() => setShowOrbit(false)}>✖</span>
    </div>
  </div>
)}

        </>
      )}
    </div>
  );
};

export default SolarTour;
