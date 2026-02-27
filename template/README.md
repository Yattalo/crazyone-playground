# {{EXTENSION_NAME}}

> **Ecosystem**: {{ECOSYSTEM}}

{{EXTENSION_DESCRIPTION}}

## Setup

1. Clone or copy this extension into your Raycast extensions directory.
2. Copy `.env.example` to `.env` and fill in required values.
3. Install dependencies:

```bash
npm install
```

4. Start development:

```bash
npm run dev
```

## Commands

### {{COMMAND_NAME}}

{{COMMAND_DESCRIPTION}}

**Usage**: Open Raycast → search for "{{COMMAND_NAME}}"

## Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| _None yet_ | — | — |

## Troubleshooting

- **Build errors**: Run `npm run lint` to check for issues.
- **Missing env vars**: Ensure `.env` exists and all required vars are set.
- **Raycast not detecting**: Run `npm run dev` to register the extension in development mode.

## Development

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Check for lint errors
npm run fix-lint  # Auto-fix lint errors
```
