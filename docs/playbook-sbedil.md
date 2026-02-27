# Playbook — SBedil (Amministrazione & Operatività Edilizia)

## Obiettivo
Ridurre caos operativo e standardizzare flussi nel settore edile.

## Flusso operativo standard
```
Preventivo → Accettazione → Commessa → SAL → Fattura → Incasso
```

## Pattern comuni

### Bozza Preventivo
- **Input**: appunti grezzi (voce, note, foto)
- **Output**: preventivo strutturato con voci, quantità, prezzi, note
- **Integrazione tipica**: Google Sheets, PDF export

### Checklist Avvio Cantiere
- **Input**: dati commessa
- **Output**: lista controlli + documenti richiesti + responsabilità
- **Integrazione tipica**: Google Drive (documenti), Calendar (scadenze)

### Riepilogo Scadenze
- **Input**: date e milestone da commesse attive
- **Output**: prossime attività, rischi, alert
- **Integrazione tipica**: Google Calendar, Notion

## Principi output
- Procedure: ogni output segue la SOP di riferimento
- Responsabilità: sempre indicare chi è responsabile di ogni step
- Evidenze: collegare documenti di supporto
- Date: includere scadenze e date di follow-up

## Estensioni tipiche da generare
1. `preventivo-builder` — Crea bozza preventivo da appunti
2. `checklist-cantiere` — Genera checklist avvio cantiere
3. `scadenze-tracker` — Riepilogo scadenze e alert
4. `sal-manager` — Gestione stati avanzamento lavori
5. `fattura-drafter` — Bozza fattura da SAL completato
