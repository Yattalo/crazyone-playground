import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/globals.css";
import "../src/theme-animations.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        // Flagship themes
        brutalist: "brutalist",
        vaporwave: "vaporwave",
        cyberdeck: "cyberdeck",
        hologram: "hologram",
        bubblegum: "bubblegum",
        // Phase 1 - Elemental
        obsidian: "obsidian",
        campfire: "campfire",
        bauhaus: "bauhaus",
        arctic: "arctic",
        terracotta: "terracotta",
        gelato: "gelato",
        // Phase 2 - Retro/Atmospheric
        synthwave: "synthwave",
        darkroom: "darkroom",
        thunderstorm: "thunderstorm",
        retrofuture: "retrofuture",
        greenhouse: "greenhouse",
        // Phase 3 - Specialty
        wireframe: "wireframe",
        nightclub: "nightclub",
        bioluminescent: "bioluminescent",
        blackletter: "blackletter",
      },
      defaultTheme: "brutalist",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
