import { motion } from "motion/react";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const defaultStats: Stat[] = [
  { value: "26", label: "Themes" },
  { value: "50", label: "Components", suffix: "+" },
  { value: "10K", label: "Developers", suffix: "+" },
  { value: "99.9", label: "Uptime", suffix: "%" },
];

interface StatsSectionProps {
  stats?: Stat[];
  className?: string;
}

export function StatsSection({ stats = defaultStats, className = "" }: StatsSectionProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {stat.value}
            {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
          </div>
          <div className="text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
