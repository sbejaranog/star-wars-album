import React, { useContext, useState } from 'react';
import { AlbumContext } from '../../context/AlbumContext';
import DetailView from '../../components/DetailView/DetailView';
import Card from '../../components/Card/Card';

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
      <h2 className="text-xl font-semibold mb-4 text-starwars-primary">{sectionName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: type === 'films' ? 6 : type === 'people' ? 82 : 36 }).map((_, index) => {
          const item = items.find(item => parseInt(item.id) === index + 1);
          return (
            <Card
              key={`${type}-${index + 1}`}
              item={item || { id: index + 1 }}
              showActions={false}
              showDetails={() => showCardDetails(type, index + 1)}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="album-container p-4">
      <h1 className="text-2xl font-bold text-center mb-8 text-starwars-primary">Mi Álbum</h1>
      {renderSection('Películas', album.movies, 'films')}
      {renderSection('Personajes', album.characters, 'people')}
      {renderSection('Naves', album.starships, 'starships')}
      {selectedCard && <DetailView type={selectedCard.type} id={selectedCard.id} onClose={closeDetailView} />}
    </div>
  );
};

export default Album;