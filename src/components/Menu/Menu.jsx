import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/album" className="text-gray-300 hover:text-white">Mi Álbum</Link>
          </li>
          <li>
            <Link to="/packet" className="text-gray-300 hover:text-white">Obtener Láminas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;