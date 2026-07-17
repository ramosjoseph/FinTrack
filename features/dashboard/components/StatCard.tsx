import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  description?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
}: Props) {
  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          {icon}
        </div>
      </div>
    </Card>
  );
}