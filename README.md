# @crazyone/playground

Interactive development environment for @crazyone UI themes.

## Apps

### Storybook
Component playground showcasing all themes with live examples.

```bash
# Run Storybook on port 6006
bun run storybook
```

### Showcase
Demo application featuring all themes in a realistic website layout.

```bash
# Run Showcase dev server
bun run showcase

# Build for production
bun run showcase:build
```

## Installation

```bash
# Install dependencies
bun install

# Build all apps
bun run build
```

## Requirements

Before running the playground, you must first publish the @crazyone/ui packages:

1. Go to the crazyone-ui directory:
   ```bash
   cd ../crazyone-ui
   ```

2. Build and publish packages:
   ```bash
   bun install
   bun run build
   bun run release
   ```

3. Return to playground and install:
   ```bash
   cd ../crazyone-playground
   bun install
   ```

## Available Themes

All 27 @crazyone/ui themes are available:
- arctic, bauhaus, bioluminescent, blackletter, brutalist
- bubblegum, campfire, cyberdeck, darkroom, gelato
- greenhouse, hologram, lyra, maia, mira, nightclub
- nova, obsidian, retrofuture, synthwave, terracotta
- thunderstorm, vaporwave, vega, wireframe

## Directory Structure

```
apps/
├── storybook/         # Component playground (port 6006)
│   ├── stories/       # Stories by theme
│   └── .storybook/    # Storybook config
└── showcase/          # Demo website
    └── src/           # App source
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run storybook` | Start Storybook on port 6006 |
| `bun run storybook:build` | Build static Storybook |
| `bun run showcase` | Start Showcase dev server |
| `bun run showcase:build` | Build Showcase for production |
