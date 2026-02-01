import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Pairing from './pages/Pairing';
import FindDevice from './pages/FindDevice';
import DashboardAlert from './pages/DashboardAlert';
import DashboardReal from './pages/DashboardReal';
import Stats from './pages/Stats';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/pair" element={<Pairing />} />
      <Route path="/find" element={<FindDevice />} />
      <Route path="/dashboard" element={<DashboardAlert />} />
      <Route path="/dashboard-real" element={<DashboardReal />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
