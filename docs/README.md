# Docs — Raycast Extension Factory

Questa cartella contiene SOP, playbook e note architetturali per la factory di estensioni Raycast.

## Struttura

```
docs/
├── README.md                    # Questo file
├── sop-nuova-estensione.md      # SOP: come creare una nuova estensione
├── playbook-crazyone.md         # Playbook ecosistema CrazyOne
├── playbook-sbedil.md           # Playbook ecosistema SBedil
└── <extension-slug>-sop.md      # SOP specifiche per estensione (generate)
```

## Come aggiungere documentazione

Ogni nuova estensione deve avere una SOP in questa cartella con il pattern:
`<extension-slug>-sop.md`

La SOP deve includere:
1. Cosa fa l'estensione
2. Precondizioni (env vars, integrazioni, permessi)
3. Comandi disponibili con input/output
4. Esempi d'uso (2-3 prompt reali)
5. Troubleshooting
