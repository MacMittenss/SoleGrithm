# SoleGrithm - Sneaker Community Platform

## Overview
SoleGrithm is an AI-powered sneaker community platform integrating e-commerce, social networking, and intelligent discovery features. It serves as a central hub for sneaker enthusiasts to discover, collect, review, and trade sneakers, leveraging AI for personalized recommendations, trend analysis, and market insights. The platform’s key differentiator is its AI-driven discovery section, offering collaborative filtering, intelligent chat assistance, and image recognition capabilities, and has market potential to become a leading destination for sneaker culture and commerce.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (Phase 12 - Advanced Homepage Redesign - IN PROGRESS)
- **Anton Font Integration**: Added Anton font from Google Fonts with template-inspired styling classes (.font-c, .hero-text, .size-md) for impactful hero text and headings matching GSAP Webflow template aesthetics
- **Template Styling Application**: Applied black/white design patterns to "Snap, Search & Discover", AI Collections, and Style Quiz sections using template layout classes and structure
- **Component Rearrangement**: Reorganized section layouts with proper template spacing, container structure, and responsive design patterns
- **Card and Button Functionality**: Fixed card sizing issues, improved content visibility, and ensured all navigation buttons are functional across redesigned sections
- **Work Sans Font Migration**: Successfully replaced seasonSans with Work Sans SemiBold throughout the entire website with proper font fallbacks
- **Clean Design Aesthetic**: Removed colorful gradients in favor of professional black/white color scheme with subtle transparency effects
- **Previous Updates**: VITURE-style visual design, GSAP animations, section architecture improvements, and production-ready platform optimization

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

## Critical Animation Patterns

### GSAP ScrollTrigger Animation Rules (NEVER BREAK THESE)
**For smooth sequential homepage section animations, ALWAYS use:**
```javascript
let headerTl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%", // When section enters viewport
    toggleActions: "play none none reverse", // Time-based animations
  }
});
```

**SPECIAL PATTERN for Latest Stories & Sole Radar Sections (PRESERVE EXACTLY):**
```javascript
// Animation timeline - animate ONLY when section is pinned
let headerTl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top", // Animate only when section is pinned to top
    toggleActions: "play none none reverse", // Smooth play and reverse - prevents popping
  }
});

// Pinning - exact duration matching animation completion
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=120%" // (Latest Stories) or "+=180%" (Sole Radar) - exact animation duration
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
});
```

**CRITICAL: NEVER use `scrub: 1` for main section content animations** - this ties animation progress directly to scroll position causing elements to "pop" and snap to positions instead of smooth sequential timing.

**Only use `scrub: true` for:**
- Overlay/curtain effects that need to be synchronized with scroll speed
- Blur effects that should progress with scroll
- Effects that should be perfectly tied to scroll position

**Timeline Structure:**
- Use proper durations (0.3s, 0.4s) with minimal stagger timing (0.03s, 0.05s) for fast animations
- Elements should animate sequentially: badge → words → subtitle → features → buttons → grids
- Always use `ease: "expo.out"` for text reveals and `ease: "back.out(1.2)"` for scaling elements
- Pin duration must exactly match total animation time - no delays after completion

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