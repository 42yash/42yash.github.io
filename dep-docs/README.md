# Documentation Cache

This directory contains cached documentation summaries and research findings to reduce context usage and improve response quality.

## Directory Structure

### `/frameworks`

Documentation summaries for major frameworks like React, Vue, Angular, Express, etc.

### `/libraries`

Key information about commonly used libraries and their integration patterns.

### `/tools`

Build tools, testing frameworks, development utilities documentation.

### `/examples`

Code examples and implementation patterns for common use cases.

## File Naming Convention

- `{package-name}-v{major-version}.md` - Version-specific documentation
- `{package-name}-integration.md` - Integration guides and patterns
- `{package-name}-migration.md` - Upgrade and migration guides

## Content Guidelines

Each documentation file should include:

1. **Version Info**: Covered versions and compatibility
2. **Core Concepts**: Key concepts users need to understand
3. **Integration Points**: How it connects with other technologies
4. **Common Patterns**: Frequently used implementation patterns
5. **Gotchas**: Common pitfalls and how to avoid them
6. **Learning Resources**: Official docs, tutorials, examples

## Maintenance

- Documentation is automatically updated by the `init-documentation` command
- Files are regenerated when new major versions are detected
- Manual updates can be made but will be overwritten on refresh
