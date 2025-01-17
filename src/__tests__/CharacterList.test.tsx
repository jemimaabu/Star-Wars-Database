import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from '../../src/components/CharacterList';
import { MemoryRouter } from 'react-router-dom';

test('returns search result according to input query', async () => {
  render(
    <MemoryRouter>
      <CharacterList />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search by name');
  fireEvent.change(input, { target: { value: 'Luke' } });

  // Ensure the pagination and search results are working
  expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
});
