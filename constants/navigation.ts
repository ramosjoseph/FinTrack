import {
  LayoutDashboard,
  Wallet,
  CalendarDays,
  Receipt,
  PiggyBank,
  Heart,
  TrendingUp,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: Wallet,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: CalendarDays,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    title: "Savings",
    href: "/savings",
    icon: PiggyBank,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Forecast",
    href: "/forecast",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];