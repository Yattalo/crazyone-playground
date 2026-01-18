import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { type ThemeId, getThemeById } from "../../config/themes";

interface DashboardPageProps {
  themeId: ThemeId;
}

const stats = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Active Users",
    value: "2,350",
    change: "+180",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Orders",
    value: "1,247",
    change: "-12.5%",
    trend: "down" as const,
    icon: ShoppingCart,
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up" as const,
    icon: Activity,
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Chen", email: "sarah@example.com", amount: "$250.00", status: "completed" },
  { id: "ORD-002", customer: "Marcus Williams", email: "marcus@example.com", amount: "$125.00", status: "pending" },
  { id: "ORD-003", customer: "Elena Rodriguez", email: "elena@example.com", amount: "$890.00", status: "completed" },
  { id: "ORD-004", customer: "James Park", email: "james@example.com", amount: "$45.00", status: "cancelled" },
  { id: "ORD-005", customer: "Priya Patel", email: "priya@example.com", amount: "$320.00", status: "completed" },
];

const navItems = [
  { icon: Activity, label: "Overview", active: true },
  { icon: ShoppingCart, label: "Orders", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: DollarSign, label: "Revenue", active: false },
];

export function DashboardPage({ themeId }: DashboardPageProps) {
  const theme = getThemeById(themeId);
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`hidden lg:flex flex-col border-r border-border bg-card transition-all ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme?.gradient} flex items-center justify-center`}
            >
              <Activity className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg">Dashboard</span>
            )}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:border-primary outline-none w-64"
                />
              </div>
              <button className="p-2 rounded-xl hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart Placeholder + Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Revenue Overview</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    Week
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-muted-foreground text-sm font-medium hover:bg-muted">
                    Month
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-muted-foreground text-sm font-medium hover:bg-muted">
                    Year
                  </button>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 95].map(
                  (height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                      className={`flex-1 rounded-t-lg bg-gradient-to-t ${theme?.gradient} opacity-80`}
                    />
                  )
                )}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (month) => (
                    <span key={month}>{month}</span>
                  )
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "New order received", time: "2 min ago", type: "order" },
                  { action: "User signed up", time: "15 min ago", type: "user" },
                  { action: "Payment processed", time: "1 hour ago", type: "payment" },
                  { action: "Review submitted", time: "3 hours ago", type: "review" },
                  { action: "Order shipped", time: "5 hours ago", type: "shipping" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-bold">Recent Orders</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-mono text-sm">{order.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 font-medium">{order.amount}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-500/10 text-green-600"
                              : order.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
