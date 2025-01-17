import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { FavouritesProvider } from './contexts/FavouritesContext';
import Favourites from './components/Favourites';
import starwars from './assets/star-wars.png';
import './App.css';

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <>
          <nav className="nav">
            <div className="logo">
              <img src={starwars} alt="Star Wars"  className="nav-logo" />
            </div>
            <div className="nav-links">
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/"
              >
                Characters
              </NavLink>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/favourites"
              >
                Favourites
              </NavLink>
              {/* <a href="/">Characters</a>
              <a href="/favourites">Favourites</a> */}
            </div>
          </nav>
            
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
                <Route path="/favourites" element={<Favourites />} />
              </Routes>
            </div>
          </main>

          <footer>
            <p>
              Built by <a href='https://www.jemimaabu.com' target='_blank'>Jemima Abu </a> {(new Date().getFullYear())}
              <br />
              <small>Star Wars&copy; data from <a href="https://swapi.dev/">SWAPI</a> </small>
            </p>
          </footer>
        </>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
