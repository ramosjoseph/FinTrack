import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function PayrollCard({
  title,
  description,
  children,
}: Props) {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-2xl shadow-xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </Card>
  );
}