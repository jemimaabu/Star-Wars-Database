import React from 'react';
import { useFavourites } from '../contexts/FavouritesContext';
import { Character } from '../types'; 

const Favourites: React.FC = () => {
  const { favourites, removeFromFavourites } = useFavourites();

  return (
    <div>
      <h2 style={{marginBlock: '1rem'}}>Favourites</h2>
      <ul className="character-list">
        {favourites.map((character: Character) => (
          <li key={character.name} className="character-list__item">
            <div className="character-content">
              <div>
                <span className="character-name">{character.name}</span> 
                <div className="character-attributes">
                  <span className="character-attribute">{character.homeworld}</span>
                  <span className="character-attribute">{character.gender}</span>
                  <span className="character-attribute">{character.height}cm</span>
                </div>
              </div>
              <button onClick={() => removeFromFavourites(character)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
