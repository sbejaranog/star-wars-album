import React, { createContext, useState, useEffect } from 'react';

export const AlbumContext = createContext();

const AlbumProvider = ({ children }) => {
  const [album, setAlbum] = useState({
    movies: [],
    characters: [],
    starships: []
  });
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [activePacket, setActivePacket] = useState(-1);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const addCardToAlbum = (card) => {
    const section = card.type;
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      [section]: [...prevAlbum[section], card]
    }));
  };

  const resetTimer = () => {
    setTimer(0);
    setActivePacket(-1);
  };

  return (
    <AlbumContext.Provider value={{ album, addCardToAlbum, cards, setCards, timer, setTimer, activePacket, setActivePacket, resetTimer }}>
      {children}
    </AlbumContext.Provider>
  );
};

export default AlbumProvider;