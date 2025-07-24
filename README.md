# SoleGrithm - AI-Powered Sneaker Platform

SoleGrithm is a comprehensive sneaker community platform that combines e-commerce, social networking, and AI-powered features. The application serves as a hub for sneaker enthusiasts to discover, collect, review, and trade sneakers while leveraging artificial intelligence for personalized recommendations and market insights.

## Features

- 🤖 **AI-Powered Chat Assistant** - SoleBot provides sneaker expertise and recommendations
- 👟 **Comprehensive Sneaker Catalog** - Browse and discover sneakers with detailed information
- 📝 **Blog System** - Latest sneaker news, reviews, and cultural insights
- 🔐 **Firebase Authentication** - Secure user management with Google OAuth
- 📱 **Responsive Design** - Mobile-first approach with seamless desktop experience
- 🎨 **Modern UI** - Built with Radix UI and Tailwind CSS for a sleek interface

## Tech Stack

### Frontend
- **React** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **Radix UI + shadcn/ui** for accessible UI components
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Node.js + Express** for REST API
- **PostgreSQL** with Drizzle ORM
- **Firebase Authentication** for user management
- **OpenAI API** for AI features

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Firebase project
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solegrithm.git
cd solegrithm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `OPENAI_API_KEY` - OpenAI API key

5. Push database schema:
```bash
npm run db:push
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run check` - Type check the code

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data access layer
│   └── services/           # External service integrations
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── components.json         # UI component configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies
- Powered by OpenAI for AI features
- Firebase for authentication
- Unsplash for high-quality imagery