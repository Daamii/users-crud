# Users CRUD

User management application built with React, TypeScript, Vite, Redux Toolkit, and i18next.

## Features

### User Management

- User listing with pagination, filtering, sorting, and search
- User creation, editing, and deletion
- Avatar selection using pravatar.cc API

### Visualización

- Grid view with user cards
- Table view with fixed headers
- Scrollable content with blur effect
- Mobile-responsive design (forces grid on mobile)

### Filtering & Sorting

- Search by name or email (with debounce)
- Filter by role (Administrador, Usuario, Editor, Moderador)
- Sort by name, email, or role (ascending/descending)

### Personalización

- Light/Dark theme toggle (persisted in localStorage)
- Multi-language support (Spanish/English)
- Grid/Table view toggle (persisted in localStorage)

### UX

- Toast notifications for CRUD operations
- Phone input with country prefix selector
- Loading states
- Error handling
- Lazy loading for detail/edit/create pages

### Technical

- Mock data (75 users) or external API support
- UUID-based user IDs
- Redux Toolkit for state management
- TypeScript with strict typing
- Vitest for testing

## Requirements

| Tool       | Version |
| ---------- | ------- |
| Node.js    | 18+     |
| npm        | 9+      |
| React      | 18.2+   |
| TypeScript | 5.2+    |
| Vite       | 5.1+    |

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

Copy the environment file and configure as needed:

```bash
cp .env.example .env
```

### Environment Variables

| Variable             | Description              | Default                                           |
| -------------------- | ------------------------ | ------------------------------------------------- |
| `VITE_API_URL`       | External API URL         | `https://reqres.in/api/collections/users/records` |
| `VITE_API_KEY`       | API key for external API | -                                                 |
| `VITE_USE_MOCK_DATA` | Use local mock data      | `true`                                            |

To use external API, set `VITE_USE_MOCK_DATA=false` in `.env`.

## Running Locally

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React contexts
├── data/             # Mock data (JSON)
├── hooks/           # Custom React hooks
├── icons/           # Icon components
├── locales/         # i18n translations
├── pages/           # Page components
├── services/        # API services
├── store/           # Redux store
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/          # Utility functions
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- i18next
- SCSS
