# Claude-Quest 🎯

**Transform Claude into your personal coding mentor and learning guide**

Claude-Quest is a specialized configuration system that transforms Claude from a code-writing assistant into an educational guide focused on teaching concepts, researching documentation, and helping you build applications through understanding rather than copy-paste.

## 🌟 Philosophy

Instead of writing code _for_ you, Claude-Quest teaches you _how_ to write code by:

- **Documentation-First**: Always researching current, official documentation before providing guidance
- **Concept-Driven**: Explaining the "why" behind technical decisions, not just the "how"
- **Learning-Focused**: Breaking complex features into achievable learning milestones
- **Game-Like Experience**: Making development feel like a rewarding learning adventure

## 🚀 Quick Start

1. **Copy this entire directory** to your project root or use as a template
2. **Run the initialization**:
   ```bash
   node scripts/init-documentation.js
   ```
3. **Start Claude Code** in this directory - it will automatically detect the configuration
4. **Ask any development question** and watch Claude transform into your personal coding mentor!

## 🎮 How It Works

### The Teaching Experience

Instead of this:

```
You: "How do I add authentication to my app?"
Claude: [writes 200 lines of auth code]
```

You get this:

```
You: "How do I add authentication to my app?"
Claude:
🔍 Let me research the current best practices for authentication...
📚 I found the latest documentation for [your framework]...

Authentication serves three core purposes in web applications:
1. Identity verification (who are you?)
2. Authorization (what can you do?)
3. Session management (staying logged in)

For your [detected framework] project, here's how these concepts integrate:

[Detailed conceptual explanation with integration guidance]

Ready to implement the first piece? Let's start with understanding JWT tokens...
```

### Smart Subagents

Claude-Quest automatically routes your questions to specialized subagents:

- **🔬 doc-researcher**: Finds and analyzes current documentation
- **🧑‍🏫 concept-teacher**: Explains concepts and integration strategies
- **📊 version-guide**: Ensures you're using the best, compatible versions
- **🏃‍♂️ learning-coach**: Provides structured learning paths and encouragement

## 📂 Directory Structure

```
claude-quest/
├── CLAUDE.md                 # Core teaching instructions for Claude
├── claude-quest.config.js    # Configuration system
├── scripts/
│   └── init-documentation.js # Repository scanning and setup
├── .claude/
│   ├── settings.json         # Claude Code integration settings
│   └── agents/               # Specialized subagents
│       ├── doc-researcher.md
│       ├── concept-teacher.md
│       ├── version-guide.md
│       └── learning-coach.md
├── dep-docs/                 # Cached documentation summaries
│   ├── frameworks/
│   ├── libraries/
│   ├── tools/
│   └── examples/
├── learning-paths/           # Structured learning sequences
│   ├── beginner/
│   ├── intermediate/
│   └── advanced/
└── concept-library/          # Reusable concept explanations
    ├── patterns/
    ├── architectures/
    └── best-practices/
```

## 🛠 Usage Examples

### Learning a New Framework

```
You: "I want to learn React for my project"
Claude:
🔍 Researching React documentation and best practices...

React is built around three core concepts that revolutionized frontend development:

1. **Component-Based Architecture**: Think of your UI as a tree of reusable components
2. **Declarative Rendering**: Describe what the UI should look like, not how to change it
3. **Unidirectional Data Flow**: Data flows down, events flow up

Let's see how these apply to your project structure...

[Continues with interactive learning experience]
```

### Adding a Feature

```
You: "How do I add real-time notifications?"
Claude:
🔍 Researching WebSocket implementations for your stack...

Real-time notifications involve three key architectural pieces:
1. **Client-Server Connection**: Persistent communication channel
2. **Event Broadcasting**: Distributing messages to relevant users
3. **State Synchronization**: Keeping UI in sync with server events

Based on your current setup with [detected stack], here's how these concepts integrate...

[Guides through understanding each piece and how to implement]
```

## 🎯 Key Features

### 🔍 Always Research First

- Web searches for current documentation before every response
- Verifies information across multiple authoritative sources
- Prioritizes official documentation and current best practices

### 📚 Documentation Caching

- Automatically scans your project dependencies
- Creates cached documentation summaries for faster responses
- Maintains version-aware information for compatibility

### 🎓 Progressive Learning

- Breaks complex topics into manageable learning steps
- Builds understanding from fundamental concepts up
- Provides clear learning checkpoints and milestones

### 🧭 Personalized Guidance

- Adapts to your specific project structure and technologies
- Provides context-aware examples and integration strategies
- Suggests learning paths tailored to your goals

## 🔧 Configuration

### Environment Variables

The system recognizes these environment variables:

- `CLAUDE_QUEST_MODE=true` - Enables teaching-focused mode
- `CLAUDE_QUEST_TEACH_ONLY=true` - Disables direct code writing
- `CLAUDE_QUEST_RESEARCH_FIRST=true` - Forces documentation research

### Custom Commands (Future)

- `init-documentation` - Scan and populate documentation cache
- `teach-concept <concept>` - Interactive concept explanation
- `version-check` - Verify dependency versions
- `learning-path <technology>` - Generate learning sequence

## 🎮 Learning Game Mechanics

### Progress Tracking

- **Concept Mastery**: Understanding of individual concepts
- **Integration Skills**: Ability to combine concepts effectively
- **Problem-Solving**: Independent debugging and feature development
- **Code Quality**: Writing maintainable, readable code

### Milestones & Achievements

- **First Component**: Successfully create your first component
- **Data Flow Master**: Understand and implement data flow patterns
- **API Integration**: Connect frontend with backend services
- **Deployment Ready**: Prepare application for production

## 🤝 How This Changes Your Workflow

### Traditional Approach:

1. Ask Claude to write feature
2. Copy-paste code
3. Debug when it doesn't work
4. Repeat without understanding

### Claude-Quest Approach:

1. Ask about feature implementation
2. Learn underlying concepts and patterns
3. Understand how it integrates with your project
4. Write the code yourself with guidance
5. Build transferable knowledge for future features

## 🌍 Project Agnostic

Claude-Quest works with any project:

- **Frontend**: React, Vue, Angular, Svelte, vanilla JS
- **Backend**: Node.js, Python, Rust, Go, Java
- **Mobile**: React Native, Flutter
- **Desktop**: Electron, Tauri
- **Any combination of the above**

The system automatically detects your stack and provides relevant guidance.

## 📖 Philosophy in Action

### Traditional AI Assistant

- "Here's the code you need"
- Focus on immediate solutions
- Generic, copy-paste responses
- Limited learning transfer

### Claude-Quest Teaching Guide

- "Here's why this approach works and how it fits your project"
- Focus on understanding and learning
- Contextual, project-specific guidance
- Knowledge that transfers to new situations

## 🚀 Get Started

1. Copy this directory to your project
2. Run `node scripts/init-documentation.js`
3. Start Claude Code
4. Ask your first question and experience the transformation!

---

**Ready to level up your development learning?** Claude-Quest transforms every coding session into a learning adventure where you build both applications and expertise simultaneously.

_Made with ❤️ for developers who want to understand what they're building_
