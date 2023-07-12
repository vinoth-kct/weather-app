import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import WeatherSearch from './components/WeatherSearch';
import Login from './components/Authentication/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/weather-search" element={<WeatherSearch />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
