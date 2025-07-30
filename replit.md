# SoleGrithm - Sneaker Community Platform

## Overview

SoleGrithm is a comprehensive AI-powered sneaker community platform that combines e-commerce, social networking, and intelligent discovery features. The application serves as a hub for sneaker enthusiasts to discover, collect, review, and trade sneakers while leveraging artificial intelligence for personalized recommendations, trend analysis, and market insights. The platform now features a complete AI-driven discovery section that differentiates it from competitors through collaborative filtering, intelligent chat assistance, and image recognition capabilities.

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
- **Data Strategy Services**: Modular service architecture for user tracking, Firebase profiles, third-party sync, and AI personalization
- **Anonymous Analytics**: Session-based tracking system for collecting interaction data without user accounts
- **Market Data Integration**: Live price feeds and market analysis from StockX and GOAT APIs

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
- **AI User Profiling**: OpenAI GPT-4o generates comprehensive user behavior profiles for personalization
- **Anonymous Interaction Analysis**: AI-driven insights from anonymous user behavior patterns
- **Real-Time Personalization**: Dynamic recommendation engine that adapts with every user visit

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

## Recent Changes (July 29, 2025)

### Interactive Hover Preview System Implementation
- **Enhanced Product Discovery**: Interactive hover previews for sneaker cards with 500ms activation delay
- **Comprehensive Preview Cards**: Expanded sneaker information including multiple images, ratings, trending data, and detailed specifications
- **Smart Positioning**: Automatic viewport-aware positioning prevents preview overflow at screen edges
- **Image Gallery**: Auto-advancing image slideshow with manual navigation controls and indicators
- **Rich Metadata**: Displays brand information, release dates, size availability, materials, colorway details, and user ratings
- **Action Integration**: Quick access to collection and wishlist functionality directly from hover preview
- **Catalog Integration**: Full integration with catalog grid view and home page featured sneakers
- **Performance Optimized**: Smooth animations using Framer Motion with proper cleanup and hover state management

### Previous: Daily Content Rotation System Implementation
- **Dynamic Hero Slider**: "What's Hot Right Now" section now rotates content daily based on day of year
- **Three Content Types**: 
  - "AI Picks of the Day" (Purple theme, Sparkles icon, AI recommendations endpoint)
  - "Newly Added to the Archive" (Green theme, Archive icon, featured sneakers endpoint)
  - "Recently Dropped" (Orange theme, Zap icon, trending sneakers endpoint)
- **Visual Adaptation**: Each content type has unique color schemes, gradients, and icons
- **Date Integration**: Shows current date with "Updates daily" indicator
- **Navigation Branding**: Updated navbar buttons to "Sole Search" and "Sole Map" for consistent theming

## Previous Changes (July 28, 2025)

### Step 7: Sneaker Discovery Map Implementation
- **Interactive Geographic Map**: Visual map showing sneaker trends across major US cities with real-time data
- **Heat Map Visualization**: Color-coded activity levels (hot/warm/cool/cold) based on trend scores
- **City-Based Insights**: Clickable city points revealing detailed trend data including:
  - Sneaker popularity rankings and trend scores
  - Price change percentages and search volumes
  - Regional preference patterns and market activity
- **Geographic Trends Database**: New schema with latitude/longitude coordinates, trend scoring, and regional analytics
- **Navigation Integration**: Added "Trend Map" to main navigation with MapPin icon

### Previous AI-Powered Features (July 27, 2025)
- **Personalized Recommendations**: Built collaborative filtering system with user preference inputs (style, budget, occasion, brands)
- **Trending Analysis**: Real-time trending sneaker identification with growth metrics and market data visualization
- **AI Chat Assistant (SoleBot)**: Interactive chat with contextual sneaker expertise, market insights, and quick action buttons
- **Image Recognition**: Upload-based sneaker identification with brand recognition, style categorization, and market value estimation
- **Smart Filtering**: Budget-based filtering ("under $200", "$100-300") and brand preference matching
- **Enhanced UI**: Professional tabbed interface with loading states, confidence scoring, and visual feedback

### Technical Achievements
- Created comprehensive geographic trends data model with PostgreSQL backend
- Implemented interactive SVG-based map with animated pulse effects and hover states
- Built responsive map interface with regional trend summaries and national overview cards
- Added API endpoints for geographic trend data with mock data support for development
- Resolved authentication middleware conflicts for public AI endpoints
- Enhanced recommendation algorithm with dynamic filtering capabilities
- Created responsive design following Flight Club's minimalist aesthetic

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL for serverless database hosting
- **Authentication**: Firebase for user management and authentication
- **AI Services**: OpenAI API integration ready for natural language processing and recommendations
- **External APIs**: Framework for integration with sneaker market data providers (StockX, GOAT)

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