import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
            {
              "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm": variant === "primary",
              "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700": variant === "secondary",
              "text-slate-400 hover:bg-slate-800 hover:text-slate-200": variant === "ghost",
            },
            {
              "text-xs px-3 py-1.5": size === "sm",
              "text-sm px-4 py-2": size === "md",
              "text-base px-5 py-2.5": size === "lg",
            }
          ),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
