import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface AppShellProps {
  header: ReactNode;
  children: ReactNode;
}

export default function AppShell({
  header,
  children,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {header}

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}