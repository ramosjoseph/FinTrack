"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  icon: React.ElementType;
};

export default function NavItem({
  href,
  title,
  icon: Icon,
}: Props) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors",
        active
          ? "bg-emerald-600 text-white"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
}