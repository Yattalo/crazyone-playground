import { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";

// Layout components
import { Header, ThemeNav, PageWrapper } from "./components/layout";

// Pages
import { HomePage } from "./pages/HomePage";
import {
  LandingPage,
  BlogPage,
  BlogPostPage,
  DashboardPage,
  AboutPage,
  ContactPage,
  PricingPage,
} from "./pages/themes";

// Config
import { type ThemeId, themes } from "./config/themes";

// Default theme
const DEFAULT_THEME: ThemeId = "brutalist";

function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>(() => {
    // Try to get theme from localStorage
    const saved = localStorage.getItem("@crazyone/theme");
    if (saved && themes.some((t) => t.id === saved)) {
      return saved as ThemeId;
    }
    return DEFAULT_THEME;
  });

  // Persist theme selection
  useEffect(() => {
    localStorage.setItem("@crazyone/theme", activeTheme);
  }, [activeTheme]);

  const handleThemeChange = (theme: ThemeId) => {
    setActiveTheme(theme);
  };

  return (
    <HashRouter>
      <div
        data-theme={activeTheme}
        className="min-h-screen bg-background text-foreground transition-colors duration-300"
      >
        <Header activeTheme={activeTheme} onThemeChange={handleThemeChange} />

        <AnimatePresence mode="wait">
          <Routes>
            {/* Home - Theme Gallery */}
            <Route
              path="/"
              element={
                <PageWrapper theme={activeTheme}>
                  <HomePage
                    activeTheme={activeTheme}
                    onThemeChange={handleThemeChange}
                  />
                </PageWrapper>
              }
            />

            {/* Theme Pages */}
            <Route
              path="/theme/:themeId/*"
              element={
                <ThemeLayout
                  activeTheme={activeTheme}
                  onThemeChange={handleThemeChange}
                />
              }
            >
              <Route index element={<ThemeLandingPage />} />
              <Route path="blog" element={<ThemeBlogPage />} />
              <Route path="blog/:slug" element={<ThemeBlogPostPage />} />
              <Route path="dashboard" element={<ThemeDashboardPage />} />
              <Route path="about" element={<ThemeAboutPage />} />
              <Route path="contact" element={<ThemeContactPage />} />
              <Route path="pricing" element={<ThemePricingPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </HashRouter>
  );
}

// Theme Layout with nav and synced theme
interface ThemeLayoutProps {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

function ThemeLayout({ activeTheme, onThemeChange }: ThemeLayoutProps) {
  const { themeId } = useParams();

  // Sync URL theme with app state
  useEffect(() => {
    if (themeId && themes.some((t) => t.id === themeId) && themeId !== activeTheme) {
      onThemeChange(themeId as ThemeId);
    }
  }, [themeId, activeTheme, onThemeChange]);

  // Validate theme ID
  const validTheme = themes.some((t) => t.id === themeId);
  if (!validTheme) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageWrapper theme={themeId as ThemeId} className="pt-16">
      <ThemeNav />
      <Outlet />
    </PageWrapper>
  );
}

// Theme page wrappers that get themeId from URL
function ThemeLandingPage() {
  const { themeId } = useParams();
  return <LandingPage themeId={themeId as ThemeId} />;
}

function ThemeBlogPage() {
  const { themeId } = useParams();
  return <BlogPage themeId={themeId as ThemeId} />;
}

function ThemeBlogPostPage() {
  const { themeId } = useParams();
  return <BlogPostPage themeId={themeId as ThemeId} />;
}

function ThemeDashboardPage() {
  const { themeId } = useParams();
  return <DashboardPage themeId={themeId as ThemeId} />;
}

function ThemeAboutPage() {
  const { themeId } = useParams();
  return <AboutPage themeId={themeId as ThemeId} />;
}

function ThemeContactPage() {
  const { themeId } = useParams();
  return <ContactPage themeId={themeId as ThemeId} />;
}

function ThemePricingPage() {
  const { themeId } = useParams();
  return <PricingPage themeId={themeId as ThemeId} />;
}

export default App;
