import {
  LayoutDashboard,
  CalendarDays,
  Wallet,
  Landmark,
  PiggyBank,
  Heart,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: CalendarDays,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: Wallet,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: Landmark,
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
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;