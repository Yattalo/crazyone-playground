import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "dark",
  brandTitle: "@crazyone Design System",
  brandUrl: "https://github.com/crazyone",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#a855f7",
  colorSecondary: "#ec4899",

  // UI
  appBg: "#0a0a0a",
  appContentBg: "#121212",
  appPreviewBg: "#0a0a0a",
  appBorderColor: "#333333",
  appBorderRadius: 8,

  // Text colors
  textColor: "#ffffff",
  textInverseColor: "#0a0a0a",

  // Toolbar
  barTextColor: "#a0a0a0",
  barSelectedColor: "#a855f7",
  barHoverColor: "#ec4899",
  barBg: "#121212",

  // Form colors
  inputBg: "#1a1a1a",
  inputBorder: "#333333",
  inputTextColor: "#ffffff",
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
