import "./globals.css";
import React from "react";

export const metadata = {
  title: "DriftGuard Dashboard",
  description: "Cursor-native design drift detection and auto-patching dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#030712] text-slate-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
