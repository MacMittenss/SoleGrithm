# SoleGrithm - Sneaker Community Platform

## Overview
SoleGrithm is an AI-powered sneaker community platform integrating e-commerce, social networking, and intelligent discovery features. It serves as a central hub for sneaker enthusiasts to discover, collect, review, and trade sneakers, leveraging AI for personalized recommendations, trend analysis, and market insights. The platform’s key differentiator is its AI-driven discovery section, offering collaborative filtering, intelligent chat assistance, and image recognition capabilities, and has market potential to become a leading destination for sneaker culture and commerce.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (Phase 6 - UX Polish Complete)
- **Enhanced UI Components**: Created comprehensive micro-interaction library with ripple effects, hover animations, pulse effects, and smooth transitions
- **Mobile Navigation**: Implemented bottom navigation bar with indicator animations and slide-out menu with backdrop blur
- **Visual Enhancements**: Added gradient backgrounds with floating orbs, glass morphism cards, parallax scrolling sections
- **Interactive Elements**: Enhanced search with real-time suggestions, enhanced inputs with validation, floating action buttons
- **Accessibility Features**: Skip-to-content links, keyboard navigation support, ARIA labels, focus indicators
- **Performance Polish**: Loading states with progressive indicators, skeleton screens, optimized animations
- **Toast Notifications**: Complete notification system with progress bars and stacking animations
- **Page Transitions**: Smooth route transitions with Framer Motion animations
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interactions

## System Architecture

The application employs a modern full-stack architecture with clear separation of concerns.

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Framework**: Custom component library built on Radix UI primitives with shadcn/ui design system (New York style variant), supporting dark/light themes.
- **Styling**: Tailwind CSS with CSS variables
- **Build Tool**: Vite
- **UI/UX Decisions**: Responsive design optimized for mobile and desktop, interactive hover previews for sneaker cards, visual adaptation for dynamic content rotation (e.g., "AI Picks of the Day"), professional market data cards, and advanced AR controls.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Authentication
- **AI Integration**: OpenAI API for chat, recommendations, content generation, image analysis, and user profiling with smart fallback systems for quota management.
- **Data Strategy Services**: Modular architecture for user tracking, Firebase profiles, third-party sync, and AI personalization.
- **Anonymous Analytics**: Session-based tracking system.
- **Market Data Integration**: Live price feeds and market analysis.

### Core Features & Design Patterns
- **Authentication**: Firebase handles user registration, login, and token management, with automatic local database creation for new users.
- **Database Layer**: Drizzle ORM with PostgreSQL (Neon serverless) for type-safe operations and schema migrations.
- **AI-Powered Features**: SoleBot (chat assistant), AI-generated content and collections with intelligent fallbacks, sneaker image recognition and analysis (OpenAI GPT-4o Vision API), price prediction, personalized recommendations, AI user profiling, anonymous interaction analysis, and real-time personalization.
- **Data Flow**: Frontend uses Firebase tokens for authenticated requests; backend verifies tokens; Drizzle ORM handles database operations. AI API calls are managed via a dedicated service layer with robust fallback systems.
- **Data Storage Strategy**: User profiles, sneaker catalog, collections, reviews, and price history are stored in PostgreSQL.
- **Interactive Map**: A geographic map visualizes sneaker trends across major US cities with heat map visualization and city-specific insights, integrated into the navigation.
- **Unified Live Market**: Catalog and Live Market sections are merged into a single "Live Market" experience with real-time price indicators and market analytics.
- **Enhanced Detail Pages**: Live market data display, AR Try-On functionality, and direct purchase links integrated into SneakerDetail pages.

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL
- **Authentication**: Firebase
- **AI Services**: OpenAI API
- **External APIs**: StockX, GOAT (for sneaker market data)

### Development Tools
- **Build System**: Vite
- **Type Checking**: TypeScript
- **CSS Framework**: Tailwind CSS
- **Package Management**: npm

### UI and UX Libraries
- **Component Library**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns