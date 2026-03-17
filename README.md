# Users CRUD

> User management application built with React, TypeScript, Vite, Redux Toolkit, and i18next

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://daamii.github.io/users-crud)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

## 🌐 Live Demo

**Production:** https://daamii.github.io/users-crud

> ⚠️ If the external API doesn't work, use mock data: https://daamii.github.io/users-crud/?mock=true

---

## ✨ Features

### User Management

- 📋 User listing with **pagination**, **filtering**, **sorting**, and **search**
- ➕ Create, ✏️ edit, and 🗑️ delete users
- 🖼️ Avatar selection using pravatar.cc API

### Views

- 🃏 Grid view with user cards
- 📊 Table view with fixed headers
- 🎨 Scrollable content with blur effect
- 📱 Mobile-responsive design

### Filtering & Sorting

- 🔍 Search by name or email (with debounce)
- 🎭 Filter by role
- ↕️ Sort by name, email, or role

### Customization

- 🌓 Light/Dark theme toggle
- 🌎 Multi-language support (Spanish/English)
- 🎨 Grid/Table view toggle

### UX

- 🍞 Toast notifications
- 📞 Phone input with country prefix
- ⏳ Loading states
- ⚠️ Error handling

---

## 🚀 Quick Start

```bash
# Install
npm install

# Development
npm run dev
```

---

## 📖 Usage

### Default (External API)

```
https://daamii.github.io/users-crud/
```

### Mock Data (Fallback)

```
https://daamii.github.io/users-crud/?mock=true
```

---

## 🛠️ Tech Stack

<div align="center">

| Technology    | Badge                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| React         | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)               |
| TypeScript    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| Vite          | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)                   |
| Redux Toolkit | ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)                |
| i18next       | ![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat&logo=i18next&logoColor=white)          |

</div>

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Mock data
├── hooks/          # Custom React hooks
├── icons/          # Icon components
├── locales/        # i18n translations
├── pages/          # Page components
├── services/       # API services
├── store/          # Redux store
├── styles/         # Global styles
├── test/           # Test files
├── types/          # TypeScript types
└── utils/          # Utility functions
```

---

## 📋 Available Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npm run preview`  | Preview production build |
| `npm run test`     | Run tests (watch mode)   |
| `npm run test:run` | Run tests once           |

---

## 📄 License

MIT
