// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Obtener Láminas</Link>
        </li>
        <li>
          <Link to="/album" className="text-white">Mi álbum</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;