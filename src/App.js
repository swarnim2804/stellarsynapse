import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import OnThisDay from './components/OnThisDay'; 
import MoonPhase from './components/MoonPhase';
import HallOfFame from './components/HallOfFame'; 
import './App.css'; // Import your main CSS file
import Game from './components/game';
import Mars from './components/mars'; // Import the Mars component
import StellarBot from './components/stellarbot';
 // adjust the path as per your project


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/on-this-day" element={<OnThisDay />} />
          <Route path="/moon-phase" element={<MoonPhase />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/game" element={<Game />} />
          <Route path="/Mars" element={<Mars />} />
          <Route path="/stellarbot" element={<StellarBot />} />

       
       







        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
