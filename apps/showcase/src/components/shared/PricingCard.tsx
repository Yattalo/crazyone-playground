import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { PricingPlan } from "../../data/pricing-plans";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  index?: number;
}

export function PricingCard({ plan, isYearly, index = 0 }: PricingCardProps) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const period = isYearly ? "/year" : "/month";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-2xl border-2 p-8 transition-all ${
        plan.highlighted
          ? "border-primary bg-primary/5 shadow-lg scale-105"
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground">{plan.description}</p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold">
            {price === 0 ? "Free" : `$${price}`}
          </span>
          {price > 0 && (
            <span className="text-muted-foreground">{period}</span>
          )}
        </div>
        {isYearly && price > 0 && (
          <p className="text-sm text-primary mt-2">
            Save ${plan.price.monthly * 12 - plan.price.yearly}/year
          </p>
        )}
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
          plan.highlighted
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}
