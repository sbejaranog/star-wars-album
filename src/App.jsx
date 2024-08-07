// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlbumProvider from './context/AlbumContext'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home';
import Album from './pages/Album';
import Menu from './components/Menu';

function App() {
  return (
    <AlbumProvider>
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/album" element={<Album />} />
        </Routes>
      </Router>
    </AlbumProvider>
  );
}

export default App;