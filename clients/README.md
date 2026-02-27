# Clients — Metadata e Contesti

Questa cartella contiene metadata non sensibili per i clienti dei due ecosistemi.

## Regole di sicurezza
- **NO** email private, numeri di telefono personali, o dati sensibili.
- **NO** contenuti riservati (documenti, contratti, preventivi).
- **SI** riferimenti a ruoli, link a risorse esterne (Drive/Notion/CRM), glossario.
- **SI** Definition of Success e KPI ad alto livello.

## Struttura file cliente

Ogni cliente ha un file `<clienteSlug>.md` con:

```markdown
# Nome Cliente

## Ecosistema
CrazyOne | SBedil

## Contatti e ruoli
- Referente principale: [Ruolo]
- Referente tecnico: [Ruolo]

## Asset
- Drive: [link]
- Notion: [link]
- CRM: [link]

## Glossario
- Termine → Definizione

## Tone of voice
[Descrizione breve]

## Definition of Success
[KPI ad alto livello]
```

## Template ecosistema

- `_template-crazyone.md` — Template per clienti CrazyOne
- `_template-sbedil.md` — Template per clienti SBedil
