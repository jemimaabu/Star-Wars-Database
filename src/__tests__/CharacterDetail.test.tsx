import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterDetail from '../../src/components/CharacterDetail';

test('displays character details', async () => {
  render(
    <MemoryRouter initialEntries={['/character/1']}>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the character's data to load and check if the name appears
  expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
});
