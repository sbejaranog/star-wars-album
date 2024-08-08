import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Star_Wars_Logo.png';
import './Menu.css';

const Menu = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-starwars-secondary p-4 sticky top-0 z-50 backdrop-filter transition-all duration-500 ${isSticky ? 'backdrop-blur-3xl shadow-md' : ''}`}>
      <div className="container mx-auto flex flex-col items-center relative">
        {!isSticky && (
          <img src={logo} alt="Star Wars Logo" className="w-32 mb-4" />
        )}
        <ul className="flex space-x-4">
          <li>
            <Link to="/album" className="text-starwars-primary hover:text-white">Mi Álbum</Link>
          </li>
          <li>
            <Link to="/packet" className="text-starwars-primary hover:text-white">Obtener Láminas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;