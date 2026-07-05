import "./globals.css";
import React from "react";

export const metadata = {
  title: "DriftGuard Demo SaaS",
  description: "A premium B2B SaaS demo application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-background text-slate-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
