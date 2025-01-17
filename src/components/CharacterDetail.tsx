import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetails, fetchHomePlanet, fetchFilms, fetchStarships } from '../services/swapi';
import { useFavourites } from '../contexts/FavouritesContext';
import { Character } from '../types'; 

type localStorageData = {
  data: Character,
  homePlanet: string,
  films: string[],
  starships: string[],
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character>({ name: '' });
  const [homePlanet, setHomePlanet] = useState<string>('');
  const [films, setFilms] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  useEffect(() => {
    // Search for characters in local storage on page load to reduce API calls
    const character = localStorage.getItem(`character[${id}]`);

    if (character) {
      const { data, homePlanet, films, starships }: localStorageData = JSON.parse(character);
      setCharacter(data);
      setHomePlanet(homePlanet);
      setFilms(films);
      setStarships(starships);
      return;
    }

    const fetchData = async () => {
      if (!id) return;
      const data = await fetchCharacterDetails(id);
      setCharacter(data);
      const planetName = await fetchHomePlanet(data.homeworld);
      setHomePlanet(planetName);
      const filmsData = await fetchFilms(data.films);
      setFilms(filmsData);
      const starshipsData = await fetchStarships(data.starships);
      setStarships(starshipsData);

      const characterData = {
        data: data,
        homePlanet: planetName,
        films: filmsData,
        starships: starshipsData,
      }
      localStorage.setItem(`character[${id}]`, JSON.stringify(characterData));
    };
    fetchData();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  const isFavourite = favourites.some((fav) => fav.name === character.name);

  return (
    <>
      <nav style={{ textAlign: 'left' }}>
        <a href="/">&larr; Back to Character List</a>
      </nav>
      <h1>{character.name}</h1>
      <p>Hair Colour: {character.hair_color}</p>
      <p>Eye Colour: {character.eye_color}</p>
      <p>Gender: {character.gender}</p>
      <p>Home Planet: {homePlanet}</p>
      <p>Films: {films.join(', ')}</p>
      <p>Starships: {starships.join(', ')}</p>
      <button onClick={() => (isFavourite ? removeFromFavourites(character) : addToFavourites({...character, homeworld: homePlanet}))}>
        {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
      </button>
    </>
  );
};

export default CharacterDetail;
