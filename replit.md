# SoleGrithm - Sneaker Community Platform

## Overview

SoleGrithm is a comprehensive sneaker community platform that combines e-commerce, social networking, and AI-powered features. The application serves as a hub for sneaker enthusiasts to discover, collect, review, and trade sneakers while leveraging artificial intelligence for personalized recommendations and market insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Custom component library built on Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming support
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for REST API development
- **Language**: TypeScript for consistent type safety across the stack
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Firebase Authentication for user management and JWT token verification
- **AI Integration**: OpenAI API for chat functionality, recommendations, and content generation

## Key Components

### Authentication System
- Firebase Authentication handles user registration, login, and token management
- Backend middleware verifies Firebase tokens and manages user sessions
- Automatic user creation in local database upon first authentication
- Support for Google OAuth and email/password authentication

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Comprehensive database schema covering users, sneakers, brands, collections, reviews, price history, and blog content
- **Migrations**: Drizzle Kit manages database schema migrations
- **Connection**: Neon serverless PostgreSQL for scalable database hosting

### AI-Powered Features
- **Chat Assistant**: SoleBot provides sneaker expertise and recommendations
- **Content Generation**: AI-powered blog content creation and enhancement
- **Image Analysis**: Sneaker image recognition and analysis capabilities
- **Price Prediction**: Market trend analysis and price forecasting
- **Personalized Recommendations**: User preference-based sneaker suggestions

### UI Component System
- Built on Radix UI primitives for accessibility and customization
- shadcn/ui component library with New York style variant
- Comprehensive component coverage including forms, navigation, data display, and feedback
- Dark/light theme support through CSS variables
- Responsive design optimized for mobile and desktop

## Data Flow

### Client-Server Communication
1. Frontend makes authenticated requests using Firebase tokens
2. Backend middleware verifies tokens and extracts user information
3. Database operations performed through Drizzle ORM with type safety
4. API responses cached by TanStack Query for optimal performance

### AI Integration Flow
1. User interactions trigger AI API calls through dedicated service layer
2. OpenAI API processes requests with context-aware prompts
3. Responses integrated into user interface with loading states and error handling
4. Chat history and preferences stored for personalized experiences

### Data Storage Strategy
- User profiles and preferences stored in PostgreSQL
- Sneaker catalog with comprehensive metadata and images
- Collection management with wishlist and ownership tracking
- Review and rating system with user-generated content
- Price history tracking for market analysis

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL for serverless database hosting
- **Authentication**: Firebase for user management and authentication
- **AI Services**: OpenAI API for natural language processing and recommendations
- **External APIs**: Integration with sneaker market data providers (StockX, GOAT)

### Development Tools
- **Build System**: Vite with React plugin for development and production builds
- **Type Checking**: TypeScript compiler for static type analysis
- **CSS Framework**: Tailwind CSS with PostCSS processing
- **Package Management**: npm for dependency management

### UI and UX Libraries
- **Component Library**: Radix UI for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation and formatting

## Deployment Strategy

### Development Environment
- Local development with Vite dev server for frontend
- Express server with hot reloading via tsx
- Environment variables for API keys and database connections
- Firebase emulator support for local authentication testing

### Production Build Process
1. Frontend assets built with Vite and optimized for performance
2. Backend compiled with esbuild for Node.js deployment
3. Static assets served from CDN or static hosting
4. API server deployed to serverless or container platform

### Environment Configuration
- Separate configurations for development, staging, and production
- Environment variables for sensitive data and API endpoints
- Database migrations managed through Drizzle Kit CLI
- Continuous deployment with automated testing and quality checks