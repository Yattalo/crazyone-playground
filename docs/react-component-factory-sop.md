# SOP: React Component Factory

## Cosa fa
Estensione Raycast per creare, navigare, remixare e inserire componenti React con metadata completi (props, varianti, dipendenze, storie Storybook).

## Precondizioni
- Raycast installato
- Node.js 20+
- Directory componenti configurata nelle preferenze Raycast

## Comandi

### 1. Create Component (Builder)
**Cosa fa**: Scaffolda un nuovo componente React completo.

**Input**:
- Nome (obbligatorio)
- Categoria: UI / Blocks / Patterns
- Descrizione, varianti, tag, dipendenze, CSS variables
- Props dinamiche (aggiungibili con ⌘N)

**Output** (per ogni componente):
- `<slug>.tsx` — sorgente componente con `forwardRef`, TypeScript props interface
- `meta.json` — metadata completi per il catalogo
- `index.ts` — barrel export
- `cn.ts` — utility Tailwind merge
- `<slug>.stories.tsx` — storia Storybook (opzionale)
- `registry.json` aggiornato

**Esempio d'uso**:
1. "Create Component" → Nome: `PricingCard`
2. Categoria: Blocks
3. Varianti: `default, highlighted, enterprise`
4. ⌘N → Prop: `plan` / tipo: `PricingPlan` / required: true
5. ⌘N → Prop: `isYearly` / tipo: `boolean` / default: `false`
6. Submit → genera 5 file in `blocks/pricing-card/`

### 2. Component Library (Previewer)
**Cosa fa**: Catalogo navigabile di tutti i componenti con dettagli completi.

**Output**:
- Lista raggruppata per categoria
- Vista dettaglio con: props table, varianti, esempi, import/usage snippet, dipendenze, CSS variables
- Azioni: apri file, copia import, copia usage, elimina

**Esempio d'uso**:
1. "Component Library" → cerca "button"
2. Enter → vista dettaglio con tutti i metadata
3. ⌘I → copia `import { Button } from "@/components/ui/button"`
4. ⌘U → copia `<Button variant="default">Content</Button>`

### 3. Remix Component (Remixer)
**Cosa fa**: Clona un componente esistente e lo personalizza.

**Input**:
- Componente base (selezionato dalla lista)
- Nuovo nome, categoria, descrizione
- Varianti da aggiungere/rimuovere
- Tag addizionali
- Wrapper element + classi Tailwind

**Output**: Nuovo componente con sorgente trasformato e metadata aggiornati.

**Esempio d'uso**:
1. "Remix Component" → seleziona `Button`
2. Nuovo nome: `IconButton`
3. Aggiungi varianti: `icon-only, icon-left, icon-right`
4. Wrapper: nessuno
5. Submit → genera `ui/icon-button/` basato su Button

### 4. Quick Insert
**Cosa fa**: Inserimento rapido di codice componente nel flusso di lavoro.

**Azioni disponibili**:
- Enter → incolla import nell'editor attivo
- ⌘U → incolla usage snippet
- ⌘C → copia import + usage
- ⌘⇧C → copia sorgente completo
- ⌘P → copia props table markdown

## Schema meta.json

```json
{
  "name": "Button",
  "slug": "button",
  "category": "ui",
  "description": "Interactive button with multiple variants",
  "author": "crazyone",
  "version": "0.1.0",
  "dependencies": ["@radix-ui/react-slot"],
  "peerDependencies": ["react", "tailwindcss"],
  "props": [
    {
      "name": "variant",
      "type": "\"default\" | \"destructive\" | \"outline\"",
      "default": "\"default\"",
      "required": false,
      "description": "Visual style"
    }
  ],
  "variants": ["default", "destructive", "outline"],
  "cssVariables": ["--primary", "--background"],
  "tags": ["interactive", "form"],
  "examples": [
    { "title": "Basic", "code": "<Button>Click</Button>" }
  ],
  "compatibility": {
    "themes": ["all"],
    "frameworks": ["react", "next"]
  }
}
```

## Struttura directory componenti

```
<components-root>/
├── registry.json
├── ui/           # Primitivi (shadcn-style)
├── blocks/       # Composti (hero, pricing, form)
└── patterns/     # Layout (sidebar, grid, dashboard)
```

## Troubleshooting

| Problema | Soluzione |
|----------|----------|
| "No components" | Configura Components Root nelle preferenze Raycast |
| Registry corrotto | Elimina `registry.json`, verrà rigenerato |
| Props non appaiono | Verifica `meta.json` del componente |
| Import path errato | L'import assume `@/components/<category>/<slug>` — adatta al tuo progetto |
