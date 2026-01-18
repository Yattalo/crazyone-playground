import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Boxes,
  Menu,
  X,
  Home,
  Palette,
  Github,
} from "lucide-react";
import { type ThemeId, themes, getThemeById } from "../../config/themes";

interface HeaderProps {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function Header({ activeTheme, onThemeChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const location = useLocation();
  const currentTheme = getThemeById(activeTheme);

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentTheme?.gradient || "from-primary to-accent"} flex items-center justify-center`}
            >
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">@crazyone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isHome
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Home className="w-4 h-4" />
              Gallery
            </Link>

            {/* Theme Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemePickerOpen(!themePickerOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  themePickerOpen
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Palette className="w-4 h-4" />
                {currentTheme?.name || "Theme"}
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${currentTheme?.gradient}`}
                />
              </button>

              <AnimatePresence>
                {themePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 p-4 bg-card rounded-xl border border-border shadow-xl"
                  >
                    <p className="text-sm font-medium mb-3">Quick Theme Switch</p>
                    <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            onThemeChange(theme.id);
                            setThemePickerOpen(false);
                          }}
                          className={`aspect-square rounded-lg bg-gradient-to-br ${theme.gradient} transition-all ${
                            activeTheme === theme.id
                              ? "ring-2 ring-offset-2 ring-offset-background ring-primary"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          title={theme.name}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="p-4 space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted"
              >
                <Home className="w-5 h-5" />
                Gallery
              </Link>

              <div className="px-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Select Theme
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {themes.slice(0, 12).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onThemeChange(theme.id);
                      }}
                      className={`aspect-square rounded-lg bg-gradient-to-br ${theme.gradient} transition-all ${
                        activeTheme === theme.id
                          ? "ring-2 ring-offset-2 ring-offset-background ring-primary"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
