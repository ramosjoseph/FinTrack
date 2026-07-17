import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

export default function DashboardCard({
  title,
  children,
}: DashboardCardProps) {
  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      {children}
    </Card>
  );
}