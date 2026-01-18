import { NavLink, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Home,
  FileText,
  LayoutDashboard,
  Users,
  Mail,
  DollarSign,
} from "lucide-react";

const navItems = [
  { path: "", label: "Landing", icon: Home },
  { path: "/blog", label: "Blog", icon: FileText },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/about", label: "About", icon: Users },
  { path: "/contact", label: "Contact", icon: Mail },
  { path: "/pricing", label: "Pricing", icon: DollarSign },
];

export function ThemeNav() {
  const { themeId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/theme/${themeId}${item.path}`}
              end={item.path === ""}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
