import React, { useContext, useState } from 'react';
import { AlbumContext } from '../../context/AlbumContext';
import DetailView from '../../components/DetailView/DetailView';
import './Album.css';

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
    <div className="album-section mb-8">
      <h2 className="text-xl font-semibold mb-4">{sectionName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: type === 'films' ? 6 : type === 'people' ? 82 : 36 }).map((_, index) => {
          const item = items.find(item => parseInt(item.id) === index + 1);
          return (
            <div
              key={`${type}-${index + 1}`}
              onClick={() => item && showCardDetails(type, item.id)}
              className={`card p-4 border rounded-lg shadow-md cursor-pointer text-center ${item ? (item.special ? 'bg-yellow-200' : 'bg-white') : 'bg-gray-100'}`}
            >
              {item ? (
                <>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.id}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">{index + 1}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="album-container p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Mi Álbum</h1>
      {renderSection('Películas', album.movies, 'films')}
      {renderSection('Personajes', album.characters, 'people')}
      {renderSection('Naves', album.starships, 'starships')}
      {selectedCard && <DetailView type={selectedCard.type} id={selectedCard.id} onClose={closeDetailView} />}
    </div>
  );
};

export default Album;