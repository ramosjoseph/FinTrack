import { ReactNode } from "react";

interface ExpenseSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ExpenseSection({
  title,
  description,
  children,
}: ExpenseSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}