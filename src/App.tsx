import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Pairing from './pages/Pairing';
import FindDevice from './pages/FindDevice';
import DashboardAlert from './pages/DashboardAlert';
import DashboardReal from './pages/DashboardReal';
import Stats from './pages/Stats';
import StatsWeekly from './pages/StatsWeekly';
import Schedule from './pages/Schedule';
import Setting from './pages/Setting';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/pair" element={<Pairing />} />
      <Route path="/find" element={<FindDevice />} />
      <Route path="/dashboard" element={<DashboardAlert />} />
      <Route path="/dashboard-real" element={<DashboardReal />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/stats-weekly" element={<StatsWeekly />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
}

export default App;
