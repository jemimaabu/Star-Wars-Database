import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavouritesProvider, useFavourites } from '../../src/contexts/FavouritesContext';

const TestComponent: React.FC = () => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  return (
    <div>
      <button onClick={() => addToFavourites({ name: 'Luke Skywalker', height: '1.72', gender: 'male', homeworld: 'Tatooine' })}>
        Add to Favourites
      </button>
      <ul>
        {favourites.map((char) => (
          <li key={char.name}>
            {char.name}
            <button onClick={() => removeFromFavourites(char)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

test('adds and removes favourites', async () => {
  render(
    <FavouritesProvider>
      <TestComponent />
    </FavouritesProvider>
  );

  const addButton = screen.getByText(/Add to Favourites/i);
  fireEvent.click(addButton);

  expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

  const removeButton = screen.getByText(/Remove/i);
  fireEvent.click(removeButton);

  expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
});
