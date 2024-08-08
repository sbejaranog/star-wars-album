import React, { createContext, useState, useEffect } from 'react';

export const AlbumContext = createContext();

const AlbumProvider = ({ children }) => {
  const [album, setAlbum] = useState({ movies: [], characters: [], starships: [] });
  const [cards, setCards] = useState([]);
  const [actions, setActions] = useState({});
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const addCardToAlbum = (card) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [card.type]: [...prevAlbum[card.type], card]
    }));
  };

  const updateCards = (newCards) => {
    setCards(newCards);
  };

  const updateActions = (newActions) => {
    setActions(newActions);
  };

  const resetTimer = (newTimer) => {
    setTimer(newTimer);
  };

  return (
    <AlbumContext.Provider value={{
      album,
      addCardToAlbum,
      cards,
      updateCards,
      actions,
      updateActions,
      timer,
      resetTimer
    }}>
      {children}
    </AlbumContext.Provider>
  );
};

export default AlbumProvider;