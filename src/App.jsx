import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Album from './pages/Album/Album';
import Packet from './components/Packet/Packet';
import Menu from './components/Menu/Menu';
import AlbumProvider from './context/AlbumContext';

const App = () => {
  return (
    <AlbumProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Menu />
          <div className="flex-grow container mx-auto p-4">
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