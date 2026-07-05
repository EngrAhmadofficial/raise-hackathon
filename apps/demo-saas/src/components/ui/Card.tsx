import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "bg-slate-900 border border-slate-800/80 rounded-xl shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
