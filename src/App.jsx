import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Album from './pages/Album/Album';
import Packet from './components/Packet/Packet';
import Menu from './components/Menu/Menu';
import AlbumProvider from './context/AlbumContext';
import StarsBackground from './components/StarsBackground/StarsBackground';

const App = () => {
  return (
    <AlbumProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative">
          <Menu />
          <StarsBackground />
          <div className="flex-grow container mx-auto p-4 relative z-10 bg-gray-900 bg-opacity-90">
            <Routes>
              <Route path="/" element={<Album />} />
              <Route path="/album" element={<Album />} />
              <Route path="/packet" element={<Packet />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AlbumProvider>
  );
};

export default App;