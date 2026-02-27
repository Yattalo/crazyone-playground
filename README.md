# @crazyone/playground

Interactive development environment for @crazyone UI themes + **Raycast Extension Factory** for CrazyOne & SBedil ecosystems.

## Apps (Design System)

### Storybook
Component playground showcasing all themes with live examples.

```bash
bun run storybook      # port 6006
```

### Showcase
Demo application featuring all themes in a realistic website layout.

```bash
bun run showcase       # dev server
bun run showcase:build # production build
```

## Raycast Extension Factory

Factory system for generating and maintaining Raycast extensions for two ecosystems:

- **CrazyOne** — Marketing & Strategia: workflow per clienti enterprise, action points, reporting, document automation.
- **SBedil** — Amministrazione & Operatività edilizia: preventivi, commesse, fatture, scadenze, checklist operative.

### Quick start: create a new extension

1. Copy the golden template:
   ```bash
   cp -r template/ extensions/<your-extension-slug>/
   ```
2. Replace placeholders (`{{EXTENSION_SLUG}}`, `{{COMMAND_NAME}}`, etc.) — see `docs/sop-nuova-estensione.md`
3. Implement commands in `src/`
4. Add `.env` from `.env.example`
5. `npm install && npm run dev`

See `CLAUDE.md` for full AI-assisted workflow and conventions.

## Installation

```bash
bun install   # Install dependencies
bun run build # Build all apps
```

### Requirements

Before running the playground apps, publish the @crazyone/ui packages first:

```bash
cd ../crazyone-ui && bun install && bun run build && bun run release
cd ../crazyone-playground && bun install
```

## Available Themes

All 27 @crazyone/ui themes:
arctic, bauhaus, bioluminescent, blackletter, brutalist, bubblegum, campfire, cyberdeck, darkroom, gelato, greenhouse, hologram, lyra, maia, mira, nightclub, nova, obsidian, retrofuture, synthwave, terracotta, thunderstorm, vaporwave, vega, wireframe

## Directory Structure

```
├── apps/
│   ├── storybook/         # Component playground (port 6006)
│   └── showcase/          # Demo website
├── template/              # Raycast extension golden template
├── extensions/            # Generated Raycast extensions
├── docs/                  # SOP, playbook, architecture notes
├── clients/               # Client metadata (non-sensitive)
└── CLAUDE.md              # AI workflow instructions
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run storybook` | Start Storybook on port 6006 |
| `bun run storybook:build` | Build static Storybook |
| `bun run showcase` | Start Showcase dev server |
| `bun run showcase:build` | Build Showcase for production |
