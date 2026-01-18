// Theme configuration for all 26 themes
export type ThemeId =
  | "brutalist" | "vaporwave" | "obsidian" | "bubblegum" | "wireframe"
  | "terracotta" | "cyberdeck" | "gelato" | "retrofuture" | "nightclub"
  | "synthwave" | "greenhouse" | "blackletter" | "bioluminescent" | "bauhaus"
  | "campfire" | "arctic" | "darkroom" | "thunderstorm" | "hologram"
  | "vega" | "lyra" | "maia" | "nova" | "mira";

export type ThemeCategory = "bold" | "retro" | "nature" | "dark" | "playful" | "minimal";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  category: ThemeCategory;
  isDark: boolean;
}

export const themes: ThemeConfig[] = [
  // BOLD - High impact, strong statements
  {
    id: "brutalist",
    name: "Brutalist",
    tagline: "Raw concrete, zero pretense",
    description: "Exposed structure, harsh shadows, monospace typography",
    gradient: "from-neutral-800 via-orange-600 to-orange-500",
    category: "bold",
    isDark: false
  },
  {
    id: "blackletter",
    name: "Blackletter",
    tagline: "Gothic power, modern edge",
    description: "Ink black with cardinal red, gothic arch frames",
    gradient: "from-neutral-900 via-neutral-800 to-red-700",
    category: "bold",
    isDark: true
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    tagline: "Form follows function, beautifully",
    description: "Pure primary colors, geometric shapes, clean lines",
    gradient: "from-red-500 via-yellow-400 to-blue-600",
    category: "bold",
    isDark: false
  },
  {
    id: "thunderstorm",
    name: "Thunderstorm",
    tagline: "Electric tension, dramatic release",
    description: "Storm cloud gray with lightning yellow and rain silver",
    gradient: "from-slate-800 via-slate-600 to-yellow-400",
    category: "bold",
    isDark: true
  },

  // RETRO - Nostalgic aesthetics
  {
    id: "vaporwave",
    name: "Vaporwave",
    tagline: "Dead malls, eternal sunset",
    description: "Hot pink and cyan, VHS aesthetic, chromatic aberration",
    gradient: "from-pink-400 via-purple-500 to-cyan-400",
    category: "retro",
    isDark: true
  },
  {
    id: "synthwave",
    name: "Synthwave",
    tagline: "Chrome dreams, electric highways",
    description: "Purple night sky with neon magenta and cyan",
    gradient: "from-purple-900 via-pink-600 to-cyan-400",
    category: "retro",
    isDark: true
  },
  {
    id: "retrofuture",
    name: "Retrofuture",
    tagline: "Tomorrow as imagined yesterday",
    description: "Atomic age optimism, starbursts, long shadows",
    gradient: "from-amber-100 via-blue-700 to-orange-500",
    category: "retro",
    isDark: false
  },
  {
    id: "darkroom",
    name: "Darkroom",
    tagline: "Analog process, patient craft",
    description: "Safe light black with darkroom red and paper cream",
    gradient: "from-neutral-900 via-red-900 to-amber-100",
    category: "retro",
    isDark: true
  },

  // DARK - Night mode specialists
  {
    id: "obsidian",
    name: "Obsidian",
    tagline: "Volcanic glass precision",
    description: "Void black with molten accents, surgical precision",
    gradient: "from-neutral-900 via-rose-600 to-rose-500",
    category: "dark",
    isDark: true
  },
  {
    id: "cyberdeck",
    name: "Cyberdeck",
    tagline: "Neon-lit hacker aesthetic",
    description: "Terminal black with matrix green, blinking cursors",
    gradient: "from-black via-green-500 to-green-400",
    category: "dark",
    isDark: true
  },
  {
    id: "nightclub",
    name: "Nightclub",
    tagline: "3AM, bass drops heavy",
    description: "Blackout with laser pink and strobe gold",
    gradient: "from-black via-pink-600 to-amber-400",
    category: "dark",
    isDark: true
  },
  {
    id: "bioluminescent",
    name: "Bioluminescent",
    tagline: "Deep ocean, living light",
    description: "Abyss black with cyan and jellyfish purple glow",
    gradient: "from-blue-950 via-cyan-500 to-purple-500",
    category: "dark",
    isDark: true
  },
  {
    id: "hologram",
    name: "Hologram",
    tagline: "Tomorrow rendered today",
    description: "Void black with iridescent spectrum gradients",
    gradient: "from-purple-600 via-pink-500 to-cyan-400",
    category: "dark",
    isDark: true
  },

  // NATURE - Organic and natural
  {
    id: "terracotta",
    name: "Terracotta",
    tagline: "Sunbaked earth, timeless warmth",
    description: "Mediterranean warmth, organic curves, sage accents",
    gradient: "from-orange-600 via-amber-600 to-green-600",
    category: "nature",
    isDark: false
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    tagline: "Glass walls, growing things",
    description: "Morning mist with forest green and sunlight yellow",
    gradient: "from-green-100 via-green-600 to-amber-400",
    category: "nature",
    isDark: false
  },
  {
    id: "campfire",
    name: "Campfire",
    tagline: "Stories under the stars",
    description: "Night sky with ember orange and firelight warmth",
    gradient: "from-slate-800 via-orange-500 to-amber-300",
    category: "nature",
    isDark: true
  },
  {
    id: "arctic",
    name: "Arctic",
    tagline: "Crystal clarity, frozen precision",
    description: "Ice white with glacier blue and aurora purple",
    gradient: "from-white via-cyan-400 to-purple-500",
    category: "nature",
    isDark: false
  },

  // PLAYFUL - Fun and energetic
  {
    id: "bubblegum",
    name: "Bubblegum",
    tagline: "Dopamine hits, zero regrets",
    description: "Bouncy pink and yellow, playful squish effects",
    gradient: "from-pink-400 via-pink-500 to-amber-400",
    category: "playful",
    isDark: false
  },
  {
    id: "wireframe",
    name: "Wireframe",
    tagline: "Sketched, never finished",
    description: "Hand-drawn borders, paper texture, red markup",
    gradient: "from-neutral-300 via-neutral-400 to-red-400",
    category: "playful",
    isDark: false
  },
  {
    id: "gelato",
    name: "Gelato",
    tagline: "Italian summer afternoon",
    description: "Pastel layers, scooped edges, elegant playfulness",
    gradient: "from-pink-200 via-green-200 to-amber-200",
    category: "playful",
    isDark: false
  },

  // MINIMAL - Clean and professional
  {
    id: "vega",
    name: "Vega",
    tagline: "Warm minimalism, effortless elegance",
    description: "Creamy whites with warm orange accents, soft curves",
    gradient: "from-orange-100 via-orange-400 to-amber-500",
    category: "minimal",
    isDark: false
  },
  {
    id: "lyra",
    name: "Lyra",
    tagline: "Purple haze, creative flow",
    description: "Violet gradients with pink accents, dreamy aesthetic",
    gradient: "from-purple-200 via-purple-500 to-pink-500",
    category: "minimal",
    isDark: false
  },
  {
    id: "maia",
    name: "Maia",
    tagline: "Pure contrast, silent power",
    description: "True black on white, maximum legibility",
    gradient: "from-neutral-100 via-neutral-500 to-neutral-900",
    category: "minimal",
    isDark: false
  },
  {
    id: "nova",
    name: "Nova",
    tagline: "Sunrise optimism, daily energy",
    description: "Warm cream with vibrant orange, sunrise palette",
    gradient: "from-amber-100 via-orange-400 to-red-500",
    category: "minimal",
    isDark: false
  },
  {
    id: "mira",
    name: "Mira",
    tagline: "Corporate clarity, trusted authority",
    description: "Cool blues with professional navy, enterprise grade",
    gradient: "from-blue-100 via-blue-500 to-slate-800",
    category: "minimal",
    isDark: false
  },
];

export const themeCategories: { id: ThemeCategory; label: string; description: string }[] = [
  { id: "bold", label: "Bold", description: "High impact, strong statements" },
  { id: "retro", label: "Retro", description: "Nostalgic aesthetics" },
  { id: "dark", label: "Dark", description: "Night mode specialists" },
  { id: "nature", label: "Nature", description: "Organic and natural" },
  { id: "playful", label: "Playful", description: "Fun and energetic" },
  { id: "minimal", label: "Minimal", description: "Clean and professional" },
];

// Flagship themes with custom hero components
export const flagshipThemes: ThemeId[] = ["brutalist", "vaporwave", "cyberdeck", "hologram", "bubblegum"];

export function getThemeById(id: ThemeId): ThemeConfig | undefined {
  return themes.find((t) => t.id === id);
}

export function getThemesByCategory(category: ThemeCategory): ThemeConfig[] {
  return themes.filter((t) => t.category === category);
}
