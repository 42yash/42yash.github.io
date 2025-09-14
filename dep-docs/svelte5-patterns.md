# Svelte 5 Patterns and Best Practices Guide

*Last Updated: September 14, 2025*
*Sources: Official Svelte Documentation, Community Best Practices*

## Table of Contents
1. [State Management with Runes](#state-management-with-runes)
2. [Store Patterns in Svelte 5](#store-patterns-in-svelte-5)
3. [Transitions and Animations](#transitions-and-animations)
4. [Component Composition Patterns](#component-composition-patterns)
5. [TypeScript Integration](#typescript-integration)
6. [Module Organization](#module-organization)

## State Management with Runes

### Core Runes Overview

Svelte 5 introduces **runes** - a signal-based reactivity system that provides universal reactivity across `.svelte` files and `.svelte.js/.svelte.ts` files.

#### `$state` - Reactive Variables
```javascript
// Basic usage
let count = $state(0);

// Deep reactivity for objects and arrays
let todos = $state([
  { done: false, text: 'Learn Svelte 5' }
]);

// Non-deeply reactive state
let items = $state.raw([1, 2, 3]);

// Class-based state management
class Counter {
  count = $state(0);

  increment() {
    this.count++;
  }
}
```

**Best Practices:**
- Use direct assignment for updates (`count++` instead of special methods)
- Objects and arrays become deeply reactive proxies automatically
- Use `$state.raw()` when you don't need deep reactivity for performance
- Export state instances from classes for reusable state management

#### `$derived` - Computed State
```javascript
// Simple derivation
let count = $state(0);
let doubled = $derived(count * 2);

// Complex derivation with $derived.by()
let numbers = $state([1, 2, 3, 4]);
let total = $derived.by(() => {
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum;
});
```

**Best Practices:**
- Use for pure computations based on other reactive values
- Avoid side effects inside `$derived` expressions
- Use `$derived.by()` for complex calculations
- Values are lazily evaluated and cached

#### `$effect` - Side Effects
```javascript
let count = $state(0);

// Basic effect
$effect(() => {
  document.title = `Count: ${count}`;
});

// Effect with cleanup
$effect(() => {
  const interval = setInterval(() => count++, 1000);

  return () => clearInterval(interval);
});

// Pre-effect cleanup
$effect.pre(() => {
  // Runs before DOM updates
  console.log('Before DOM update');
});
```

**Best Practices:**
- Use for side effects like DOM manipulation, API calls, logging
- Return cleanup functions when needed
- Use `$effect.pre()` for actions before DOM updates
- Runs after DOM has been updated (unlike Svelte 4's reactive statements)

### Migration from Svelte 4

| Svelte 4 | Svelte 5 |
|----------|----------|
| `let count = 0` | `let count = $state(0)` |
| `$: doubled = count * 2` | `let doubled = $derived(count * 2)` |
| `$: { console.log(count) }` | `$effect(() => console.log(count))` |

## Store Patterns in Svelte 5

### Current Status of Stores

**Key Insight:** While Svelte 5 introduces runes as the preferred approach, **stores remain fully supported** and are still the best choice for certain patterns, particularly in SvelteKit.

### When to Use Stores vs Runes

**Use Stores for:**
- Returning reactive state from SvelteKit load functions
- Cross-component state that needs to be serializable
- Integration with existing Svelte 4 components (mixed mode)
- Complex state that needs subscription/unsubscription patterns

**Use Runes for:**
- New component-level state
- Shared state in `.svelte.js/.svelte.ts` files
- State that benefits from deep reactivity
- Modern, type-safe state management

### Store Best Practices (2025)

```javascript
// Encapsulated store pattern
function createCounter() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0)
  };
}

export const counter = createCounter();
```

**SvelteKit Pattern:**
```javascript
// In load function - still the best approach for some cases
export async function load() {
  const data = writable(await fetchData());

  return {
    data // Returned writable store
  };
}
```

### Store Types and Usage

1. **Writable Stores** - For read/write state
2. **Readable Stores** - For read-only state (API data, time, etc.)
3. **Derived Stores** - For computed values from other stores

## Transitions and Animations

### Built-in Transition Functions

The `svelte/transition` module provides:

- `fade` - Opacity animation
- `blur` - Blur filter with opacity
- `fly` - Position and opacity
- `slide` - Height/width sliding
- `scale` - Scale and opacity
- `draw` - SVG path drawing
- `crossfade` - Paired transitions between elements

### Best Practices for Animations (2025)

#### 1. Performance-First Approach
```javascript
// Prefer CSS-based transitions over JavaScript
import { fly } from 'svelte/transition';

// Good - uses CSS transforms
<div transition:fly={{ x: 200, duration: 300 }}>
  Content
</div>
```

#### 2. Custom Transitions
```javascript
function customSlide(node, { duration = 400 }) {
  return {
    duration,
    css: t => `
      transform: translateX(${(1 - t) * 100}%);
      opacity: ${t};
    `
  };
}
```

#### 3. Page Transitions in SvelteKit
```svelte
<!-- +layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
</script>

{#key $page.url.pathname}
  <div transition:fly={{ x: -200, duration: 300, delay: 300 }}>
    <slot />
  </div>
{/key}
```

#### 4. View Transitions API Integration (2024+)
```javascript
// SvelteKit 1.24+ with onNavigate
import { onNavigate } from '$app/navigation';

onNavigate((navigation) => {
  if (!document.startViewTransition) return;

  return new Promise((resolve) => {
    document.startViewTransition(async () => {
      resolve();
      await navigation.complete;
    });
  });
});
```

### Animation Best Practices

- Use CSS instead of `tick` when possible for better performance
- Leverage `animate:` directive for layout animations
- Combine transitions with the `animate` directive for complete motion effects
- Use easing functions to add character to animations
- Consider `crossfade` for element transitions between states

## Component Composition Patterns

### Svelte 5 Props Pattern

```svelte
<script>
  // Required and optional props
  let { title, count = 0, onClick } = $props();

  // Bindable props for two-way data flow
  let { value = $bindable() } = $props();

  // Rest props
  let { ...restProps } = $props();
</script>

<button {...restProps} on:click={onClick}>
  {title}: {count}
</button>
<input bind:value />
```

### Snippets for Reusable Markup

```svelte
<!-- Define reusable markup -->
{#snippet card(title, content)}
  <div class="card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
{/snippet}

<!-- Use the snippet -->
{@render card('Hello', 'World')}
{@render card('Svelte', '5')}
```

### Component Communication Patterns

1. **Props down, events up**
2. **Context API for deep prop passing**
3. **Stores/runes for global state**
4. **Two-way binding with `$bindable()`**

### Universal State Files (.svelte.js/.svelte.ts)

```javascript
// shared-state.svelte.js
let globalCount = $state(0);

export function getCount() {
  return globalCount;
}

export function increment() {
  globalCount++;
}

// Use anywhere
import { getCount, increment } from './shared-state.svelte.js';
```

## TypeScript Integration

### TypeScript Configuration Best Practices

```json
// tsconfig.json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Component Type Patterns

```typescript
// Component with typed props
<script lang="ts">
  interface Props {
    title: string;
    count?: number;
    onClick?: () => void;
  }

  let { title, count = 0, onClick }: Props = $props();
</script>
```

### State Machine Pattern with Types

```typescript
// counter.svelte.ts
class Counter {
  private _count = $state(0);

  get count(): number {
    return this._count;
  }

  increment(): void {
    this._count++;
  }

  reset(): void {
    this._count = 0;
  }
}

export const counter = new Counter();
```

### Best Practices

- Use interfaces over types for component props
- Avoid enums, prefer const objects
- Enable strict mode for better type safety
- Use generic components when appropriate
- Leverage SvelteKit's auto-generated types

## Module Organization

### Recommended Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── feature/      # Feature-specific components
│   ├── stores/           # Global stores (if needed)
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript definitions
│   └── server/           # Server-only code
├── routes/
│   ├── (app)/            # Route groups
│   │   ├── dashboard/
│   │   └── profile/
│   ├── api/              # API routes
│   └── +layout.svelte
├── app.html
└── app.css
```

### File Organization Best Practices

#### 1. Component Naming
- Use lowercase with hyphens: `user-card.svelte`
- Group related components in folders
- Use index files for barrel exports

#### 2. State Management Organization
```
src/lib/
├── state/
│   ├── auth.svelte.ts      # Authentication state
│   ├── ui.svelte.ts        # UI state (modals, etc.)
│   └── data.svelte.ts      # Data layer state
```

#### 3. Utility Organization
```
src/lib/utils/
├── date.ts                 # Date utilities
├── validation.ts           # Form validation
├── api.ts                  # API helpers
└── cn.ts                   # Class name utility
```

### Code Organization Principles (2025)

1. **Colocation over abstraction** - Keep related code close to where it's used
2. **Functional and declarative patterns** preferred
3. **Modularization over duplication**
4. **Type safety throughout**
5. **Performance-conscious patterns**

### SvelteKit-Specific Patterns

```javascript
// Route-specific state management
// src/routes/dashboard/+layout.svelte
<script>
  import { page } from '$app/stores';

  // Route-specific state
  let sidebarOpen = $state(false);
</script>

// Global state accessible everywhere
// src/lib/state/global.svelte.ts
export const theme = $state('light');
export const user = $state(null);
```

## Key Takeaways for 2025

1. **Runes are the future** but stores still have their place
2. **Universal reactivity** enables consistent patterns across file types
3. **TypeScript integration** is native and strongly recommended
4. **Performance-first animations** using CSS over JavaScript
5. **Component composition** through props, snippets, and context
6. **Modular organization** with colocation principles
7. **Migration can be gradual** - Svelte 4 and 5 syntax can coexist

This guide represents the current best practices for Svelte 5 development as of 2025, focusing on the new runes system while acknowledging the continued relevance of established patterns where appropriate.

---

**Sources:**
- [Official Svelte 5 Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- Community best practices from 2024-2025