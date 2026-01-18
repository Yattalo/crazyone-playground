// Mock blog posts data
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  coverImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-design-systems-that-scale",
    title: "Building Design Systems That Scale",
    excerpt: "Learn how to create a design system that grows with your organization while maintaining consistency and developer experience.",
    content: `
Design systems are the backbone of modern product development. They provide a shared language between designers and developers, ensure consistency across products, and dramatically speed up development time.

## Why Design Systems Matter

A well-built design system can reduce development time by up to 50% and ensure brand consistency across all touchpoints. But building one that scales is no small feat.

### Key Principles

1. **Start with foundations**: Colors, typography, and spacing should be defined first
2. **Component-driven architecture**: Build small, compose big
3. **Documentation is crucial**: If it's not documented, it doesn't exist
4. **Versioning matters**: Semantic versioning helps teams adopt changes safely

## The @crazyone Approach

Our design system takes a unique approach by offering 26 distinct themes, each with its own personality while sharing the same component API. This means you can switch themes without changing any code.

### Benefits

- **Consistency**: Same components, different looks
- **Flexibility**: Choose the theme that fits your brand
- **Maintenance**: One codebase, many outputs
    `,
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      role: "Design Systems Lead"
    },
    category: "Design Systems",
    tags: ["design", "systems", "scale", "architecture"],
    publishedAt: "2025-01-15",
    readingTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
  },
  {
    id: "2",
    slug: "the-art-of-theming-react-components",
    title: "The Art of Theming React Components",
    excerpt: "Explore advanced techniques for creating themeable React components using CSS variables and design tokens.",
    content: `
Theming is more than just changing colors. It's about creating a cohesive visual experience that adapts to different contexts while maintaining usability and accessibility.

## CSS Variables: The Foundation

CSS custom properties (variables) are the secret sauce behind modern theming systems. They allow real-time theme switching without JavaScript overhead.

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
}

[data-theme="dark"] {
  --primary: 217.2 91.2% 59.8%;
  --background: 222.2 84% 4.9%;
}
\`\`\`

## Design Tokens

Design tokens are the atoms of your design system. They represent design decisions as data:

- **Colors**: Primary, secondary, accent
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent padding and margins
- **Animation**: Timing and easing functions
    `,
    author: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      role: "Senior Frontend Engineer"
    },
    category: "Development",
    tags: ["react", "theming", "css", "tokens"],
    publishedAt: "2025-01-10",
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
  },
  {
    id: "3",
    slug: "accessibility-first-design",
    title: "Accessibility-First Design: Why It Matters",
    excerpt: "Discover why building accessible interfaces from the start leads to better products for everyone.",
    content: `
Accessibility isn't a feature—it's a requirement. When we design with accessibility in mind from the beginning, we create better experiences for all users.

## The Business Case

- **Larger audience**: 15% of the world's population has some form of disability
- **Legal compliance**: Many countries require digital accessibility
- **SEO benefits**: Accessible sites often rank higher
- **Better UX**: Accessible design is usually better design

## Practical Tips

1. Use semantic HTML elements
2. Ensure sufficient color contrast (4.5:1 for text)
3. Provide keyboard navigation
4. Include proper ARIA labels
5. Test with screen readers
    `,
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=elena",
      role: "Accessibility Specialist"
    },
    category: "Accessibility",
    tags: ["a11y", "accessibility", "inclusive", "design"],
    publishedAt: "2025-01-05",
    readingTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
  },
  {
    id: "4",
    slug: "animation-in-ui-design",
    title: "Meaningful Animation in UI Design",
    excerpt: "Learn how to use animation to enhance user experience without sacrificing performance or accessibility.",
    content: `
Animation is a powerful tool in UI design. When used correctly, it can guide users, provide feedback, and create delightful experiences.

## Principles of UI Animation

### 1. Purpose Over Polish
Every animation should serve a purpose:
- Provide feedback (button clicks)
- Guide attention (loading states)
- Show relationships (expanding panels)

### 2. Performance Matters
- Use CSS transforms and opacity
- Avoid layout-triggering properties
- Consider reduced motion preferences

### 3. Timing Is Everything
- Fast interactions: 100-200ms
- Transitions: 200-300ms
- Complex animations: 300-500ms
    `,
    author: {
      name: "James Park",
      avatar: "https://i.pravatar.cc/150?u=james",
      role: "Motion Designer"
    },
    category: "Animation",
    tags: ["animation", "motion", "ux", "performance"],
    publishedAt: "2024-12-28",
    readingTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
  },
  {
    id: "5",
    slug: "monorepo-architecture-for-design-systems",
    title: "Monorepo Architecture for Design Systems",
    excerpt: "How we structured our design system monorepo to support 26 themes with shared infrastructure.",
    content: `
Managing multiple theme packages in a design system requires careful architecture. Here's how we built ours.

## Why Monorepo?

- **Shared dependencies**: One version of React, one config
- **Atomic commits**: Change component + test + docs together
- **Simplified CI/CD**: One pipeline rules them all
- **Better DX**: Easy cross-package imports

## Our Structure

\`\`\`
packages/
├── ui-core/           # Shared utilities
├── ui-brutalist/      # Theme packages
├── ui-vaporwave/
└── ...20 more themes
\`\`\`

## Tools We Use

- **Turborepo**: Build orchestration
- **Changesets**: Version management
- **TypeScript**: Type safety across packages
- **Tailwind**: Consistent styling foundation
    `,
    author: {
      name: "Alex Kim",
      avatar: "https://i.pravatar.cc/150?u=alex",
      role: "Platform Engineer"
    },
    category: "Architecture",
    tags: ["monorepo", "architecture", "turborepo", "dx"],
    publishedAt: "2024-12-20",
    readingTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
  },
  {
    id: "6",
    slug: "color-theory-for-developers",
    title: "Color Theory for Developers",
    excerpt: "A practical guide to color theory that every frontend developer should know.",
    content: `
Understanding color theory helps you make better design decisions and communicate more effectively with designers.

## HSL: Your New Best Friend

HSL (Hue, Saturation, Lightness) is more intuitive than RGB or HEX:
- **Hue**: The color (0-360 degrees)
- **Saturation**: How vivid (0-100%)
- **Lightness**: How bright (0-100%)

## Creating Color Palettes

### Complementary
Colors opposite on the wheel. High contrast, bold.

### Analogous
Adjacent colors. Harmonious, cohesive.

### Triadic
Three evenly spaced colors. Vibrant, balanced.

## Practical Application

\`\`\`css
/* Primary palette using HSL */
--primary-50: hsl(221, 83%, 95%);
--primary-500: hsl(221, 83%, 53%);
--primary-900: hsl(221, 83%, 20%);
\`\`\`
    `,
    author: {
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/150?u=priya",
      role: "UI Engineer"
    },
    category: "Design",
    tags: ["color", "theory", "css", "design"],
    publishedAt: "2024-12-15",
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80"
  },
];

export const blogCategories = [
  "All",
  "Design Systems",
  "Development",
  "Accessibility",
  "Animation",
  "Architecture",
  "Design",
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}
