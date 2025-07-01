import React, { useState } from 'react';
import zodiacData from '../data/zodiacData';
import './ZodiacExplorer.css';
import Navbar from './Navbar';

const ZodiacExplorer = () => {
  const [dob, setDob] = useState('');
  const [sign, setSign] = useState(null);

  const handleDOBChange = (e) => {
    const inputDate = new Date(e.target.value);
    const month = inputDate.getUTCMonth() + 1;
    const day = inputDate.getUTCDate();

    const foundSign = zodiacData.find(z => {
      const [startMonth, startDay] = z.start;
      const [endMonth, endDay] = z.end;

      return (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month > startMonth || month < endMonth))
      );
    });

    setSign(foundSign || null);
  };

  const backgroundStyle = {
    backgroundImage: sign
      ? `url(${sign.bgImage})`
      : `url(${require('../assets/zodiacommon.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white',
    transition: 'background-image 0.6s ease-in-out',
  };

  return (
    <div className="zodiac-explorer" style={backgroundStyle}>
      <Navbar />
      <div className="zodiac-content">
      <h1 className="zodiac-heading">🔭 Zodiacverse</h1>
        <p>Enter your date of birth to discover your cosmic sign:</p>
        <input type="date" onChange={handleDOBChange} />

        {sign && (
          <div className="zodiac-card">
            <h2>{sign.name}</h2>
            <p><strong>Date Range:</strong> {sign.range}</p>
            <p><strong>Constellation:</strong> {sign.constellation}</p>
            <p><strong>Astronomical Info:</strong> {sign.fact}</p>
            <p><strong>Mythology:</strong> {sign.myth}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZodiacExplorer;
