# Users CRUD

User management application built with React, TypeScript, Vite, Redux Toolkit, and i18next.

## Features

- User listing with pagination, filtering, sorting, and search
- User creation, editing, and deletion
- Avatar selection using pravatar.cc API
- Light/Dark theme support
- Multi-language support (Spanish/English)
- Grid/Table view toggle
- Mobile-responsive design
- URL parameter persistence for filters/pagination
- Toast notifications for CRUD operations

## Requirements

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |
| React | 18.2+ |
| TypeScript | 5.2+ |
| Vite | 5.1+ |

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

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | External API URL | `https://reqres.in/api/collections/users/records` |
| `VITE_API_KEY` | API key for external API | - |
| `VITE_USE_MOCK_DATA` | Use local mock data | `true` |

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
