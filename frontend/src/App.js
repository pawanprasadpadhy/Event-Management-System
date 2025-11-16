import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProfilesPage from './pages/ProfilesPage';
import EventsListPage from './pages/EventsListPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProfilesPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
