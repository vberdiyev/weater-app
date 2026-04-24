# Weather Experience 🌤️

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Overview

**Weather Experience** is a sophisticated, enterprise-grade weather monitoring solution engineered with a focus on high-performance frontend architecture and prioritized UI/UX design. By integrating real-time meteorological data with dynamic environmental visualization, the application provides an immersive user experience that adapts both aesthetically and functionally to the user's context.

The system utilizes a modern reactive stack to ensure low-latency data synchronization, persistent user preferences, and a mathematically grounded design system.

---

## ✨ Key Features

-   **Autonomous Contextual Adaptability**: Implements an automated theme-switching engine that synchronizes the interface with the astronomical status (Day/Night) of the queried location via local sunrise and sunset vectors.
-   **Multi-Metric Meteorological Analysis**: Beyond standard temperature reporting, the system provides detailed indices for Atmospheric Pressure, Visibility (km), Cloud Coverage, Humidity, and Wind Velocity.
-   **Advanced State Persistence**: Utilizes **Zustand** with middleware integration to manage a persistent search history and global settings (e.g., metric vs. imperial units) across browser sessions.
-   **Optimized Data Caching**: Employs **TanStack Query (v5)** for asynchronous state management, featuring intelligent stale-time configurations and automated background re-fetching.
-   **Glassmorphism UI Framework**: A design-centric interface leveraging **Tailwind CSS v4**'s Oxide Engine for high-performance rendering of blurred backdrops and complex transitions.

## 🛠️ Technical Specifications

| Layer | Technology | Functional Role |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component-based UI Library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development environment |
| **Styling** | [Tailwind CSS v4.0](https://tailwindcss.com/) | JIT Utility-first CSS engine |
| **State Management** | [Zustand](https://docs.pmnd.rs/zustand/) | Centralized flux-pattern state |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest) | Server-state management & Caching |
| **Routing** | [React Router 7](https://reactrouter.com/) | Client-side navigation & deep linking |
| **Iconography** | [Lucide React](https://lucide.dev/) | Accessible vector graphics |

---

## 📂 Architecture & Directory Structure

The project adheres to a modular, domain-driven structure to ensure scalability and maintainability:

```text
src/
├── api/          # Stateless fetch definitions
├── hooks/        # Domain-specific logic (e.g., useWeather)
├── store/        # Persistent state containers (Theme, Weather, Settings)
├── types/        # Global TypeScript interfaces & schemas
├── pages/        # View-level route components
├── components/   # Reusable UI molecules and atoms
└── App.tsx       # Root configuration & Provider orchestration