import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Register from './components/Authentication/Register';
import WeatherSearch from './components/WeatherSearch';
import Login from './components/Authentication/Login';

const IndexPage = () => (
  <div className="index-container">
    <h1 className="index-title">Weather App</h1>
    <div className="index-messages">
      <p>Welcome to the Weather App!</p>
      <p>Get real-time weather updates for any location.</p>
      <p>Stay informed and plan your day with ease.</p>
    </div>
    <Register />
  </div>
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/weather" element={<WeatherSearch />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
