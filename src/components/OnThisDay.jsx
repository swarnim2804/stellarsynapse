// src/components/OnThisDay.jsx
import React, { useEffect, useState } from 'react';
import './OnThisDay.css';
import Navbar from './Navbar';

const spaceKeywords = [
  'NASA', 'space', 'astronomy', 'astronaut', 'Apollo', 'rocket', 'satellite',
  'Hubble', 'planet', 'Mars', 'Venus', 'Earth', 'moon', 'cosmos', 'launch',
  'telescope', 'ISS', 'shuttle', 'probe', 'mission', 'solar', 'cosmonaut', 'orbit'
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
      const filtered = (data.events || []).filter(event =>
        spaceKeywords.some(keyword =>
          event.text.toLowerCase().includes(keyword.toLowerCase())
        )
      );

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
      <h1> Cosmic Time Capsule</h1>

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
        <p className="loading">No space-related events found for this date. Try another date!</p>
      )}
    </div>
  );
};

export default OnThisDay;
