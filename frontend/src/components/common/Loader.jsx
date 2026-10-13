import React from 'react';
import { WiDaySunny } from 'react-icons/wi';

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <WiDaySunny className="text-6xl text-yellow-400 animate-spin-slow mb-4" />
    <p className="text-gray-400 font-medium tracking-wide">Fetching weather intelligence...</p>
  </div>
);

export default Loader;
