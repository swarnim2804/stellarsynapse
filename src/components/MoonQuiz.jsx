// src/components/MoonQuiz.jsx
import React, { useState } from 'react';
import './MoonQuiz.css';

const questions = [
  {
    question: 'What phase comes after a New Moon?',
    options: ['First Quarter', 'Full Moon', 'Waxing Crescent', 'Waning Gibbous'],
    answer: 'Waxing Crescent',
  },
  {
    question: 'How many moon phases are there?',
    options: ['6', '8', '4', '10'],
    answer: '8',
  },
  {
    question: 'Which moon phase is best for stargazing?',
    options: ['Full Moon', 'New Moon', 'First Quarter', 'Waning Crescent'],
    answer: 'New Moon',
  },
  {
    question: 'What causes moon phases?',
    options: [
      'Earth’s shadow',
      'Rotation of the sun',
      'Moon’s orbit around Earth',
      'Atmospheric clouds',
    ],
    answer: 'Moon’s orbit around Earth',
  },
  {
    question: 'Which moon phase is exactly halfway through the cycle?',
    options: ['First Quarter', 'New Moon', 'Full Moon', 'Last Quarter'],
    answer: 'Full Moon',
  },
  {
    question: 'Which phase looks like a banana shape?',
    options: ['Gibbous', 'Crescent', 'Full Moon', 'Quarter'],
    answer: 'Crescent',
  },
  {
    question: 'What is a Blue Moon?',
    options: [
      'A moon that turns blue',
      'Second full moon in a month',
      'A moon in winter',
      'Lunar eclipse moon',
    ],
    answer: 'Second full moon in a month',
  },
  {
    question: 'How long is the lunar cycle (approx)?',
    options: ['24 hours', '30 days', '29.5 days', '15 days'],
    answer: '29.5 days',
  },
];

const MoonQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ The correct answer was: ${questions[current].answer}`);
    }

    setTimeout(() => {
      setFeedback('');
      setSelected('');
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected('');
    setScore(0);
    setShowScore(false);
    setFeedback('');
  };

  const getFinalMessage = () => {
    const percent = (score / questions.length) * 100;
    if (percent === 100) return '🌕 You’re a full-on Moon Master!';
    if (percent >= 75) return '🌖 Stellar! You know your lunar facts well!';
    if (percent >= 50) return '🌓 Good effort! A little more stargazing and you’re there.';
    return '🌑 Time to shoot for the stars and study a bit more!';
  };

  return (
    <div className="quiz-section">
      <h2>Test Your Moon IQ</h2>

      {showScore ? (
        <div className="score-screen">
          <h3>Your Score: {score} / {questions.length}</h3>
          <p>{getFinalMessage()}</p>
          <button onClick={restartQuiz}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="progress-bar">
            <div style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div>
          </div>

          <div className="quiz-question">
            <p><strong>Q{current + 1}:</strong> {questions[current].question}</p>
            {questions[current].options.map((option) => (
              <button
                key={option}
                className={`option-btn ${selected === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
                disabled={!!selected}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && <div className="feedback">{feedback}</div>}
        </>
      )}
    </div>
  );
};

export default MoonQuiz;
