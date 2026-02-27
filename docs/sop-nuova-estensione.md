# SOP: Creare una Nuova Estensione Raycast

## Precondizioni
- Accesso alla repo `crazyone-playground`
- Node.js 20+ installato
- Raycast installato (per testing locale)

## Procedura

### 1. Raccogliere i requisiti minimi
- `extensionSlug` (kebab-case, es. `action-extractor`)
- `extensionName` (nome leggibile, es. "Action Extractor")
- Ecosistema: `CrazyOne` o `SBedil`
- 1-3 comandi principali (nome + descrizione + input previsto)
- Integrazioni necessarie (Jira, Gmail, Calendar, Drive, Supabase, webhook, ecc.)
- Vincoli: offline/online, dati sensibili, logging, audit trail

### 2. Creare la cartella dell'estensione
```bash
cp -r template/ extensions/<extensionSlug>/
```

### 3. Personalizzare i placeholder
Sostituire in tutti i file:
- `{{EXTENSION_SLUG}}` → slug kebab-case
- `{{EXTENSION_NAME}}` → nome leggibile
- `{{EXTENSION_DESCRIPTION}}` → descrizione breve
- `{{AUTHOR}}` → autore
- `{{ECOSYSTEM}}` → CrazyOne o SBedil
- `{{COMMAND_SLUG}}` → slug del comando
- `{{COMMAND_NAME}}` → nome del comando
- `{{COMMAND_DESCRIPTION}}` → descrizione del comando

### 4. Implementare i comandi
- Creare un file `.tsx` per ogni comando in `src/`
- Aggiornare `commands` in `package.json`
- Aggiungere eventuali `tools` in `package.json` (se AI-driven)
- Input validation su tutti i campi
- Error handling con messaggi utili
- Log minimali, mai PII

### 5. Configurare le variabili d'ambiente
- Aggiungere a `.env.example` tutte le variabili necessarie
- Documentare ogni variabile nel README

### 6. Documentare
- Aggiornare `README.md` dell'estensione
- Creare `docs/<extensionSlug>-sop.md`

### 7. Verificare
- [ ] `npm run build` senza errori
- [ ] `npm run lint` senza errori
- [ ] Nessun segreto nel codice
- [ ] README completo
- [ ] SOP creata

## Output atteso
Cartella in `/extensions/<extensionSlug>/` pronta per `npm run dev` con Raycast.
