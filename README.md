
# AnimeLad — Anime Discovery Platform

AnimeLad is a full-stack anime discovery platform that helps users explore anime, search for titles, view detailed information, and maintain a personal watchlist with notes.

Built as a learning milestone project, AnimeLad demonstrates modern frontend development, backend API integration, client-side state management, caching, and responsive UI/UX design.

## Live Demo

- **Frontend:** https://animelad-v2.vercel.app
- **Backend:** https://animelad.onrender.com/

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query
- React Context API
- React Icons
- DOMPurify

### Backend
- Node.js
- Express
- TypeScript
- GraphQL
- AniList API

## Features

- **Anime Discovery** — Explore trending, popular, currently airing, and top-rated anime.
- **Anime Search** — Search for anime with a debounced search experience and live previews.
- **Detailed Anime Information** — View descriptions, genres, scores, studios, characters, voice actors, trailers, and related anime.
- **Personal Watchlist** — Add and remove anime from a locally persisted watchlist.
- **Personal Notes** — Write notes for saved anime, with changes persisted in localStorage.
- **Genre Discovery** — Find anime based on genres.
- **Responsive Design** — Optimized layouts for mobile, tablet, and desktop.
- **Loading States** — Skeleton loaders and clear feedback during data fetching.
- **Client-Side Caching** — TanStack Query helps cache and manage API requests.
- **Error Handling** — Structured backend errors and user-facing error states.
- **Keyboard Accessibility** — Keyboard-friendly navigation and search interactions.

## Architecture

AnimeLad uses a separated frontend and backend architecture.

- **Frontend:** React application responsible for rendering the interface, routing, client-side caching, and watchlist management.
- **Backend:** Express API that communicates with the AniList GraphQL API and provides anime data to the frontend.
- **Watchlist Storage:** Browser localStorage stores saved anime and personal notes, so no user authentication or database is required for the current watchlist implementation.

## Project Structure

```text
AnimeSearchApp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── errors/
│   │   ├── graphql/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── queries/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Key Concepts Demonstrated

- Full-stack application architecture
- REST API development with Express
- Third-party GraphQL API integration
- TypeScript across the frontend and backend
- Server-state management and caching with TanStack Query
- Client-side state management with React Context
- Local persistence with localStorage
- Reusable component architecture
- Responsive design with Tailwind CSS
- Asynchronous operations and loading states
- Error handling and edge cases
- Accessible interaction patterns

## Deployment

- **Frontend:** Vercel
- **Backend:** Render

Deployment URLs and environment variables should be configured for the appropriate environment.

## Data Source

Anime data is provided by the [AniList API](https://anilist.co/graphiql).

## Future Improvements

- Further performance optimization
- Additional anime discovery features
- Improved watchlist management
- Expanded testing and accessibility coverage

---

Built by [LadoSky](https://ladosky.vercel.app/).
