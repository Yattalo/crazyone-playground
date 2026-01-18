// Mock team members data
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    role: "Founder & CEO",
    bio: "Former design lead at Stripe. Obsessed with the intersection of design and engineering. Believes every product deserves a unique personality.",
    avatar: "https://i.pravatar.cc/300?u=alexandra",
    social: {
      twitter: "alexchen",
      github: "alexchen",
      linkedin: "alexandrachen",
    },
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "CTO",
    bio: "10+ years building design systems at scale. Previously at Vercel and Figma. TypeScript enthusiast and open source advocate.",
    avatar: "https://i.pravatar.cc/300?u=marcus",
    social: {
      twitter: "marcusw",
      github: "marcuswilliams",
      linkedin: "marcuswilliams",
    },
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    role: "Head of Design",
    bio: "Award-winning designer with a background in branding and motion design. Crafts the unique personalities of each theme.",
    avatar: "https://i.pravatar.cc/300?u=yuki",
    social: {
      twitter: "yukidesigns",
      linkedin: "yukitanaka",
    },
  },
  {
    id: "4",
    name: "James Rodriguez",
    role: "Lead Engineer",
    bio: "Full-stack developer passionate about DX. Maintains the monorepo infrastructure and build tooling.",
    avatar: "https://i.pravatar.cc/300?u=james",
    social: {
      github: "jamesrodriguez",
      linkedin: "jamesrodriguez",
    },
  },
  {
    id: "5",
    name: "Sarah Park",
    role: "Developer Relations",
    bio: "Bridge between community and product. Creates tutorials, writes docs, and helps developers succeed with @crazyone.",
    avatar: "https://i.pravatar.cc/300?u=sarah",
    social: {
      twitter: "sarahpark",
      github: "sarahpark",
    },
  },
  {
    id: "6",
    name: "David Kim",
    role: "Senior Designer",
    bio: "Specializes in accessibility and inclusive design. Ensures every theme works beautifully for everyone.",
    avatar: "https://i.pravatar.cc/300?u=david",
    social: {
      twitter: "davidkim",
      linkedin: "davidkimdesign",
    },
  },
];

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export const companyValues: CompanyValue[] = [
  {
    title: "Audacity Over Conformity",
    description: "We don't make 'nice' components. We make components with personality, character, and a point of view. If it's been done before, we're not interested.",
    icon: "Flame",
  },
  {
    title: "Developer Experience First",
    description: "Beautiful components mean nothing if they're a pain to use. We obsess over API design, documentation, and tooling to make your life easier.",
    icon: "Sparkles",
  },
  {
    title: "Accessibility Is Non-Negotiable",
    description: "Every theme, every component, every interaction is built with accessibility in mind. No exceptions, no compromises.",
    icon: "Heart",
  },
  {
    title: "Open By Default",
    description: "We believe in building in public, sharing our learnings, and contributing back to the community that made us possible.",
    icon: "Globe",
  },
];

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const companyTimeline: TimelineEvent[] = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Started as a side project exploring themed shadcn/ui components. First 5 themes launched.",
  },
  {
    year: "2024 Q1",
    title: "Open Source Launch",
    description: "Released to the public with 10 themes. Gained 5K GitHub stars in the first month.",
  },
  {
    year: "2024 Q2",
    title: "Company Formation",
    description: "Incorporated and raised seed funding. Expanded the team to 6 people.",
  },
  {
    year: "2024 Q3",
    title: "Pro Launch",
    description: "Launched Pro tier with Figma files and theme builder. 20 themes now available.",
  },
  {
    year: "2025",
    title: "Enterprise & Beyond",
    description: "Enterprise tier launched. 26 themes. Serving 10,000+ developers worldwide.",
  },
];
