# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based Tetris game implemented in Japanese. The project is a single-file HTML application that provides a fully functional Tetris game with modern styling and responsive design.

## Architecture

The project uses a single-file HTML architecture with embedded CSS and JavaScript:

- **tetris.html**: Complete Tetris game implementation with embedded styles and game logic

## Key Features

- **Classic Tetris gameplay**: All 7 standard Tetris pieces (I, O, T, S, Z, J, L) with proper rotation and collision detection
- **Japanese interface**: All UI text and controls are in Japanese
- **Modern visual design**: Glass-morphism UI with gradients, blur effects, and smooth animations
- **Responsive layout**: Adapts to mobile devices with flexbox layout
- **Game features**:
  - Score tracking with level progression
  - Next piece preview
  - Pause functionality
  - Game over handling with restart option
  - Progressive speed increase based on level

## Technical Implementation

- **Canvas-based rendering**: Uses HTML5 Canvas for smooth game board and piece rendering
- **Keyboard controls**: WASD for movement/rotation, spacebar for pause
- **Game loop**: Uses requestAnimationFrame for smooth 60fps gameplay
- **Collision detection**: Proper boundary and piece collision checking
- **Line clearing**: Standard Tetris line clearing with scoring system

## Development Notes

This is a pure static HTML file with no build process, package management, or testing frameworks. All functionality is implemented with vanilla HTML, CSS, and JavaScript using modern browser APIs like Canvas 2D and requestAnimationFrame.
