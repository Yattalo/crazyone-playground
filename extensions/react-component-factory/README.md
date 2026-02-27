# React Component Factory

> **Ecosystem**: CrazyOne (design system)

Build, browse, remix and quick-insert React components with full metadata, props, variants and Storybook story generation — all from Raycast.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development:
```bash
npm run dev
```

3. Configure the extension in Raycast preferences:
   - **Components Root**: absolute path to your components directory (e.g. `~/projects/my-app/src/components`)
   - **Default Author**: your name or team name

## How It Works

The extension manages components in a structured library:

```
<components-root>/
├── registry.json           # Master index (auto-managed)
├── ui/                     # Primitives (Button, Input, Badge...)
│   └── button/
│       ├── button.tsx      # Component source
│       ├── meta.json       # Rich metadata (props, variants, deps...)
│       ├── button.stories.tsx  # Auto-generated Storybook story
│       ├── cn.ts           # Tailwind merge utility
│       └── index.ts        # Barrel export
├── blocks/                 # Composed (Hero, PricingCard, Form...)
└── patterns/               # Layouts (Sidebar, Grid, Dashboard...)
```

### meta.json Schema

Every component gets a `meta.json` with:
- Name, slug, category, description, author, version
- **Props**: full TypeScript-style definitions (name, type, default, required, description)
- **Variants**: visual style options
- **Dependencies**: npm packages needed
- **CSS Variables**: custom properties used
- **Tags**: for search and filtering
- **Examples**: code snippets
- **Compatibility**: themes and frameworks supported

## Commands

### Create Component

Interactive form to scaffold a new React component:
- Define name, category (UI / Blocks / Patterns), description
- Add props dynamically (⌘N to add, ⌘⌫ to remove)
- Set variants, tags, dependencies, CSS variables
- Auto-generates: `.tsx`, `meta.json`, `index.ts`, `.stories.tsx`
- Auto-adds `className` and `children` props
- Updates `registry.json`

### Component Library

Browse all components with rich detail view:
- Grouped by category (UI, Blocks, Patterns)
- Detail view with full props table, variants, examples, dependencies
- Import and usage snippets
- Open in editor, copy, delete

### Remix Component

Clone and customize an existing component:
- Pick any component as base
- Rename, change category
- Add/remove variants and tags
- Add wrapper element with Tailwind classes
- Generates new component with source transformed

### Quick Insert

Fast clipboard operations for daily coding:
- **Paste Import** (Enter): paste import statement into active editor
- **Paste Usage** (⌘U): paste usage snippet
- **Copy Import + Usage** (⌘C): copy both to clipboard
- **Copy Full Source** (⌘⇧C): copy entire component source
- **Copy Props Markdown** (⌘P): copy props table as markdown

## Preferences

| Preference | Required | Description |
|------------|----------|-------------|
| Components Root | Yes | Absolute path to components directory |
| Default Author | No | Author name for new components (default: "crazyone") |

## Troubleshooting

- **"No components"**: Set the Components Root preference to a valid directory path.
- **Build errors**: Run `npm run lint`.
- **Registry out of sync**: Delete `registry.json` and re-create components — or manually edit it.

## Development

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Check for lint errors
npm run fix-lint  # Auto-fix lint errors
```
