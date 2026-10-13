import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import './styles/global.css';

function App() {
  const [currentCity, setCurrentCity] = useState('Indore');

  const handleSearch = (city) => {
    setCurrentCity(city);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard currentCity={currentCity} onSearch={handleSearch} />} />
            <Route path="/analytics" element={<Analytics currentCity={currentCity} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
