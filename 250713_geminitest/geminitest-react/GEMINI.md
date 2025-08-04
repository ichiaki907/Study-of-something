# GEMINI.md
全て日本語で対応してください

## Project Overview

This is a React-based web application designed as a digital stamp rally. Users can virtually "collect" stamps from various locations and unlock rewards or benefits based on the number of stamps they have. The application is highly configurable through JSON files, allowing for easy customization of stamp locations, benefits, and visual elements like the key visual and theme colors.

The project is bootstrapped with `create-react-app` and utilizes Tailwind CSS for styling.

## Building and Running

### Prerequisites

- Node.js and npm (or yarn)

### Installation

```bash
npm install
```

### Running the application

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for production

To create a production-ready build:

```bash
npm run build
```

This will build the app for production to the `build` folder.

### Running tests

To run the test suite:

```bash
npm test
```

## Development Conventions

### Configuration

The application's behavior and content are primarily managed through JSON files located in the `src/data` directory:

-   `app-settings.json`: The main configuration file. It controls the application's title, theme, event period, key visual, and other global settings.
-   `stamps.json`: Defines the stamp rally locations, including their names, descriptions, images, and whether they have been "stamped".
-   `benefits.json`: Defines the rewards that users can obtain by collecting a certain number of stamps.

### Component Structure

The application's UI is built with React components, organized within the `src/components` directory. The components are further categorized into `features`, `layout`, and `ui` subdirectories.

### Styling

The project uses Tailwind CSS for styling. Custom styles and theme configurations can be found in `tailwind.config.js`. The application's color theme is dynamically applied based on the settings in `app-settings.json`.

### Utilities

Utility functions are located in the `src/utils` directory. These functions provide helper methods for managing application settings, stamps, and benefits.
