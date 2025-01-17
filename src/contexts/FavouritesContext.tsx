import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Character } from '../types'; 

type FavouritesContextType = {
  favourites: Character[];
  addToFavourites: (character: Character) => void;
  removeFromFavourites: (character: Character) => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Character[]>([]);

  useEffect(() => {
    const localFavourites = localStorage.getItem('favourites');

    if (localFavourites) {
      setFavourites(JSON.parse(localFavourites));
    }
  }, []);

  const addToFavourites = (character: Character) => {
    const updatedFavourites = [...favourites, character];
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    setFavourites((prevFavourites) => [...prevFavourites, character]);
  };

  const removeFromFavourites = (character: Character) => {
    const updatedFavourites = favourites.filter((fav) => fav.name !== character.name);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.name !== character.name)
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
