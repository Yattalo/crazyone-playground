import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Github,
  Star,
  Quote,
} from "lucide-react";
import { FeatureGrid, StatsSection } from "../../components/shared";
import { type ThemeId, getThemeById } from "../../config/themes";

interface LandingPageProps {
  themeId: ThemeId;
}

const testimonials = [
  {
    quote: "The most audacious design system I've ever used. Each theme feels like a completely different product.",
    author: "Sarah Chen",
    role: "Design Lead at Vercel",
    avatar: "https://i.pravatar.cc/100?u=sarah",
  },
  {
    quote: "Finally, a design system that doesn't look like every other startup. Our users actually notice the difference.",
    author: "Marcus Williams",
    role: "CTO at Raycast",
    avatar: "https://i.pravatar.cc/100?u=marcus",
  },
  {
    quote: "Switched our entire product to @crazyone in a weekend. The DX is incredible.",
    author: "Elena Rodriguez",
    role: "Founder at Linear",
    avatar: "https://i.pravatar.cc/100?u=elena",
  },
];

export function LandingPage({ themeId }: LandingPageProps) {
  const theme = getThemeById(themeId);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${theme?.gradient} opacity-10 blur-3xl`}
          />
          <div
            className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${theme?.gradient} opacity-10 blur-3xl`}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Star className="w-4 h-4 fill-current" />
              <span>Introducing {theme?.name} Theme</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="block">{theme?.tagline}</span>
              <span
                className={`block mt-2 bg-gradient-to-r ${theme?.gradient} bg-clip-text text-transparent`}
              >
                Built for Audacity
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {theme?.description}. Transform your product with components that
              have personality, character, and a point of view.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Download className="w-5 h-5" />
                Get Started Free
              </button>
              <Link
                to={`/theme/${themeId}/pricing`}
                className="px-8 py-4 rounded-xl border-2 border-border font-medium flex items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
              >
                View Pricing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <StatsSection
              stats={[
                { value: "26", label: "Unique Themes" },
                { value: "50", label: "Components", suffix: "+" },
                { value: "10K", label: "Developers", suffix: "+" },
                { value: "4.9", label: "Star Rating" },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Build Fast
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Production-ready components with accessibility, animations, and
              full TypeScript support baked in.
            </p>
          </motion.div>

          <FeatureGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by Developers</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of teams building beautiful products with @crazyone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme?.gradient} p-12 md:p-20 text-center`}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                Join 10,000+ developers building beautiful products with
                @crazyone design system.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Download className="w-5 h-5" />
                  Install Now
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-medium flex items-center gap-2 hover:border-white/60 hover:bg-white/10 transition-all"
                >
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground">
              © 2025 @crazyone. Built with audacity.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
