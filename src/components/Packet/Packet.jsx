import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AlbumContext } from '../../context/AlbumContext';
import './Packet.css';


const mapTypeToSection = (type) => {
  if (type === 'films') return 'movies';
  if (type === 'people') return 'characters';
  if (type === 'starships') return 'starships';
  return null;
};

const getRandomId = (type) => {
  let maxId;
  switch (type) {
    case 'films':
      maxId = 6;
      break;
    case 'people':
      maxId = 82;
      break;
    case 'starships':
      maxId = 36;
      break;
    default:
      maxId = 0;
      break;
  }

  return maxId ? Math.floor(Math.random() * maxId) + 1 : null;
};

const fetchResource = async (type, retries = 5) => {
  let id = getRandomId(type);

  if (!id) {
    console.error(`Invalid type: ${type}`);
    throw new Error(`Invalid type: ${type}`);
  }

  console.log(`Fetching ${type} with id ${id}`);

  try {
    const response = await axios.get(`https://swapi.dev/api/${type}/${id}/`);
    console.log(`Fetched ${type} with id ${id}: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} with id ${id}: `, error);
    if (error.response && error.response.status === 404 && retries > 0) {
      return fetchResource(type, retries - 1); // Retry with another ID
    } else {
      throw error;
    }
  }
};

const Packet = () => {
  const { album, addCardToAlbum, cards, setCards, timer, setTimer, activePacket, setActivePacket, resetTimer } = useContext(AlbumContext);
  const [loading, setLoading] = useState(false);

  const openPacket = async (packetIndex) => {
    if (timer > 0 || loading || activePacket !== -1) return;
    setLoading(true);
    setActivePacket(packetIndex);

    const config1 = Math.random() > 0.5;
    const requests = [];

    if (config1) {
      requests.push(fetchResource('films'));
      for (let i = 0; i < 3; i++) {
        requests.push(fetchResource('people'));
      }
      requests.push(fetchResource('starships'));
    } else {
      for (let i = 0; i < 3; i++) {
        requests.push(fetchResource('people'));
      }
      for (let i = 0; i < 2; i++) {
        requests.push(fetchResource('starships'));
      }
    }

    try {
      const responses = await Promise.all(requests);
      const newCards = responses.map(res => ({
        id: res.url.split('/')[5],
        name: res.name || res.title,
        type: res.title ? 'films' : res.starship_class ? 'starships' : 'people',
        special: res.episode_id || parseInt(res.url.split('/')[5]) <= 20,
      }));
      setCards(newCards);
      setTimer(60);
    } catch (error) {
      console.error('Error fetching packet data:', error);
    } finally {
      setLoading(false);
      setActivePacket(-1);
    }
  };

  const handleAddCard = (card) => {
    const section = mapTypeToSection(card.type);
    if (section) {
      addCardToAlbum({ ...card, type: section });
    }
  };

  const handleDiscardCard = (card) => {
    setCards(prevCards => prevCards.filter(c => c.id !== card.id));
  };

  const handleDiscardPacket = () => {
    setCards([]);
    resetTimer();
  };

  const allCardsProcessed = cards.every(card => album[mapTypeToSection(card.type)].some(c => c.id === card.id) || !cards.some(c => c.id === card.id));

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            onClick={() => openPacket(index)}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            disabled={timer > 0 || loading || activePacket !== -1}
          >
            {loading && activePacket === index ? 'Cargando...' : timer > 0 ? `Bloqueado (${timer}s)` : `Abrir Sobre ${index + 1}`}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {cards.map(card => {
          const section = mapTypeToSection(card.type);
          const isAlreadyInAlbum = album[section].some(c => c.id === card.id);
          return (
            <div key={`${card.type}-${card.id}`} className={`p-2 border rounded shadow flex justify-between items-center ${card.special ? 'bg-yellow-200' : 'bg-white'}`}>
              <span className={card.special ? 'text-red-500 font-bold' : ''}>{card.name}</span>
              {isAlreadyInAlbum ? (
                <button onClick={() => handleDiscardCard(card)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">
                  Descartar
                </button>
              ) : (
                <button onClick={() => handleAddCard(card)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                  Agregar al álbum
                </button>
              )}
            </div>
          );
        })}
        {cards.length > 0 && (
          <button onClick={handleDiscardPacket} className="mt-4 px-4 py-2 bg-red-500 text-white rounded" disabled={!allCardsProcessed}>
            Descartar Sobre
          </button>
        )}
      </div>
    </div>
  );
};

export default Packet;