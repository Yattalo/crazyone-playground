import { motion } from "motion/react";
import {
  Zap,
  Shield,
  Palette,
  Code,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: Palette,
    title: "26 Unique Themes",
    description: "Each theme is a complete personality, not just a color swap.",
  },
  {
    icon: Code,
    title: "Developer First",
    description: "TypeScript, tree-shakeable, and fully documented components.",
  },
  {
    icon: Layers,
    title: "Built on shadcn/ui",
    description: "Radix primitives, Tailwind styling, maximum accessibility.",
  },
  {
    icon: Zap,
    title: "Zero Config",
    description: "Install, import, and use. No complex setup required.",
  },
  {
    icon: Shield,
    title: "Accessible",
    description: "WCAG compliant components with full keyboard navigation.",
  },
  {
    icon: Sparkles,
    title: "Animations",
    description: "Theme-specific animations that bring components to life.",
  },
];

interface FeatureGridProps {
  features?: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features = defaultFeatures, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
