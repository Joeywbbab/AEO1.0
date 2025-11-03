# AEO - Answer Engine Optimization Platform

> AI-powered brand visibility analytics platform for tracking mentions across AI chat platforms

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sophiapro-projects/v0-aidesignspecstarter)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/TwiBvBAv3JB)

## Overview

**AEO (Answer Engine Optimization)** is a comprehensive analytics platform designed to track and optimize your brand's visibility across AI chat platforms including GPT, Perplexity, and AI Overview. Monitor prompt performance, citation rates, competitive rankings, and get actionable insights for content optimization.

## Features

- **Dashboard**: Real-time visibility metrics, competitive rankings, and trend analysis
- **Prompt Analytics**: Track AI chat prompts mentioning your brand with sentiment analysis
- **Citation Tracking**: Monitor how AI engines cite your content as sources
- **Brand Audit**: Comprehensive AEO scoring and content gap analysis
- **Competitor Analysis**: Track competitive mentions and share of voice
- **Content Recommendations**: AI-driven content optimization suggestions

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **UI**: React 19.1.0 + TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Components**: Shadcn UI (Radix UI primitives)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AEO
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
AEO/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard page
│   ├── analytics/           # Analytics section
│   │   ├── prompts/        # Prompt tracking
│   │   └── citations/      # Citation tracking
│   └── action/             # Optimization section
│       ├── audit/          # Brand audit
│       └── competitors/    # Competitor management
├── components/              # React components
│   ├── ui/                 # Shadcn UI components (59 files)
│   ├── app-sidebar.tsx     # Navigation sidebar
│   ├── filter-bar.tsx      # Reusable filter component
│   ├── metric-card.tsx     # Reusable metric display
│   └── ...                 # Other custom components
├── hooks/                   # Custom React hooks
│   ├── use-filters.ts      # Filter state management
│   ├── use-mobile.ts       # Mobile detection
│   └── use-toast.ts        # Toast notifications
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   └── mock-data.ts        # Mock data (temporary)
├── types/                   # TypeScript type definitions
│   └── index.ts            # Centralized types
├── public/                  # Static assets
└── styles/                  # Global styles
```

## Development

### Key Components

- **FilterBar**: Reusable filter component for date range, model, and tag selection
- **MetricCard**: Standardized metric display with trend indicators
- **AppSidebar**: Main navigation with active state management
- **TopBar**: Page-level filter controls

### Custom Hooks

- **useFilters**: Manages filter state and apply logic
- **useMobile**: Responsive design helper
- **useToast**: Toast notification management

### Type System

All types are centralized in [`types/index.ts`](types/index.ts) for easy maintenance and reuse across the application.

## Current Status

**MVP/Prototype Stage** - Currently using mock data for demonstration. Backend integration and real API connections are planned for future development.

### Roadmap

- [ ] Backend API integration
- [ ] Real-time data fetching
- [ ] User authentication
- [ ] Database integration
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Email notifications
- [ ] Multi-brand support

## Configuration

### Next.js Config

The project uses optimized Next.js settings for production:
- React Strict Mode enabled
- Bundle optimization for lucide-react and recharts
- Image optimization enabled

### TypeScript

Strict mode enabled with path aliases:
- `@/*` - Root directory
- `@/types` - Type definitions
- `@/components` - Components
- `@/lib` - Utilities
- `@/hooks` - Custom hooks

## Deployment

This repository is automatically synced with [v0.app](https://v0.app) and deployed on Vercel.

### Vercel Deployment

Your project is live at: [https://vercel.com/sophiapro-projects/v0-aidesignspecstarter](https://vercel.com/sophiapro-projects/v0-aidesignspecstarter)

### Continue Building

Build and modify your app on: [https://v0.app/chat/projects/TwiBvBAv3JB](https://v0.app/chat/projects/TwiBvBAv3JB)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For questions or support, please contact the development team.

---

Built with ❤️ using [v0.app](https://v0.app) and Next.js
