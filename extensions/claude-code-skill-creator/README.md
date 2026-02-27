# Claude Code Skill Creator

> **Ecosystem**: CrazyOne + SBedil + General

Create, browse and manage Claude Code skills (custom slash commands) directly from Raycast — with curated templates for CrazyOne, SBedil and general development workflows.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development:

```bash
npm run dev
```

No environment variables required — this extension works entirely with the local filesystem.

## Commands

### Create Skill

Interactive form to create a new Claude Code skill with full frontmatter support:
- Name, description, argument hints
- Scope: project (`.claude/skills/`) or user (`~/.claude/skills/`)
- Model, context (fork), agent type
- Tool restrictions, invocation control

**Usage**: Open Raycast → "Create Skill"

### List Skills

Browse all existing skills from both project and user directories:
- Open SKILL.md in editor
- Copy slash command or file path
- Delete skills
- See metadata at a glance (scope, model, arguments, supporting files)

**Usage**: Open Raycast → "List Skills"

### Skill Templates

10 curated templates ready to use:

| Template | Ecosystem | Command |
|----------|-----------|---------|
| Code Review | General | `/review` |
| Explain Code | General | `/explain` |
| Smart Commit | General | `/smart-commit` |
| Test Writer | General | `/write-tests` |
| Estrai Action Points | CrazyOne | `/action-points` |
| Sintetizza Meeting | CrazyOne | `/meeting-summary` |
| Report Settimanale | CrazyOne | `/weekly-report` |
| Bozza Preventivo | SBedil | `/preventivo` |
| Checklist Cantiere | SBedil | `/checklist-cantiere` |
| Riepilogo Scadenze | SBedil | `/scadenze` |

**Usage**: Open Raycast → "Skill Templates" → select → create

## How Claude Code Skills Work

Skills are stored as `SKILL.md` files with YAML frontmatter:

```
.claude/skills/my-skill/
├── SKILL.md          # Required: instructions + frontmatter
├── reference.md      # Optional: detailed docs
└── examples.md       # Optional: usage examples
```

```yaml
---
name: my-skill
description: What this skill does
argument-hint: "[file-path]"
---

Instructions for Claude when this skill is invoked.
Use $ARGUMENTS for user input.
```

Invoke with `/my-skill` in Claude Code, or let Claude auto-invoke based on the description.

## Troubleshooting

- **No skills found**: Ensure `.claude/skills/` exists in your project or `~/.claude/skills/` for user-level skills.
- **Build errors**: Run `npm run lint` to check for issues.
- **Raycast not detecting**: Run `npm run dev` to register the extension.

## Development

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Check for lint errors
npm run fix-lint  # Auto-fix lint errors
```
