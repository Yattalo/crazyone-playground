import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import type { ThemeId } from "../../config/themes";

interface PageWrapperProps {
  children: ReactNode;
  theme: ThemeId;
  className?: string;
}

export function PageWrapper({ children, theme, className = "" }: PageWrapperProps) {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      data-theme={theme}
      className={`min-h-screen bg-background text-foreground ${className}`}
    >
      {children}
    </motion.div>
  );
}
