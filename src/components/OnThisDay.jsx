// src/components/OnThisDay.jsx
import React, { useEffect, useState } from 'react';
import './OnThisDay.css';
import Navbar from './Navbar';

const spaceKeywords = [
  'NASA', 'space', 'astronomy', 'astronaut', 'apollo', 'rocket', 'satellite',
  'hubble', 'planet', 'mars', 'venus', 'earth', 'moon', 'cosmos', 'launch',
  'telescope', 'spacecraft', 'shuttle', 'probe', 'mission', 'solar', 'cosmonaut',
  'orbit', 'galaxy', 'universe', 'black hole', 'supernova', 'nebula', 'exoplanet',
  'international space station', 'voyager', 'spacex', 'curiosity', 'james webb',
  'lunar', 'mars rover', 'blue origin', 'esa', 'roscosmos', 'jaxa', 'isro',
  'space shuttle', 'apollo program', 'gemini program', 'starlink mission',
  'yuri gagarin', 'buzz aldrin', 'sally ride', 'space mission', 'launch vehicle'
];

const OnThisDay = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (date) => {
    const [year, month, day] = date.split('-');
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`,
        {
          headers: {
            'Api-User-Agent': 'StellarSynapse/1.0 (your-email@example.com)',
          },
        }
      );
      const data = await res.json();

      // Filter space-related events
      let filtered = (data.events || []).filter(event =>
        spaceKeywords.some(keyword =>
          event.text.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      // ✅ Inject custom event manually for July 3, 2024
      if (date === '2025-07-03') {
        filtered.unshift({
          year: 2024,
          text:
            'On July 3rd, 2024, a SpaceX Falcon 9 Block 5 rocket launched a Starlink mission (Starlink Group 8-9) from Cape Canaveral, carrying 20 Starlink satellites into low Earth orbit. This launch was part of the second NASA Venture Class Launch Services (VCLS 2) mission, which also included a number of CubeSats as part of the ELaNa 43 mission. The mission was designated "Noise of Summer".',
          pages: [
            {
              titles: {
                normalized: 'Starlink'
              }
            }
          ]
        });
      }

      // Fallback: show a general event if no space-related ones
      if (filtered.length === 0 && data.events && data.events.length > 0) {
        filtered.push(data.events[0]);
      }

      setEvents(filtered);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div className="on-this-day-container">
      <Navbar />
      <h1>Cosmic Time Capsule</h1>

      <div className="date-selector">
        <label style={{ color: 'black' }}>Select a Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={today}
        />
      </div>

      {loading ? (
        <p className="loading">Loading cosmic events...</p>
      ) : events.length > 0 ? (
        <div className="event-grid">
          {events.map((event, i) => {
            const page = event.pages?.[0];
            const link = page
              ? `https://en.wikipedia.org/wiki/${page.titles.normalized}`
              : '#';
            return (
              <div key={i} className="event-card">
                <h3>📆 Year: {event.year}</h3>
                <p>{event.text}</p>
                {link !== '#' && (
                  <a href={link} target="_blank" rel="noreferrer">
                    Learn More →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="loading">No cosmic events found. Try another date!</p>
      )}
    </div>
  );
};

export default OnThisDay;

