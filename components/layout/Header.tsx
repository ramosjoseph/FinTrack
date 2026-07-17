import { Bell } from "lucide-react";

import UserDropdown from "./user/UserDropdown";

interface Props {
  fullName?: string | null;
  email?: string | null;
}

export default function Header({
  fullName,
  email,
}: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back,
          {fullName ? ` ${fullName}` : "!"}
        </h1>

        <p className="text-sm text-muted-foreground">
          Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg border p-2 transition-colors hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <UserDropdown
          fullName={fullName}
          email={email}
        />
      </div>
    </header>
  );
}