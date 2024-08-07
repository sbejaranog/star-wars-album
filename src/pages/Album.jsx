import React, { useContext, useState } from 'react';
import { AlbumContext } from '../context/AlbumContext';
import DetailView from '../components/DetailView';

const Album = () => {
  const { album } = useContext(AlbumContext);
  const [selectedCard, setSelectedCard] = useState(null);

  const showCardDetails = (type, id) => {
    setSelectedCard({ type, id });
  };

  const closeDetailView = () => {
    setSelectedCard(null);
  };

  const renderSection = (sectionName, items, type) => (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold">{sectionName}</h2>
      <ul>
        {Array.from({ length: type === 'films' ? 6 : type === 'people' ? 82 : 36 }).map((_, index) => {
          const item = items.find(item => parseInt(item.id) === index + 1);
          return (
            <li
              key={`${type}-${index + 1}`}
              onClick={() => item && showCardDetails(type, item.id)}
              className={`cursor-pointer ${item ? (item.special ? 'text-red-500 font-bold' : 'text-blue-500') : 'text-gray-500'}`}
            >
              {item ? `${index + 1}. ${item.name}` : `${index + 1}`}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Mi Álbum</h1>
      {renderSection('Películas', album.movies, 'films')}
      {renderSection('Personajes', album.characters, 'people')}
      {renderSection('Naves', album.starships, 'starships')}
      {selectedCard && <DetailView type={selectedCard.type} id={selectedCard.id} onClose={closeDetailView} />}
    </div>
  );
};

export default Album;