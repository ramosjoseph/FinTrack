import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinTrack",
    template: "%s | FinTrack",
  },

  description:
    "Smart Payroll & Personal Finance Forecasting",

  keywords: [
    "finance",
    "payroll",
    "salary forecasting",
    "expense tracking",
    "budgeting",
    "savings goals",
    "wishlist planner",
    "personal finance",
  ],

  applicationName: "FinTrack",

  authors: [
    {
      name: "Joseph William C. Ramos",
    },
  ],

  creator: "Joseph William C. Ramos",

  openGraph: {
    title: "FinTrack",
    description:
      "Smart Payroll & Personal Finance Forecasting",
    siteName: "FinTrack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}