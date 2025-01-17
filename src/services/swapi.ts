import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

export const fetchCharacters = async (page: number, search: string) => {
  const response = await axios.get(`${SWAPI_BASE_URL}people/`, {
    params: { page, search },
  });
  return response.data;
};

export const fetchCharacterDetails = async (id: string) => {
  const response = await axios.get(`${SWAPI_BASE_URL}people/${id}/`);
  return response.data;
};

export const fetchHomePlanet = async (url: string) => {
  const response = await axios.get(url);
  return response.data.name;
};

export const fetchFilms = async (films: string[]) => {
  const filmPromises = films.map((url) => axios.get(url));
  const filmResponses = await Promise.all(filmPromises);
  return filmResponses.map((response: { data: { title: any; }; }) => response.data.title);
};

export const fetchStarships = async (starships: string[]) => {
  const starshipPromises = starships.map((url) => axios.get(url));
  const starshipResponses = await Promise.all(starshipPromises);
  return starshipResponses.map((response: { data: { name: any; }; }) => response.data.name);
};
