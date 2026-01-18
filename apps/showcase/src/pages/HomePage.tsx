import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Download,
  Github,
  Star,
} from "lucide-react";
import { themes, themeCategories, type ThemeCategory, type ThemeId } from "../config/themes";

interface HomePageProps {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function HomePage({ activeTheme, onThemeChange }: HomePageProps) {
  const [categoryFilter, setCategoryFilter] = useState<ThemeCategory | null>(null);
  const currentTheme = themes.find((t) => t.id === activeTheme)!;

  const filteredThemes = categoryFilter
    ? themes.filter((t) => t.category === categoryFilter)
    : themes;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${currentTheme.gradient} opacity-10 blur-3xl`}
          />
          <div
            className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${currentTheme.gradient} opacity-10 blur-3xl`}
          />
        </div>

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>26 Themes • 50+ Components • Infinite Possibilities</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="block">Design System</span>
              <span
                className={`block bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent`}
              >
                Showcase
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Explore 26 audacious themes, each with full-page demos showing how
              they transform real-world applications. From landing pages to
              dashboards.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Download className="w-5 h-5" />
                Get Started
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border-2 border-border font-medium flex items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm">12K+ GitHub Stars</span>
              </div>
              <div className="text-sm">•</div>
              <div className="text-sm">MIT License</div>
              <div className="text-sm">•</div>
              <div className="text-sm">TypeScript First</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Gallery */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">26 Unique Themes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each theme is a complete personality with full-page demos. Click
              any theme to explore its landing, blog, dashboard, and more.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setCategoryFilter(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                categoryFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              All ({themes.length})
            </button>
            {themeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  categoryFilter === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.label} ({themes.filter((t) => t.category === cat.id).length})
              </button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/theme/${theme.id}`}
                  onClick={() => onThemeChange(theme.id)}
                  className="group block"
                >
                  <div
                    className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                      activeTheme === theme.id
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`h-32 bg-gradient-to-br ${theme.gradient} relative`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <span className="px-4 py-2 rounded-lg bg-white/90 text-black text-sm font-medium flex items-center gap-2">
                          Explore Theme
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{theme.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            theme.isDark
                              ? "bg-slate-800 text-slate-200"
                              : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {theme.isDark ? "Dark" : "Light"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {theme.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pages Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">6 Page Templates Per Theme</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how each theme transforms different types of pages. Every
              template is fully responsive and production-ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Landing Page",
                description: "Hero sections, feature grids, testimonials",
                path: "",
              },
              {
                name: "Blog",
                description: "Article lists, categories, single posts",
                path: "/blog",
              },
              {
                name: "Dashboard",
                description: "Stats, charts, data tables, sidebar",
                path: "/dashboard",
              },
              {
                name: "About",
                description: "Team members, timeline, company values",
                path: "/about",
              },
              {
                name: "Contact",
                description: "Contact form, map, social links",
                path: "/contact",
              },
              {
                name: "Pricing",
                description: "Pricing cards, feature comparison, FAQ",
                path: "/pricing",
              },
            ].map((page, index) => (
              <motion.div
                key={page.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/theme/${activeTheme}${page.path}`}
                  className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{page.description}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    View Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
