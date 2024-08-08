import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AlbumContext } from '../../context/AlbumContext';
import Card from '../Card/Card';
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
  const { album, addCardToAlbum, cards, updateCards, actions, updateActions, timer, resetTimer } = useContext(AlbumContext);
  const [loading, setLoading] = useState(false);
  const [activePacket, setActivePacket] = useState(-1);

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
      updateCards(newCards);
      updateActions(newCards.reduce((acc, card) => ({ ...acc, [card.id]: null }), {}));
      resetTimer(60);
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
      updateActions(prevActions => ({ ...prevActions, [card.id]: 'added' }));
    }
  };

  const handleDiscardCard = (card) => {
    updateActions(prevActions => ({ ...prevActions, [card.id]: 'discarded' }));
  };

  const handleDiscardPacket = () => {
    updateCards([]);
    updateActions({});
    resetTimer(0); // Reset timer
  };

  const allActionsDefined = Object.values(actions).every(action => action !== null);

  return (
    <div className="packet-container p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            onClick={() => openPacket(index)}
            className={`px-4 py-2 rounded ${timer > 0 || loading || activePacket !== -1 ? 'bg-starwars-buttonDisabled cursor-not-allowed' : 'bg-starwars-buttonSecondary text-white hover:bg-starwars-primary'}`}
            disabled={timer > 0 || loading || activePacket !== -1}
          >
            {loading && activePacket === index ? 'Cargando...' : timer > 0 ? `Bloqueado (${timer}s)` : `Abrir Sobre ${index + 1}`}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const section = mapTypeToSection(card.type);
          const isAlreadyInAlbum = album[section].some(c => c.id === card.id);
          return (
            <Card
              key={`${card.type}-${card.id}`}
              item={card}
              showActions={true}
              onAdd={handleAddCard}
              onDiscard={handleDiscardCard}
              action={actions[card.id]} // Pass the action state to the card
              isAlreadyInAlbum={isAlreadyInAlbum} // Pass the state if it's already in the album
            />
          );
        })}
      </div>
      {cards.length > 0 && (
				<div className="text-center mx-auto">
					<button onClick={handleDiscardPacket} className={`mt-4 px-4 py-2 rounded text-white ${!allActionsDefined ? 'bg-starwars-buttonDisabled cursor-not-allowed' : 'bg-starwars-buttonPrimary hover:bg-red-700 text-white'}`} disabled={!allActionsDefined}>
						Descartar Sobre
					</button>
				</div>
      )}
    </div>
  );
};

export default Packet;