import type { SkillTemplate } from "./types";

export const SKILL_TEMPLATES: SkillTemplate[] = [
  // ── General ─────────────────────────────────────────
  {
    id: "code-review",
    title: "Code Review",
    description: "Review code changes with structured feedback",
    ecosystem: "General",
    frontmatter: {
      name: "review",
      description: "Review code changes and provide structured feedback on quality, bugs, and improvements",
      "argument-hint": "[file-or-diff]",
    },
    body: `Review the code in $ARGUMENTS with the following structure:

## 1. Summary
One-sentence overview of what this code does.

## 2. Issues Found
- **Critical**: Bugs, security issues, data loss risks
- **Warning**: Performance, maintainability, edge cases
- **Nit**: Style, naming, minor improvements

## 3. Positive Highlights
What's done well — reinforce good patterns.

## 4. Suggested Changes
Concrete code suggestions (not just descriptions).

Be direct. Prioritise actionable feedback over praise.`,
  },
  {
    id: "explain-code",
    title: "Explain Code",
    description: "Explain code with analogies and ASCII diagrams",
    ecosystem: "General",
    frontmatter: {
      name: "explain",
      description: "Explain how code works using analogies, diagrams, and step-by-step walkthroughs",
      "argument-hint": "[file-path]",
      "allowed-tools": "Read, Grep, Glob",
    },
    body: `Explain the code at $ARGUMENTS following this structure:

1. **Analogy**: Compare to something from everyday life
2. **Diagram**: ASCII art showing flow, structure, or relationships
3. **Walkthrough**: Step-by-step what happens when this code runs
4. **Gotcha**: Common mistake or misconception about this code

Keep the tone conversational. For complex code, use multiple analogies.`,
  },
  {
    id: "commit-message",
    title: "Smart Commit",
    description: "Generate a conventional commit message from staged changes",
    ecosystem: "General",
    frontmatter: {
      name: "smart-commit",
      description: "Generate a conventional commit message from the current staged changes and create the commit",
    },
    body: `Analyse the current staged changes and create a commit:

1. Run \`git diff --cached\` to see staged changes
2. Determine the type: feat, fix, refactor, docs, test, chore, perf, ci
3. Write a concise subject line (max 72 chars, imperative mood)
4. If the change is non-trivial, add a body explaining **why** not **what**
5. Create the commit

Format:
\`\`\`
<type>(<scope>): <subject>

<body>
\`\`\`

Do NOT include file lists in the body — git log shows that already.`,
  },
  {
    id: "test-writer",
    title: "Test Writer",
    description: "Generate tests for a given file or function",
    ecosystem: "General",
    frontmatter: {
      name: "write-tests",
      description: "Generate comprehensive tests for a file or function, covering happy path, edge cases, and error handling",
      "argument-hint": "[file-path]",
    },
    body: `Write tests for $ARGUMENTS:

1. Read the source file and understand the public API
2. Identify the testing framework already used in this project
3. Write tests covering:
   - **Happy path**: Normal expected behaviour
   - **Edge cases**: Empty input, boundaries, nulls
   - **Error handling**: Invalid input, failures
4. Follow existing test patterns and naming conventions in the project
5. Place the test file next to the source or in the existing test directory

Do NOT mock what you don't need to. Prefer integration-style tests where practical.`,
  },

  // ── CrazyOne ────────────────────────────────────────
  {
    id: "action-extractor",
    title: "Estrai Action Points",
    description: "Estrai task e follow-up da testo, email o note riunione",
    ecosystem: "CrazyOne",
    frontmatter: {
      name: "action-points",
      description: "Estrai action points strutturati da testo libero: task, owner, deadline, follow-up",
      "argument-hint": "[testo o file]",
    },
    body: `Analizza il seguente testo e estrai gli action points:

$ARGUMENTS

Output strutturato:

| # | Task | Owner | Deadline | Priorità | Follow-up |
|---|------|-------|----------|----------|-----------|

Regole:
- Se l'owner non è esplicito, scrivi "Da assegnare"
- Se la deadline non è esplicita, suggerisci una data ragionevole e segna "(stimata)"
- Priorità: Alta / Media / Bassa
- Follow-up: prossima azione concreta per verificare il completamento
- Ordina per priorità (Alta prima)`,
  },
  {
    id: "meeting-summarizer",
    title: "Sintetizza Meeting",
    description: "Genera note strutturate da trascrizione o appunti di riunione",
    ecosystem: "CrazyOne",
    frontmatter: {
      name: "meeting-summary",
      description: "Sintetizza una riunione in note strutturate con decisioni, action items e next steps",
      "argument-hint": "[trascrizione o note]",
    },
    body: `Sintetizza la seguente riunione:

$ARGUMENTS

Output:

## Partecipanti
[Lista se menzionati]

## Decisioni Prese
1. ...

## Action Items
| Task | Owner | Deadline |
|------|-------|----------|

## Punti Aperti
- ...

## Next Steps
- Prossima riunione: [data se menzionata]
- Follow-up immediati: ...

Regole:
- Sii conciso ma non omettere decisioni importanti
- Ogni action item deve avere un owner
- Segnala esplicitamente i punti rimasti senza decisione`,
  },
  {
    id: "weekly-report",
    title: "Report Settimanale",
    description: "Genera report settimanale strutturato per cliente enterprise",
    ecosystem: "CrazyOne",
    frontmatter: {
      name: "weekly-report",
      description: "Genera un report settimanale strutturato con KPI, milestone, rischi e next steps",
      "argument-hint": "[dati settimana o note]",
    },
    body: `Genera un report settimanale dai seguenti dati:

$ARGUMENTS

Formato:

# Report Settimanale — [Cliente] — Settimana [N]

## Highlight
- 🟢 [Cosa è andato bene]
- 🟡 [Attenzione]
- 🔴 [Bloccante / rischio]

## KPI
| Metrica | Target | Attuale | Trend |
|---------|--------|---------|-------|

## Milestone
| Milestone | Stato | Data prevista |
|-----------|-------|---------------|

## Rischi e Mitigazioni
| Rischio | Impatto | Probabilità | Mitigazione |
|---------|---------|-------------|-------------|

## Next Steps (prossima settimana)
1. ...

Regole:
- Sii diretto: evidenzia problemi, non nasconderli
- Ogni rischio deve avere una mitigazione proposta
- Max 1 pagina di contenuto`,
  },

  // ── SBedil ──────────────────────────────────────────
  {
    id: "preventivo-builder",
    title: "Bozza Preventivo",
    description: "Crea bozza preventivo strutturata da appunti grezzi",
    ecosystem: "SBedil",
    frontmatter: {
      name: "preventivo",
      description: "Crea una bozza di preventivo strutturata partendo da appunti grezzi, con voci, quantità e importi",
      "argument-hint": "[appunti o descrizione lavori]",
    },
    body: `Crea una bozza di preventivo dai seguenti appunti:

$ARGUMENTS

Formato:

# Preventivo — [Descrizione sintetica]

**Data**: [oggi]
**Validità**: 30 giorni

## Voci di preventivo

| # | Descrizione | U.M. | Q.tà | Prezzo unit. | Totale |
|---|-------------|------|------|-------------|--------|

## Riepilogo
- Subtotale: €
- IVA (22%): €
- **Totale**: €

## Note e condizioni
- Tempi di esecuzione stimati: ...
- Condizioni di pagamento: ...
- Esclusioni: ...

Regole:
- Se i prezzi non sono indicati, lascia "[da quotare]"
- Raggruppa le voci per categoria di lavoro
- Aggiungi voce "Imprevisti (5-10%)" se il lavoro è complesso
- Segnala eventuali voci che richiedono sopralluogo`,
  },
  {
    id: "checklist-cantiere",
    title: "Checklist Avvio Cantiere",
    description: "Genera checklist completa per avvio cantiere con documenti e verifiche",
    ecosystem: "SBedil",
    frontmatter: {
      name: "checklist-cantiere",
      description: "Genera checklist per avvio cantiere: documenti, verifiche, sicurezza, permessi",
      "argument-hint": "[tipo lavoro o commessa]",
    },
    body: `Genera la checklist di avvio cantiere per:

$ARGUMENTS

## Documenti Obbligatori
- [ ] DURC in corso di validità
- [ ] Visura camerale aggiornata
- [ ] Polizza assicurativa RC
- [ ] POS (Piano Operativo Sicurezza)
- [ ] Nomina RSPP / Responsabile sicurezza
- [ ] Documento Unico Valutazione Rischi (DUVRI) se necessario

## Permessi e Autorizzazioni
- [ ] Permesso di costruire / SCIA / CILA (secondo tipo intervento)
- [ ] Occupazione suolo pubblico (se necessario)
- [ ] Autorizzazione accesso cantiere

## Verifiche Preliminari
- [ ] Sopralluogo effettuato
- [ ] Rilievi e misure completati
- [ ] Sottoservizi verificati (acqua, gas, elettricità, fibra)
- [ ] Accesso mezzi verificato
- [ ] Area stoccaggio materiali individuata

## Contrattualistica
- [ ] Contratto firmato
- [ ] Cauzione / anticipo ricevuto
- [ ] Subappalti formalizzati (se presenti)
- [ ] Tempistiche concordate

## Comunicazioni
- [ ] Notifica preliminare ASL (se > 200 uomini/giorno)
- [ ] Comunicazione inizio lavori al committente
- [ ] Comunicazione ai condomini / vicini (se necessario)

Aggiungi voci specifiche per il tipo di lavoro indicato.`,
  },
  {
    id: "scadenze-tracker",
    title: "Riepilogo Scadenze",
    description: "Genera riepilogo scadenze da commesse attive con alert e rischi",
    ecosystem: "SBedil",
    frontmatter: {
      name: "scadenze",
      description: "Genera riepilogo delle prossime scadenze da commesse attive con alert e rischi",
      "argument-hint": "[lista commesse o periodo]",
    },
    body: `Analizza le seguenti commesse e genera il riepilogo scadenze:

$ARGUMENTS

## Scadenze Prossime (7 giorni)
| Data | Commessa | Scadenza | Responsabile | Stato |
|------|----------|----------|-------------|-------|

## Scadenze Imminenti (30 giorni)
| Data | Commessa | Scadenza | Responsabile | Stato |
|------|----------|----------|-------------|-------|

## Alert e Rischi
| 🔴 Critico | Commessa | Descrizione | Azione richiesta |
|------------|----------|-------------|-----------------|

## Documenti in scadenza
| Documento | Scadenza | Commesse impattate | Stato rinnovo |
|-----------|----------|-------------------|---------------|

Regole:
- Ordina per data (più urgente prima)
- Evidenzia con 🔴 tutto ciò che scade entro 3 giorni
- Evidenzia con 🟡 scadenze entro 7 giorni
- Segnala documenti (DURC, polizze) che impattano più commesse`,
  },
];
