# Allica Star Wars

This project is a Star Wars character finder application using the [swapi.dev API](https://swapi.dev/) and React (with TypeScript). It allows you to view characters from the Star Wars universe, search for specific characters, view details about them, and add them to a favourites list.

## Helpful Commands

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Run tests

```bash
npm test
```

## Features

- **Character List View**:
  - List all Star Wars characters with name, gender, and home planet.
  - Pagination to step through results.
  - Search bar to query by character name.
  - Click on a character to view detailed information.
  
- **Character Details View**:
  - Shows details: name, hair colour, eye colour, gender, and home planet.
  - Displays films and starships the character has appeared in.
  - Add the character to the favourites list.

- **Favourites View**:
  - Shows all characters added to the favourites list.
  - Option to remove characters from the favourites list.
  - Note: The favourites view is handled using local storage so if you load the app on a different browser, previously favourited characters won't be displayed