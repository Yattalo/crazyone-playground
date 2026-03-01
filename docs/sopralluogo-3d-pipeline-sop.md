# SOP — Sopralluogo 3D Pipeline

**Ecosistema**: SBedil
**Estensione**: `sopralluogo-3d-pipeline`
**Ultimo aggiornamento**: 2026-03-01

---

## Obiettivo

Trasformare un video di sopralluogo cliente in un tour 3D navigabile con infografiche AI automatiche.

## Precondizioni

1. Mac con Apple Silicon (M1+), consigliato M5 con 32GB RAM unificata
2. Ambiente Python con tttLRM, VBVR, PyTorch+MPS installati
3. Checkpoint tttLRM e modello VBVR quantizzato (8-bit o 4-bit)
4. FFmpeg installato
5. Raycast con estensione `sopralluogo-3d-pipeline` configurata

## Procedura

### 1. Acquisizione sopralluogo

**Chi**: Tecnico sul campo
**Come**: iPhone/iPad con app Scaniverse o Polycam
**Output**: File video (.mp4/.mov) + metadati pose ARKit (.json)

> **CRITICO**: Usare sempre un'app che salva le pose camera. Senza pose, il sistema deve calcolarle con COLMAP → saturazione RAM → fallimento su 32GB.

### 2. Lancio pipeline

**Chi**: Operatore SBedil
**Come**: Raycast → "Launch Pipeline"

| Campo | Cosa inserire | Note |
|-------|--------------|------|
| Nome Progetto | Nome cliente + indirizzo | Es. "Rossi - Via Roma 12" |
| Video Sopralluogo | File .mp4/.mov dal telefono | Seleziona da Finder |
| Dati Pose ARKit | File .json da Scaniverse | Opzionale ma consigliato |
| Prompt Infografica | Cosa sovrapporre al tour | Es. "Evidenzia pareti da ristrutturare in rosso, annota dimensioni stanze" |
| Traiettoria Camera | Orbita o Flythrough | Orbita per panoramica, flythrough per percorso |
| Risoluzione | 1080p o 720p | 720p se il video originale è corto |
| Frame per Chunk | 16 (sicuro) o 24 | 16 per prima esecuzione |
| Quantizzazione | 8-bit | 4-bit solo se memoria insufficiente |
| CPU Offload | Sì | Sempre attivo su 32GB |
| Chunk Adattivo | Sì | Dimezza automaticamente se RAM critica |

### 3. Monitoraggio

**Chi**: Operatore
**Come**: Raycast → "Pipeline Monitor"

Verificare:
- Ogni stage passa da ⬜ a 🔄 a ✅
- Pressione memoria resta sotto 80% (barra verde/gialla)
- Log non mostrano errori

**Tempi attesi** (M5 32GB, video 2 min, 16 views, 8-bit):
- Spatial: 5-15 min
- Render: 2-5 min
- Reasoning: 10-30 min (dipende da lunghezza e n. chunks)
- Composite: < 1 min

### 4. Output

**Dove**: `<Projects Directory>/<project-id>/`

| File | Descrizione |
|------|-------------|
| `project.json` | Configurazione e stato pipeline |
| `scene.ply` | 3D Gaussian Splats (gemello digitale) |
| `tour.mp4` | Video tour renderizzato |
| `final.mp4` | **Video finale con infografiche** ← consegnare al cliente |

### 5. Consegna al cliente

1. Apri "Project Library" → progetto completato → "Apri Video Finale"
2. Verifica qualità visiva (infografiche corrette, no salti tra chunk)
3. Se necessario, rilancia con prompt VBVR modificato
4. Invia `final.mp4` al cliente via canale concordato

## Gestione errori

| Errore | Azione |
|--------|--------|
| Stage "spatial" fallito | Verificare che il video sia leggibile. Ridurre numViews. |
| Stage "reasoning" fallito | Ridurre chunk a 16, passare a 4-bit, verificare modello VBVR. |
| Pressione memoria > 90% | Chiudere tutte le app. Ridurre chunk. Abilitare chunk adattivo. |
| Video finale con artefatti | Ridurre chunk (più overlap). Riformulare prompt VBVR. |
| Pipeline bloccata | Check Environment → verificare prerequisiti. Rilanciare. |

## Esempi prompt VBVR

```
"Evidenzia le pareti portanti in verde e quelle demolibili in rosso.
Annota le dimensioni delle stanze principali.
Traccia il percorso di navigazione consigliato con frecce blu."
```

```
"Evidenzia il flusso d'aria dal condizionatore in blu semitrasparente.
Marca i punti luce esistenti con icone gialle.
Aggiungi etichette alle finestre con orientamento cardinale."
```

```
"Sovrapponi una griglia metrica al pavimento.
Evidenzia le zone umide in rosso con bordo tratteggiato.
Annota le altezze dei soffitti in ogni ambiente."
```
