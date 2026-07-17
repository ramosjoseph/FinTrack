import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import {
  TrendingUp,
  Receipt,
  Target,
  Heart,
} from "lucide-react";

import Logo from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

        <div className="relative z-10">
          <Logo light />

          <div className="mt-10 max-w-xl">
            <h1 className="text-5xl font-bold leading-tight">
              Take control of
              your finances.
            </h1>

            <p className="mt-6 text-lg text-emerald-100">
              Track expenses,
              forecast salary,
              manage savings goals,
              and stay financially
              organized with FinTrack.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-5">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5" />

              <h3 className="font-semibold">
                Salary Forecast
              </h3>
            </div>

            <p className="mt-2 text-sm text-emerald-100">
              Estimate earnings
              using attendance
              and payroll settings.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5" />

              <h3 className="font-semibold">
                Expense Tracking
              </h3>
            </div>

            <p className="mt-2 text-sm text-emerald-100">
              Monitor daily
              spending and stay
              within budget.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5" />

              <h3 className="font-semibold">
                Savings Goals
              </h3>
            </div>

            <p className="mt-2 text-sm text-emerald-100">
              Build better habits
              and achieve your
              financial targets.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5" />

              <h3 className="font-semibold">
                Wishlist Planner
              </h3>
            </div>

            <p className="mt-2 text-sm text-emerald-100">
              Plan future purchases
              without harming your
              budget.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        {children}
      </section>
    </main>
  );
}