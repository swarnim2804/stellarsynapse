import React, { useState } from 'react';
import Navbar from './Navbar'; // adjust path if needed
import marsBg from '../assets/mars-bg.mp4'; // your local video

const dateCameraPairs = [
  { date: '2016-08-05', camera: 'MAST' },
  { date: '2015-10-01', camera: 'CHEMCAM' },
  { date: '2013-04-07', camera: 'RHAZ' },
  { date: '2014-10-21', camera: 'NAVCAM' },
  { date: '2015-01-14', camera: 'PANCAM' },
  { date: '2023-05-15', camera: 'MAST' },
  { date: '2023-06-10', camera: 'CHEMCAM' },
  { date: '2023-07-22', camera: 'RHAZ' },
  { date: '2023-08-18', camera: 'NAVCAM' },
  { date: '2023-01-30', camera: 'PANCAM' },
  { date: '2023-03-21', camera: 'RHAZ' },
  { date: '2023-04-25', camera: 'NAVCAM' },
  { date: '2013-05-23', camera: 'RHAZ' },
  { date: '2007-01-17', camera: 'PANCAM' },
  { date: '2005-10-26', camera: 'FHAZ' },
];

const Mars = () => {
  const [date, setDate] = useState(dateCameraPairs[0].date);
  const [camera, setCamera] = useState(dateCameraPairs[0].camera);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiKey = 'z5gNLtycMgQ2gyjeR4hGFG4LUnLGsWCguXgFkeU2';

  const fetchImages = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (data.photos.length > 0) {
        const urls = data.photos.slice(0, 7).map((photo) => photo.img_src);
        setImages(urls);
        setShowModal(true);
      } else {
        setError('No images available for this date and camera.');
      }
    } catch (err) {
      setError('Error fetching the imagery. Please try again.');
    }
    setLoading(false);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const found = dateCameraPairs.find((item) => item.date === selectedDate);
    if (found) setCamera(found.camera);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        src={marsBg}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'blur(1.5px) brightness(0.8)', // reduced blur & brightness for clarity
        }}
      />

      {/* Main Content */}
      <div style={{
        padding: '2rem',
        fontFamily: 'Segoe UI',
        color: '#f7e9e3',
        backgroundColor: 'transparent', // no reddish tint now
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#ff4c29',
          textShadow: '0 0 10px #ff9966'
        }}>
          🪐 Mars Rover Image Viewer
        </h2>

        <form
          onSubmit={fetchImages}
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 0 15px rgba(255, 76, 41, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          <label style={{ width: '100%' }}>
            <span style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Select Date:</span>
            <select
              value={date}
              onChange={handleDateChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {dateCameraPairs.map((pair) => (
                <option key={pair.date} value={pair.date}>{pair.date}</option>
              ))}
            </select>
          </label>

          <label style={{ width: '100%' }}>
            <span style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Camera:</span>
            <input
              type="text"
              value={camera}
              readOnly
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              backgroundColor: '#ff4c29',
              color: '#000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 0 10px rgba(255, 76, 41, 0.6)'
            }}
          >
            🔍 Get Images
          </button>
        </form>

        {loading && <p style={{ marginTop: '1.5rem' }}>🔄 Fetching Martian data...</p>}
        {error && <p style={{ color: 'salmon', marginTop: '1rem' }}>{error}</p>}

        <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Mars Rover ${camera}`}
              style={{
                width: '150px',
                borderRadius: '10px',
                boxShadow: '0 0 12px rgba(255, 100, 50, 0.4)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => setShowModal(true)}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>

        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '90vw',
                maxHeight: '80vh',
                overflowY: 'auto',
                color: '#fff'
              }}
            >
              <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: '#ff4c29' }}>📸 Mars Rover Photos</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {images.map((src, idx) => (
                  <img key={idx} src={src} alt={`Mars Rover`} style={{ width: '250px', borderRadius: '10px' }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mars;
