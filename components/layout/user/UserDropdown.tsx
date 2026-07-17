"use client";

import Link from "next/link";

import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { logoutAction } from "@/features/auth/actions/logout";

interface Props {
  fullName?: string | null;
  email?: string | null;
}

export default function UserDropdown({
  fullName,
  email,
}: Props) {
  const initials =
    fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "FT";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open user menu"
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Avatar className="cursor-pointer transition-opacity hover:opacity-90">
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="font-semibold">
              {fullName ??
                "FinTrack User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <form
          action={logoutAction}
          className="w-full"
        >
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 focus:outline-none"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}