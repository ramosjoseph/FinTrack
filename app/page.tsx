import Link from "next/link";

import {
  ArrowRight,
  Wallet,
  Target,
  TrendingUp,
  Receipt,
} from "lucide-react";

import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Smart Payroll & Personal Finance
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
          Financial Planning
          <span className="block text-emerald-600">
            Made Simple
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Manage payroll forecasts,
          expenses, savings goals,
          and wishlist planning from
          a single modern dashboard.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/register">
            <Button
              size="lg"
              className="h-12 px-8"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <TrendingUp className="h-10 w-10 text-emerald-600" />

            <h3 className="mt-4 font-semibold">
              Salary Forecasting
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Predict future income
              using payroll schedules,
              attendance, and work
              settings.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <Receipt className="h-10 w-10 text-blue-600" />

            <h3 className="mt-4 font-semibold">
              Expense Tracking
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Monitor spending habits,
              categorize expenses,
              and stay within budget.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <Target className="h-10 w-10 text-orange-600" />

            <h3 className="mt-4 font-semibold">
              Savings Goals
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Set financial targets
              and track your progress
              toward important goals.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <Wallet className="h-10 w-10 text-purple-600" />

            <h3 className="mt-4 font-semibold">
              Wishlist Planning
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Organize future purchases
              and determine when they
              fit your budget.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-sm text-muted-foreground">
            Built for employees,
            students, freelancers,
            and anyone seeking
            better financial visibility.
          </p>
        </div>
      </section>
    </main>
  );
}