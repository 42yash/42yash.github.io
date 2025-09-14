# Portfolio Website Architecture

## Overview

An interactive portfolio website built with Svelte 5, featuring a welcome hero page, diagonal navigation hub, and specialized content pages. The architecture follows Svelte 5 best practices with runes for reactive state management, modular components, and synchronized animations.

## Module Structure

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
        ├── HeroPage.svelte      # Welcome & tech stack showcase
        ├── MainPage.svelte      # Diagonal navigation hub
        ├── ProjectsPage.svelte  # Portfolio projects display
        ├── ResumePage.svelte    # Professional experience
        ├── AIChatPage.svelte    # AI assistant interface
        └── ComingSoonPage.svelte # Future features placeholder
```

## Key Features

### 1. Modular Architecture
- **Separation of Concerns**: Each module has a single responsibility
- **Type Safety**: Full TypeScript support with interfaces
- **Reusability**: Components and utilities can be easily reused

### 2. Svelte 5 Runes
- **State Management**: Uses `$state` and `$derived` runes
- **Module-Level State**: State declared at module level in `.svelte.ts` files
- **Class API Wrapper**: `PageState` class provides clean API over module state
- **Universal Reactivity**: Works across `.svelte` and `.svelte.ts` files

### 3. Animation System
- **Hero Dismissal**: Hero slides up on Enter press (one-time only)
- **Synchronized Movement**: Main and other pages move as one unit
- **Directional Slides**: Pages slide from their logical direction
- **Performance**: CSS-based transforms with `will-change` optimization

### 4. Page Structure
- **Hero**: Purple gradient welcome page with tech stack
- **Main**: Dark background with diagonal colored sections
- **Projects** (Left): Coral themed portfolio dashboard
- **Resume** (Right): Mint themed professional experience
- **AI Chat** (Down): Lavender themed chat interface
- **Coming Soon** (Up): Sky blue themed placeholder

## Animation Behavior

### Transition Rules
1. **Hero → Main**: Hero slides up on Enter press (one-time dismissal)
2. **Main → Other**: Both pages move together (synchronized)
3. **Other → Main**: Both pages slide back together
4. **Other → Other**: Direct synchronized transition
5. **Hero Access**: No return to hero after dismissal (reload only)

### Z-Index Hierarchy
- Main: 50 (base layer)
- Hero: 100 (above main)
- Other Pages: 200 (topmost during transitions)

## Usage

### Navigation Methods
1. **Hero Page**: Press Enter to dismiss (one-time)
2. **Main Page**: Click diagonal sections or use arrow keys
3. **Keyboard** (after hero dismissal):
   - Arrow keys for directional pages
   - ESC to return to Main
   - No hero access after dismissal

### State Access
```typescript
import { pageState } from '$lib/state/page-state.svelte';

// Navigate to a page
pageState.navigateTo('left');

// Dismiss hero page
pageState.dismissHero();

// Check if hero was dismissed
const dismissed = pageState.heroWasDismissed;

// Access current page (reactive)
const current = pageState.currentPage;

// Check transition state
const isTransitioning = pageState.isTransitioning;

// Go back in history
pageState.goBack();

// Reset to initial state
pageState.reset();
```

### Adding New Pages
1. Add page name to `PageName` type
2. Add configuration to `pageConfigs`
3. Add label to `pageLabels`
4. Page automatically appears in navigation

## Performance Optimizations

1. **CSS Transforms**: All animations use GPU-accelerated transforms
2. **Will-Change**: Hints browser about upcoming changes
3. **Lazy Evaluation**: `$derived` values computed only when needed
4. **Fast Transitions**: 150ms duration for snappy feel

## Development

### Prerequisites
- Node.js 18+ or Bun
- Svelte 5
- TypeScript
- SvelteKit

### File Structure Best Practices
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Follow Svelte 5 rune patterns (module-level state in `.svelte.ts`)
- Maintain clear module boundaries
- Use `$props()` for component props
- Leverage `$derived` for computed values

## Future Enhancements

Potential improvements:
- Blog integration
- Portfolio gallery with filtering
- Contact form functionality
- Social media links
- Analytics integration
- Dark/light theme toggle
- Gesture support for mobile
- Route-based navigation