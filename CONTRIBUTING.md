# Contributing to Exhibit A

Thank you for your interest in contributing to Exhibit A! This document provides guidelines and best practices for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Git
- A code editor (VS Code recommended)
- Basic knowledge of Svelte and TypeScript

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/exhibit-a.git
   cd exhibit-a
   ```
3. Install dependencies:
   ```bash
   bun install  # or npm install
   ```
4. Start the development server:
   ```bash
   bun run dev  # or npm run dev
   ```

## 📁 Project Structure

```
exhibit-a/
├── src/lib/           # Core library code
│   ├── components/    # Svelte components
│   ├── config/        # Configuration files
│   ├── state/         # State management
│   ├── transitions/   # Animation utilities
│   └── types/         # TypeScript types
├── src/routes/        # SvelteKit routes
├── dep-docs/          # Documentation cache
└── static/            # Static assets
```

## 🎨 Development Guidelines

### Code Style

#### TypeScript
- Use TypeScript for all new code
- Define interfaces for component props
- Use `type` for unions and intersections
- Use `interface` for object shapes
- Enable strict mode in TypeScript config

#### Svelte 5 Patterns
- Use the new runes system (`$state`, `$derived`)
- Declare state at module level in `.svelte.ts` files
- Use `$props()` for component props
- Avoid `$effect` in `.svelte.ts` files

#### Component Guidelines
```svelte
<script lang="ts">
  // Define prop interface
  interface Props {
    title: string;
    count?: number;
  }

  // Use $props() rune
  let { title, count = 0 }: Props = $props();

  // Use $state for local state
  let isOpen = $state(false);

  // Use $derived for computed values
  let doubled = $derived(count * 2);
</script>
```

#### State Management
```typescript
// In .svelte.ts files, use module-level state
let currentPage = $state<PageName>('hero');
let isTransitioning = $state(false);

// Export class API for clean interface
export class PageState {
  get currentPage() {
    return currentPage;
  }

  navigateTo(page: PageName) {
    currentPage = page;
  }
}
```

### Naming Conventions

- **Files**: kebab-case (`page-manager.svelte`)
- **Components**: PascalCase (`PageManager.svelte`)
- **Functions**: camelCase (`navigateTo()`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_DURATION`)
- **Types/Interfaces**: PascalCase (`PageConfig`)

### Animation Guidelines

- Prefer CSS transforms over JavaScript animations
- Use `will-change` for performance hints
- Keep transitions under 300ms for responsiveness
- Test animations on lower-end devices

## 🧪 Testing

Before submitting a PR:

1. **Type Check**:
   ```bash
   bun run check
   ```

2. **Lint**:
   ```bash
   bun run lint
   ```

3. **Format**:
   ```bash
   bun run format
   ```

4. **Build**:
   ```bash
   bun run build
   ```

5. **Manual Testing**:
   - Test all navigation methods (mouse, keyboard)
   - Verify animations work smoothly
   - Check responsive behavior
   - Test in multiple browsers

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or fixes
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
feat(animations): add swipe gesture support
fix(state): resolve race condition in page transitions
docs(readme): update installation instructions
style(components): format with prettier
refactor(state): migrate to Svelte 5 runes
```

## 🔄 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Write/update tests** if applicable

4. **Update documentation** if you've changed APIs

5. **Commit your changes** with clear messages

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** with:
   - Clear title and description
   - Link to any related issues
   - Screenshots/GIFs for UI changes
   - List of testing performed

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Changes are responsive
- [ ] Animations are smooth (60fps)
- [ ] TypeScript types are properly defined

## 🐛 Reporting Issues

### Bug Reports

Include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information
- Error messages from console

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternative solutions considered
- Mockups or examples if applicable

## 📚 Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Project Architecture](./ARCHITECTURE.md)

## 💡 Tips for Contributors

### First-Time Contributors
- Look for issues labeled `good first issue`
- Start with documentation improvements
- Ask questions in issue comments
- Join discussions in existing PRs

### Adding New Features
1. Discuss in an issue first
2. Keep changes focused and atomic
3. Add tests for new functionality
4. Update relevant documentation
5. Consider backwards compatibility

### Performance Considerations
- Profile before optimizing
- Use Chrome DevTools Performance tab
- Minimize re-renders
- Optimize bundle size
- Lazy load when appropriate

## 🎯 Areas for Contribution

Current areas where help is appreciated:

- **Animations**: New transition effects
- **Accessibility**: Keyboard navigation, screen reader support
- **Performance**: Optimization and profiling
- **Documentation**: Tutorials, examples, translations
- **Testing**: Unit tests, E2E tests
- **Features**: Gesture support, theme system

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## 🙏 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- Special contributors file

Thank you for contributing to Exhibit A! 🎉