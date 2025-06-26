import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import OnThisDay from './components/OnThisDay'; 
import MoonPhase from './components/MoonPhase';
import HallOfFame from './components/HallOfFame'; 




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/on-this-day" element={<OnThisDay />} />
          <Route path="/moon-phase" element={<MoonPhase />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />




        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
