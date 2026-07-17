"use client";

import Logo from "@/components/ui/logo";
import { navigation } from "@/constants/navigation";
import NavItem from "./navigation/NavItem";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 flex-col border-r bg-background">
      <div className="border-b p-6">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            {...item}
          />
        ))}
      </nav>
    </aside>
  );
}