# MatLog Pro

**Advanced Brazilian Jiu-Jitsu Training Tracker**

A mobile-first Progressive Web App (PWA) for BJJ athletes to track training volume, technique acquisition, and sparring performance with real-time analytics.

## Features

### Dashboard (The "Headquarters")
- **Road to Rome Countdown**: Days remaining until February 2026
- **Weekly Volume Chart**: Hours trained overlaid with average intensity
- **Mat Rat Score**: Gamified metric calculated as (Total Hours × 10) + (Techniques × 5)
- **Sparring Record**: Win/loss/draw statistics

### Session & Sparring Log
- Track sessions with date, duration, type (Gi/No-Gi), and instructor
- Dynamic sparring rounds with conditional logic
- Record partner names, results (Submit/Tap/Draw), and techniques used
- Automatic field switching: "Finished With" for wins, "Caught With" for losses

### Technique Vault
- Knowledge graph of techniques with descriptions
- Tag-based filtering system (#GuardRetention, #LegLocks, #DeepHalf, etc.)
- Quick add/edit/delete functionality
- Technique statistics

### Settings & Data Management
- Export all data as JSON for backup
- Reset functionality for data management
- Data summary dashboard

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 4 (Dark Mode)
- **Charts**: Recharts (ComposedChart)
- **Icons**: Lucide-React
- **State Management**: React Context + LocalStorage
- **Data Persistence**: Browser LocalStorage with SSR-safe hydration

## Design Philosophy

**Minimalist Athletic Dashboard** - Emphasizes clarity through negative space, data-driven visual language, and functional typography. Uses semantic colors:
- **Emerald** (#10b981): Wins and positive metrics
- **Rose** (#f43f5e): Losses and warnings
- **Amber** (#f59e0b): Drilling and practice focus

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd matlog-pro

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

Output files are in `dist/public/` for static deployment.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and select your repository
4. Vercel will automatically detect Vite configuration
5. Click "Deploy"

The app will be live at `https://your-project-name.vercel.app`

### Other Platforms

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/public
```

**GitHub Pages:**
Update `vite.config.ts` with `base: '/matlog-pro/'` and push to `gh-pages` branch.

## Data Storage

All data is stored locally in the browser's LocalStorage. No server-side storage is required. Users can export their data as JSON for backup.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## PWA Features

- Installable on mobile devices
- Works offline (with cached assets)
- Responsive design optimized for all screen sizes

## Development

### Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── Atomic.tsx          # Reusable UI components
│   ├── contexts/
│   │   └── MatContext.tsx      # Global state management
│   ├── hooks/
│   │   └── useLocalStorage.ts  # SSR-safe persistence
│   ├── pages/
│   │   ├── DashboardView.tsx
│   │   ├── LoggerView.tsx
│   │   ├── VaultView.tsx
│   │   └── SettingsView.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/
│   └── index.html
└── package.json
```

### Key Hooks

- `useLocalStorage<T>`: Persistent state with SSR-safe hydration
- `useMat()`: Access global MatLog context

### Adding New Features

1. Define types in `client/src/types/index.ts`
2. Create components in `client/src/components/`
3. Add context methods in `client/src/contexts/MatContext.tsx`
4. Build UI in `client/src/pages/`

## Performance

- Gzip bundle: ~281 KB
- Optimized for mobile (bottom navigation, touch-friendly)
- Efficient re-renders with memoization
- LocalStorage for instant data access

## License

MIT

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for BJJ Athletes**
