import React from 'react';
import { Link } from 'react-router-dom';
import { WiDayCloudyWindy } from 'react-icons/wi';
import '../../styles/glassmorphism.css';

const Navbar = () => {
  return (
    <nav className="glass-nav flex justify-between items-center p-4 mb-8">
      <div className="flex items-center gap-2">
        <WiDayCloudyWindy className="text-4xl text-blue-400" />
        <h1 className="text-xl font-bold text-white tracking-wider">
          Weather Intelligence System
        </h1>
      </div>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition">Dashboard</Link>
        <Link to="/analytics" className="text-gray-300 hover:text-white transition">Predictive AI</Link>
      </div>
    </nav>
  );
};

export default Navbar;
