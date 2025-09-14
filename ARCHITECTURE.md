# Page Animation System Architecture

## Overview

A sophisticated, modular page animation system built with Svelte 5, featuring directional slides, matte colors, and special hero-to-main reveal animations. The architecture follows Svelte 5 best practices with runes for reactive state management and a clean separation of concerns.

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
    ├── PageTemplate.svelte      # Individual page template
    └── PageManager.svelte       # Main orchestration component
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
- **Directional Slides**: Each page slides from its logical direction
- **Hero Reveal**: Hero slides up to reveal Main underneath
- **Layered Approach**: Main acts as persistent background
- **Performance**: CSS-based transforms with `will-change` optimization

### 4. Matte Color Palette
- Hero: `#6B7280` (Matte gray)
- Main: `#E5E7EB` (Light matte gray)
- Left: `#FCA5A5` (Matte coral)
- Right: `#A7F3D0` (Matte mint)
- Up: `#BFDBFE` (Matte sky)
- Down: `#DDD6FE` (Matte lavender)

## Animation Behavior

### Transition Rules
1. **Hero → Main**: Hero slides up, Main is revealed underneath
2. **Main → Other**: Other page slides over Main from its direction
3. **Other → Main**: Other page slides away, Main is revealed
4. **Other → Other**: Direct slide transition

### Z-Index Hierarchy
- Main: 50 (base layer)
- Hero: 100 (above main)
- Other Pages: 200 (topmost during transitions)

## Usage

### Navigation Methods
1. **Button Click**: Click navigation buttons
2. **Keyboard**:
   - Arrow keys for directional pages
   - ESC for Main
   - H for Hero
   - M for Main

### State Access
```typescript
import { pageState } from '$lib/state/page-state.svelte';

// Navigate to a page
pageState.navigateTo('left');

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
- Gesture support for touch devices
- Page transition presets
- Dynamic color themes
- Transition timing curves library
- Page content slots
- Route-based navigation integration