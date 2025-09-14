# Exhibit A - Interactive Portfolio Website

An interactive portfolio website built with Svelte 5, featuring sophisticated page animations, a tech stack showcase, and specialized sections for projects, resume, and AI chat.

## 🎨 Features

- **Welcome Hero Page**: Tech stack showcase with one-time dismissal
- **Diagonal Navigation Hub**: Main page with four triangular sections
- **Portfolio Sections**:
  - Projects Dashboard (Left)
  - Professional Resume (Right)
  - AI Chat Interface (Down)
  - Coming Soon (Up)
- **Synchronized Animations**: Pages move together as one unit
- **Keyboard Navigation**: Arrow keys and ESC for quick navigation
- **Modular Architecture**: Clean separation with TypeScript and Svelte 5

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd exhibit-a

# Install dependencies
bun install  # or npm install

# Start development server
bun run dev  # or npm run dev
```

Visit `http://localhost:5173` to see the animation system in action.

## 🎮 Navigation

### Mouse/Touch
Click the navigation buttons at the top-left of the screen

### Keyboard
- **Hero Page**: Press `Enter` to dismiss (one-time only)
- **Navigation** (after hero dismissal):
  - `←` Projects page
  - `→` Resume page
  - `↑` Coming Soon page
  - `↓` AI Chat page
  - `ESC` Return to Main/Home

## 🏗️ Architecture

### Module Structure

```
src/lib/
├── types/
│   └── page-types.ts           # TypeScript type definitions
├── config/
│   └── pages.ts                # Page configurations and colors
├── state/
│   └── page-state.svelte.ts    # Svelte 5 rune-based state management
├── transitions/
│   └── page-transitions.ts     # Reusable transition functions
└── components/
    ├── PageManager.svelte       # Main orchestration component
    └── pages/                   # Individual page components
        ├── HeroPage.svelte      # Welcome & tech stack
        ├── MainPage.svelte      # Diagonal navigation hub
        ├── ProjectsPage.svelte  # Portfolio projects
        ├── ResumePage.svelte    # Professional experience
        ├── AIChatPage.svelte    # AI assistant interface
        └── ComingSoonPage.svelte # Placeholder for future
```

### Key Technologies

- **Svelte 5**: Latest version with runes for reactive state
- **TypeScript**: Full type safety across the application
- **Vite**: Fast build tool and dev server
- **SvelteKit**: Application framework

### State Management

Uses Svelte 5's new runes system:
- `$state`: Reactive state variables
- `$derived`: Computed values
- Module-level state in `.svelte.ts` files

### Animation System

- **CSS-based**: GPU-accelerated transforms for smooth performance
- **Layered approach**: Main page acts as persistent background
- **Custom transitions**: Specialized functions for different animation types

## 📄 Pages

| Page  | Purpose     | Color     | Access           |
|-------|-------------|-----------|------------------|
| Hero  | Welcome & Tech Stack | Purple Gradient | Initial load only |
| Main  | Navigation Hub | Dark with colored sections | ESC key |
| Projects | Portfolio Dashboard | Coral (`#FCA5A5`) | Left/← key |
| Resume | Professional Experience | Mint (`#A7F3D0`) | Right/→ key |
| AI Chat | Interactive Assistant | Lavender (`#DDD6FE`) | Down/↓ key |
| Coming Soon | Future Features | Sky Blue (`#BFDBFE`) | Up/↑ key |

## 📁 Project Structure

```
exhibit-a/
├── src/
│   ├── lib/                    # Shared library code
│   │   ├── components/         # Svelte components
│   │   ├── config/             # Configuration files
│   │   ├── state/              # State management
│   │   ├── transitions/        # Animation utilities
│   │   └── types/              # TypeScript types
│   ├── routes/                 # SvelteKit routes
│   │   └── +page.svelte        # Main page
│   └── app.css                 # Global styles
├── static/                     # Static assets
├── dep-docs/                   # Documentation cache
│   └── svelte5-patterns.md     # Svelte 5 best practices
├── ARCHITECTURE.md             # Detailed architecture docs
├── CLAUDE.md                   # Claude-Quest configuration
└── README.md                   # This file
```

## 🛠️ Development

### Scripts

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run check

# Linting
bun run lint

# Formatting
bun run format
```

### Adding New Pages

1. Add page name to `PageName` type in `src/lib/types/page-types.ts`
2. Add configuration to `pageConfigs` in `src/lib/config/pages.ts`
3. Add label to `pageLabels` in the same file
4. Page automatically appears in navigation

### Customizing Animations

Edit transition functions in `src/lib/transitions/page-transitions.ts`:
- `slideIn/slideOut`: Basic slide animations
- `coverIn/uncoverOut`: Overlay animations
- `fadeTransition`: Opacity animations
- `scaleTransition`: Scale with fade

### Modifying Colors

Update the color palette in `src/lib/config/pages.ts`. Each page configuration includes:
- `color`: Background color
- `textColor`: Text color
- `slideDirection`: Animation direction
- `zIndex`: Layer order

## 🚀 Deployment

### Build

```bash
bun run build
```

The build output will be in the `.svelte-kit` directory.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture documentation
- [CLAUDE.md](./CLAUDE.md) - Claude-Quest teaching configuration
- [Svelte 5 Docs](https://svelte.dev/docs) - Official Svelte documentation
- [SvelteKit Docs](https://svelte.dev/docs/kit) - SvelteKit framework docs

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Svelte 5](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev)
- Inspired by modern animation patterns and material design principles
- Created with Claude-Quest teaching methodology

---

**Exhibit A** - A showcase of modern web animation techniques with Svelte 5