# Vue Login App - Product & Customer Management System

A Vue.js application that provides authentication, product master management, and customer product management functionality with a clean, responsive Bootstrap interface.

## Project Overview

This project demonstrates:

- User authentication with localStorage persistence
- Modular Vue.js architecture with Composition API
- Vue Router for navigation with authentication guards
- Pinia for state management
- Bootstrap 5 for responsive UI components
- lowdb for local database functionality

## Features

- **Authentication System**: Secure login with localStorage persistence
- **Product Master Management**: Create, read, update, and delete product information
- **Customer Product Management**: Manage customer-specific product information
- **Responsive Design**: Mobile-friendly UI using Bootstrap

## Login Credentials

The application comes with a pre-configured admin user:

- Username: `admin`, Password: `admin123`

## Project Setup

```sh
# Install dependencies
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/) and Format with [Prettier](https://prettier.io/)

```sh
# Lint and fix files
npm run lint

# Format files
npm run format
```

## Project Structure

- `src/modules/`: Contains feature modules:
  - `auth/`: Authentication and user management
  - `product/`: Product master management
  - `customer/`: Customer product management
  - `main/`: Main application layout and dashboard
- `src/router/`: Contains the Vue Router configuration with auth guards
- `src/db/`: Contains the lowdb database configuration and initial data
- `src/services/`: Contains API and service layer
- `src/stores/`: Contains global Pinia stores
- `src/components/`: Contains shared components
- `src/assets/`: Contains global CSS and other assets
- `src/styles/`: Contains global styles
- `src/composables/`: Contains reusable composition functions
- `src/utils/`: Contains utility functions

## Database

The application uses lowdb with a LocalStorageAdapter to persist data in the browser's localStorage. The database includes:

- Units (measurement units)
- Makers (manufacturers)
- Products
- Customer products

## Tech Stack

- Vue.js 3.5
- Vue Router 4.5
- Pinia 3.0
- Bootstrap 5.3 with Bootstrap Icons
- Axios 1.8
- lowdb 7.0
- Vite 6.1
- ESLint 9.20
- Prettier 3.5
- Vitest 3.0
- Playwright 1.50
