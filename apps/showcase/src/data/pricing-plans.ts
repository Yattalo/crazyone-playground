// Mock pricing plans data
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for side projects and personal use",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "5 themes included",
      "Basic components",
      "Community support",
      "MIT License",
      "npm access",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional teams building production apps",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      "All 26 themes",
      "Premium components",
      "Priority support",
      "Figma files",
      "Private npm registry",
      "Custom theme builder",
      "Team licenses",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      "Everything in Pro",
      "Custom themes",
      "Dedicated support",
      "SLA guarantee",
      "SSO integration",
      "Audit logs",
      "Custom contracts",
      "On-premise option",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: FAQ[] = [
  {
    question: "Can I use @crazyone in commercial projects?",
    answer: "Yes! The Starter tier uses the MIT license, which allows commercial use. Pro and Enterprise tiers include additional commercial rights and support.",
  },
  {
    question: "What's included in 'Priority Support'?",
    answer: "Priority support includes direct access to our engineering team via Slack, guaranteed 24-hour response times, and priority bug fixes for your reported issues.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, your current features remain until the end of the billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "What happens to my projects if I cancel?",
    answer: "Your existing projects continue to work with the themes you've already installed. You'll lose access to updates and premium support, but your code remains yours.",
  },
  {
    question: "Is there a discount for open source projects?",
    answer: "Yes! Open source maintainers get 50% off Pro plans. Contact us with your project details to apply.",
  },
];

export interface FeatureComparison {
  feature: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export const featureComparison: FeatureComparison[] = [
  { feature: "Number of themes", starter: "5", pro: "26", enterprise: "26 + Custom" },
  { feature: "Components", starter: "Basic", pro: "All", enterprise: "All + Custom" },
  { feature: "Updates", starter: true, pro: true, enterprise: true },
  { feature: "Community support", starter: true, pro: true, enterprise: true },
  { feature: "Priority support", starter: false, pro: true, enterprise: true },
  { feature: "Dedicated support", starter: false, pro: false, enterprise: true },
  { feature: "Figma files", starter: false, pro: true, enterprise: true },
  { feature: "Theme builder", starter: false, pro: true, enterprise: true },
  { feature: "Private npm", starter: false, pro: true, enterprise: true },
  { feature: "SSO", starter: false, pro: false, enterprise: true },
  { feature: "SLA", starter: false, pro: false, enterprise: true },
  { feature: "Custom contract", starter: false, pro: false, enterprise: true },
];
