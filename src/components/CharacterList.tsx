import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCharacters, fetchHomePlanet } from '../services/swapi';
import { Character } from '../types'; 
import { genderFontColor } from '../utils/utils'; 
import '../styles/CharacterList.css';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Search for characters in local storage on page load to reduce API calls
      if (!search) {
        const characters = localStorage.getItem(`starwars[${page}]`);

        if (characters) {
          setCharacters(JSON.parse(characters));
          setLoading(false);
          return;
        }
      }
      
      const data = await fetchCharacters(page, search);
      const charactersWithHomeworld = await Promise.all(
        data.results.map(async (character: Character) => {
          const homeworld = character.homeworld ? await fetchHomePlanet(character.homeworld) : '';
          return { ...character, homeworld };
        })
      );

      // Store characters in local storage on page load
      if (!search) {
        localStorage.setItem(`starwars[${page}]`, JSON.stringify(charactersWithHomeworld));
      }

      //TODO: Include url params update to store page and search in url

      setCharacters(charactersWithHomeworld);
      setLoading(false);
    };

    fetchData();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <input
        className="search-input"
        type="search"
        placeholder="Search by name"
        value={search}
        onChange={handleSearchChange}
      />

      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <>
          {
            characters.length === 0 ? 
            <p>No characters found</p> :
            (
              <>
                <ul className="character-list">
                  {characters.map((character) => (
                    <li key={character.name} className="character-list__item">
                      <Link to={`/character/${character.url.split('people/')[1]}`}  className="character-content">
                        <div>
                          <span className="character-name">{character.name}</span> 
                          <div className="character-attributes">
                            <span className="character-attribute">{character.homeworld}</span>
                            <span className="character-attribute" style={genderFontColor(character.gender)}>{character.gender}</span>
                          </div>
                        </div>
                        <span className="see-more">See more</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className='pagination-container'>
                  <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                    Previous
                  </button>
                  <button onClick={() => setPage(page + 1)} disabled={characters.length < 10}>
                    Next
                  </button>
                </div>
              </>
            )
          }
        </>
      )}
    </>
  );
};

export default CharacterList;
