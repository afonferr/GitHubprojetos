import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import MapPage from './pages/MapPage';
import ChecklistPage from './pages/ChecklistPage';
import NotesPage from './pages/NotesPage';
import AddTripPage from './pages/AddTripPage';
import EditTripPage from './pages/EditTripPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-trip" element={<AddTripPage />} />
        <Route path="/trips/:tripId/edit" element={<EditTripPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips/:tripId/locations" element={<LocationsPage />} />
          <Route path="/trips/:tripId/map" element={<MapPage />} />
          <Route path="/trips/:tripId/checklist" element={<ChecklistPage />} />
          <Route path="/trips/:tripId/notes" element={<NotesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
