# Sopralluogo 3D Pipeline

> **Ecosistema: SBedil** — Amministrazione & Operatività edilizia

Estensione Raycast per orchestrare la trasformazione di un video di sopralluogo in un tour 3D navigabile con infografiche AI.

Pipeline: **Video sopralluogo → Ricostruzione 3D (tttLRM) → Rendering tour (3DGS) → Infografica AI (VBVR) → Video finale**

## Come funziona

Il sistema esegue 4 fasi **sequenziali** (mai sovrapposte) per rispettare i 32GB di RAM del Mac Pro M5:

1. **Modulo Spaziale (tttLRM)**: Ricostruzione 3D autoregressiva con Test-Time Training. Genera 3D Gaussian Splats dal video + pose ARKit.
2. **Modulo Render (3DGS)**: Rendering di una traiettoria camera (orbita/flythrough) in video MP4.
3. **Modulo Ragionamento (VBVR)**: Video-Reason aggiunge infografiche (flussi d'aria, percorsi navigazione, annotazioni) con temporal chunking.
4. **Composizione (FFmpeg)**: Concatenazione dei chunk in video finale.

Tra ogni fase, l'orchestratore esegue un **flush GPU** (`gc.collect()` + `torch.mps.empty_cache()`) e monitora la pressione memoria di macOS.

## Setup

### Prerequisiti

- macOS con Apple Silicon (M1+, consigliato M5 con 32GB)
- Raycast
- Node.js ≥ 18
- Conda o virtualenv
- FFmpeg

### Installazione ambiente Python

```bash
# 1. Crea ambiente conda
conda create -n sopralluogo python=3.11
conda activate sopralluogo

# 2. Installa PyTorch con supporto MPS
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# 3. Installa tttLRM
git clone https://github.com/cwchenwang/tttLRM.git
cd tttLRM && pip install -e .
cd ..

# 4. Installa VBVR
git clone https://github.com/Video-Reason/VBVR-EvalKit.git
cd VBVR-EvalKit && pip install -e .
cd ..

# 5. Quantizza il modello VBVR per 32GB RAM
pip install mlx-lm
# Scarica il modello base e convertilo in 8-bit
mlx_lm.convert --model <vbvr-base-model> -q --q-bits 8 --output ~/models/vbvr-wan2.2-8bit/

# 6. Scarica checkpoint tttLRM
# Segui le istruzioni nel repo tttLRM per scaricare il checkpoint
# Posizionalo in ~/models/tttlrm/checkpoint.pt

# 7. Installa FFmpeg
brew install ffmpeg
```

### Installazione estensione

```bash
cd extensions/sopralluogo-3d-pipeline
npm install
npm run dev
```

### Configurazione Raycast Preferences

Apri l'estensione in Raycast e configura:

| Preferenza | Descrizione | Esempio |
|-----------|-------------|---------|
| Projects Directory | Dove salvare i progetti | `~/Documents/sopralluoghi` |
| Python Path | Binario Python con le dipendenze | `~/miniconda3/envs/sopralluogo/bin/python` |
| tttLRM Checkpoint | File checkpoint del modello | `~/models/tttlrm/checkpoint.pt` |
| VBVR Model Path | Directory modello quantizzato | `~/models/vbvr-wan2.2-8bit/` |
| FFmpeg Path | Path a ffmpeg (default: `ffmpeg`) | `ffmpeg` |
| Max Memory (GB) | Budget memoria per ML (default: 24) | `24` |

## Comandi

### Launch Pipeline

Wizard completo per configurare e avviare una pipeline. Raccoglie:
- Nome progetto e video di sopralluogo
- Dati pose ARKit (opzionale — da Scaniverse/Polycam/ARKit)
- Traiettoria camera e risoluzione rendering
- Prompt infografica per VBVR
- Parametri chunking e quantizzazione

### Pipeline Monitor

Dashboard live che mostra:
- Avanzamento per stage (pending → running → done)
- Pressione memoria macOS con barra visuale
- Log in tempo reale dello stage attivo
- Metadata del progetto nella sidebar

### Project Library

Browser dei progetti passati e attivi con:
- Raggruppamento per stato (In Corso, Completati, Falliti)
- Azioni: apri cartella, apri video finale, rilancia, elimina

### Check Environment

Validazione di tutti i prerequisiti:
- Python, PyTorch+MPS, tttLRM, VBVR, FFmpeg
- Checkpoint e modello presenti su disco
- Pressione memoria sistema

## Ottimizzazioni chiave

### Pose da iPhone (bypass COLMAP)

Acquisisci il video con **Scaniverse**, **Polycam** o script ARKit personalizzati. I metadati di posa vengono salvati automaticamente e possono essere iniettati nella pipeline, evitando il calcolo SfM (Structure from Motion) che saturerebbe la RAM.

### Temporal Chunking adattivo

VBVR processa il video in blocchi da 16-32 frame. Se la pressione memoria supera l'80%, il chunk size viene automaticamente dimezzato. Ogni chunk riceve l'ultimo frame del blocco precedente come condizione visiva per garantire continuità.

### Flush sequenziale

L'orchestratore non sovrappone mai due fasi. Dopo ogni stage: `gc.collect()` + `torch.mps.empty_cache()` + verifica pressione prima di procedere.

## Troubleshooting

| Problema | Soluzione |
|---------|-----------|
| `torch.backends.mps.is_available()` → False | Aggiorna PyTorch: `pip install --upgrade torch` |
| OOM durante tttLRM | Riduci `numViews` a 8 o 4 |
| OOM durante VBVR | Usa quantizzazione 4-bit e riduci chunk a 16 |
| Video finale con salti | Abilita CPU offload e chunk adattivo |
| `memory_pressure` non trovato | Disponibile solo su macOS |
| Pipeline bloccata | Apri Pipeline Monitor → verifica log → rilancia da Project Library |

## Development

```bash
npm run build    # Compila TypeScript
npm run dev      # Avvia sviluppo con hot reload
npm run lint     # Verifica ESLint
npm run fix-lint # Fix automatico lint
```
