# Abacus Desktop App

A desktop application built with Electron + React (Vite) for kids to practice Abacus calculations.

## Features

- Multiple difficulty levels (Beginner to Master)
- Custom level configuration
- Random question generation with + and - operations
- 1-3 digit numbers support
- Kid-friendly UI with colorful gradients
- Desktop application for Windows, Mac, and Linux

## Tech Stack

- **Electron** - Desktop application framework
- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript** - Programming language
- **pnpm** - Package manager

## Installation

1. Install pnpm if you haven't already:
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

## Development

Run the application in development mode:

```bash
pnpm dev
```

This will:
- Start the Vite dev server on port 5173
- Launch Electron with hot reload enabled
- Open DevTools automatically

## Building

Build the React application and package it for production:

```bash
pnpm build
```

This will create optimized production files in `app/dist/`.

## Packaging

Create distributable packages for your platform:

```bash
pnpm electron:build
```

This will create installers in the `dist/` directory:
- Windows: `.exe` installer
- Mac: `.dmg` installer
- Linux: `.AppImage`

## Project Structure

```
abacus-desktop-app/
├── package.json           # Root package.json with workspaces
├── electron/
│   ├── main.js           # Electron main process
│   └── preload.js        # Preload script for security
└── app/
    ├── package.json      # Vite app dependencies
    ├── vite.config.js    # Vite configuration
    ├── index.html        # HTML entry point
    └── src/
        ├── main.jsx      # React entry point
        ├── App.jsx       # Main App component
        ├── styles.css    # Global styles
        ├── logic/
        │   └── generator.js    # Question generation logic
        └── components/
            ├── LevelSelector.jsx    # Level selection screen
            └── PracticeScreen.jsx   # Practice questions screen
```

## License

MIT
