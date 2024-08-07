import React from 'react';
import { Link } from 'react-router-dom';
import Packet from '../components/Packet';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Star Wars Digital Album</h1>
      <div className="flex justify-center mt-10">
        <Link to="/album" className="px-4 py-2 bg-blue-500 text-white rounded">
          Mi Álbum
        </Link>
      </div>
      <div className="mt-10">
        <Packet />
      </div>
    </div>
  );
};

export default Home;