# replit.md

## Overview

This is a SoleGrithm XR display technology website built with a full-stack TypeScript architecture. The project showcases a futuristic product marketing site featuring XR/AR display devices with modern animations, gradient effects, and interactive components. The application serves as a marketing platform for the SoleGrithm 2.0 product line including Pro, Ultra, and Essential variants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system featuring gradient themes
- **Component Library**: Radix UI components with shadcn/ui styling
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development Setup**: Custom Vite middleware integration for SSR-like development experience
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **API Design**: RESTful API structure with centralized route registration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User management with username/password authentication
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Configured for Neon Database serverless PostgreSQL

### Component Architecture
- **Design System**: Custom gradient-based theme with CSS variables
- **UI Components**: Modular component structure with reusable UI primitives
- **Animations**: CSS-based animations with scroll-triggered effects
- **Responsive Design**: Mobile-first approach with breakpoint-specific styling

### Development Tooling
- **TypeScript**: Strict configuration with path aliases for clean imports
- **Code Quality**: ESLint and Prettier integration through Vite
- **Hot Reload**: Vite HMR with React Fast Refresh
- **Error Handling**: Runtime error overlay for development

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Build Tools**: Vite, ESBuild for production bundling
- **TypeScript**: Full TypeScript support with strict configuration

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations with schema generation
- **Database Connection**: @neondatabase/serverless for edge-compatible queries

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library based on Radix
- **Lucide React**: Icon library for consistent iconography

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution
- **React Hook Form**: Form state management with validation

### Development and Production
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Session Management**: Express session handling with PostgreSQL store
- **Error Handling**: Centralized error boundary and logging system