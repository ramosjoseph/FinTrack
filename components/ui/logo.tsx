import Link from "next/link";

import {
  WalletCards,
} from "lucide-react";

interface LogoProps {
  href?: string;
  light?: boolean;
}

export default function Logo({
  href = "/",
  light = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3"
    >
      <div className="rounded-xl bg-primary p-2 text-primary-foreground shadow-sm">
        <WalletCards className="h-6 w-6" />
      </div>

      <div>
        <h2
          className={`text-lg font-bold ${
            light
              ? "text-white"
              : "text-foreground"
          }`}
        >
          FinTrack
        </h2>

        <p
          className={`text-xs ${
            light
              ? "text-emerald-100"
              : "text-muted-foreground"
          }`}
        >
          Personal Finance
        </p>
      </div>
    </Link>
  );
}