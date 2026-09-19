# MeeksPedia

A web application built with React, TypeScript, and Vite that consumes the Rick and Morty REST API. It allows users to explore the character catalog, perform real-time searches with request optimization, view extended details, and manage a persistent favorites list.

## Members
- Juan Jose Avendaño Zapata
- Samuel Stevan Arias Tuquerres

## Features
- **RF-01 (Character Listing):** Modular display of character cards (`CharacterCard`) in a responsive grid.
- **RF-02 (Details and Loading States):** Detailed view (`CharacterDetail`) with extended information (origin, location, episodes). Centralized state management using `<StatusMessage />` (*Loading*, *Error*, *Empty*).
- **RF-03 (Search with Debounce):** Controlled search input featuring a manual 400ms delay (*debounce*) in `useEffect` and cancellation of pending requests via `AbortController` to prevent race conditions.
- **RF-05 (Favorites and Persistence):**
  - State lifted up (*Lifting State Up*) to `MeeksPediaApp` to preserve favorites across navigation.
  - Automatic synchronization with `localStorage`.
  - Interactive floating indicator (star) on cards and detailed view isolated using `e.stopPropagation()`.
  - Global counter in the header and toggle switch to filter and display only the favorites list in batch (`getMultipleCharacters`).
- **RF-06 (Error Handling and Retry):**
  - Extension of the `<StatusMessage />` component with an optional `onRetry` prop that renders a retry button exclusively when an error occurs.
  - Implementation of retry logic in `ListCharacters` and `CharacterDetail` using the `retryCount` state as a dependency of `useEffect`, allowing the failed request to be re-executed without duplicating code or reloading the page.
- **Modular Design:** Styled using CSS Modules and global CSS variables (`variables.css`) under a Dark Minimal theme.

## Tech Stack
- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styles:** CSS Modules & Native CSS Variables
- **API Target:** [Rick and Morty API](https://rickandmortyapi.com/)

## Prerequisites
- Node.js v20.x.x LTS
- npm (included with Node.js)

## Instructions for Running Locally

1. **Clone Repository:**
   ```bash
   git clone https://github.com/juanjoazedu/SOF1_MeeksPedia_TeamOmega.git
   cd MeeksPedia
   npm install
   npm run dev
   ```
2. **Install dependencies**
   ```bash
   cd MeeksPedia
   npm install
   ```
3. **Run Project**
   ```bash
   npm run dev
   ```