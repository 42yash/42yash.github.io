# Concept Library

Reusable explanations of fundamental programming and software development concepts.

## Library Organization

### `/patterns`

Common design patterns and their implementations:

- Creational patterns (Factory, Singleton, Builder)
- Structural patterns (Adapter, Decorator, Facade)
- Behavioral patterns (Observer, Strategy, Command)
- Frontend patterns (Component, Container, Higher-Order Components)

### `/architectures`

System architecture concepts and approaches:

- Monolithic vs. Microservices
- Client-Server architecture
- MVC, MVP, MVVM patterns
- Event-driven architecture
- Layered architecture

### `/best-practices`

Development best practices and principles:

- SOLID principles
- DRY, KISS, YAGNI
- Code organization and structure
- Testing strategies
- Security considerations
- Performance optimization

## Concept Format

Each concept file follows this structure:

```markdown
# Concept Name

## What is it?

Clear, simple definition

## Why does it exist?

Problem it solves

## How does it work?

Mechanism and process

## When to use it?

Appropriate use cases

## Examples

Code examples in multiple contexts

## Common Mistakes

What to avoid

## Related Concepts

Connections to other concepts

## Learning Path

How to build on this concept
```

## Usage

Concepts are referenced by:

- The `concept-teacher` subagent for explanations
- Learning paths for progressive concept building
- Documentation for providing context
- Users directly via the `teach-concept` command

## Maintenance

Concepts are:

- Version-agnostic when possible
- Updated to reflect current best practices
- Cross-referenced for interconnected learning
- Reviewed for clarity and accuracy
