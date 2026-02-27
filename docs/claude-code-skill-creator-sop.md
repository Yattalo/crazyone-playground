# SOP: Claude Code Skill Creator

## Cosa fa
Estensione Raycast per creare, navigare e gestire le skill (custom slash commands) di Claude Code.
Fornisce 10 template curati per gli ecosistemi CrazyOne, SBedil e uso generale.

## Precondizioni
- Raycast installato
- Node.js 20+
- Claude Code installato (per usare le skill create)

## Comandi

### 1. Create Skill
**Cosa fa**: Form interattivo per creare una nuova skill Claude Code.

**Input**:
- Nome (obbligatorio) → viene convertito in kebab-case
- Descrizione (obbligatorio) → usata da Claude per auto-invocazione
- Scope: project o user
- Argument hint, allowed tools, model, context, agent (opzionali)
- Body: istruzioni markdown per Claude

**Output**: File `SKILL.md` creato nella directory corretta.

**Esempio d'uso**:
1. Apri Raycast → "Create Skill"
2. Nome: `fix-issue`
3. Descrizione: `Fix a GitHub issue by number`
4. Scope: Project
5. Argument hint: `[issue-number]`
6. Body: `Fix GitHub issue #$ARGUMENTS following our coding standards...`
7. Submit → crea `.claude/skills/fix-issue/SKILL.md`

### 2. List Skills
**Cosa fa**: Mostra tutte le skill esistenti (progetto + utente).

**Input**: Nessuno (scansiona le directory automaticamente).

**Output**: Lista navigabile con azioni:
- Apri in editor
- Copia slash command
- Copia path
- Elimina

**Esempio d'uso**:
1. Apri Raycast → "List Skills"
2. Vedi tutte le skill raggruppate per scope
3. Seleziona una skill → Enter → si apre in editor

### 3. Skill Templates
**Cosa fa**: Catalogo di template curati pronti all'uso.

**Input**: Selezione template + scope.

**Output**: Skill creata dalla template nella directory scelta.

**Template disponibili**:

| ID | Ecosistema | Slash Command |
|----|-----------|---------------|
| code-review | General | `/review` |
| explain-code | General | `/explain` |
| commit-message | General | `/smart-commit` |
| test-writer | General | `/write-tests` |
| action-extractor | CrazyOne | `/action-points` |
| meeting-summarizer | CrazyOne | `/meeting-summary` |
| weekly-report | CrazyOne | `/weekly-report` |
| preventivo-builder | SBedil | `/preventivo` |
| checklist-cantiere | SBedil | `/checklist-cantiere` |
| scadenze-tracker | SBedil | `/scadenze` |

**Esempio d'uso**:
1. Apri Raycast → "Skill Templates"
2. Seleziona scope dal dropdown (Project/User)
3. Cerca "preventivo" → seleziona → Enter
4. Skill creata in `.claude/skills/preventivo/SKILL.md`

## Troubleshooting

| Problema | Soluzione |
|----------|----------|
| "No skills found" | Verifica che `.claude/skills/` esista nel progetto o in `~/.claude/skills/` |
| Skill non visibile in Claude Code | Riavvia Claude Code dopo aver creato la skill |
| Errore di permessi | Verifica permessi di scrittura sulla directory `.claude/` |
| Template non crea il file | Controlla che la directory target sia scrivibile |
