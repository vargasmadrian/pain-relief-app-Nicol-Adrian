import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Onboarding from './pages/Onboarding';
import Education from './pages/Education';
import TherapySession from './pages/TherapySession';
import LevelSelect from './pages/LevelSelect';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Onboarding />} />
        <Route path="/levels" element={<LevelSelect />} />
        <Route path="/education/:region/:level" element={<Education />} />
        <Route path="/therapy/:region/:level" element={<TherapySession />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
