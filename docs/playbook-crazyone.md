# Playbook — CrazyOne (Marketing & Strategia)

## Obiettivo
Velocizzare delivery e reporting su clienti enterprise (10M+).

## Pattern comuni

### Estrazione Action Points
- **Input**: testo libero (email, note riunione, chat)
- **Output**: lista strutturata con task, owner, deadline, follow-up
- **Integrazione tipica**: Jira, Notion, Google Tasks

### Sintesi Meeting
- **Input**: trascrizione o note grezze
- **Output**: note formattate + decisioni + next steps
- **Integrazione tipica**: Google Calendar, Notion

### Report Settimanale
- **Input**: metriche, milestone, problemi
- **Output**: report templated pronto per invio
- **Integrazione tipica**: Google Sheets, Gmail

## Principi output
- Chiarezza: ogni output deve essere azionabile
- Next actions: sempre esplicitare chi fa cosa e quando
- Tempi: includere deadline realistiche
- Owner: ogni task ha un responsabile

## Convenzioni file cliente
Cartella `/clients/<clienteSlug>.md` con:
- Contatti e ruoli (NO email private)
- Link ad asset (Drive/Notion/CRM)
- Glossario e tone-of-voice
- Definition of Success e KPI (alto livello)

## Estensioni tipiche da generare
1. `action-extractor` — Estrai action points da testo
2. `meeting-summarizer` — Sintetizza meeting
3. `weekly-report` — Genera report settimanale
4. `client-briefing` — Prepara briefing per riunione cliente
5. `email-drafter` — Bozza email da bullet points
