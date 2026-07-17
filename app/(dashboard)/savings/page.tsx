import SavingsSummary from "@/features/savings/components/SavingsSummary";
import SavingsStats from "@/features/savings/components/SavingsStats";
import SavingsMilestones from "@/features/savings/components/SavingsMilestones";
import SavingsForecast from "@/features/savings/components/SavingsForecast";
import SavingsProgressChart from "@/features/savings/components/SavingsProgressChart";
import CreateSavingsDialog from "@/features/savings/components/CreateSavingsDialog";

import { SavingsService } from "@/features/savings/services/savings.service";

export default async function SavingsPage() {
  const goals =
    await SavingsService.getGoals();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Savings Goals
          </h1>

          <p className="text-muted-foreground">
            Track your financial goals.
          </p>
        </div>

        <CreateSavingsDialog />
      </div>

      <SavingsStats goals={goals} />

      <SavingsMilestones goals={goals} />

      <SavingsForecast goals={goals} />

      <SavingsProgressChart goals={goals} />

      <SavingsSummary goals={goals} />
    </div>
  );
}