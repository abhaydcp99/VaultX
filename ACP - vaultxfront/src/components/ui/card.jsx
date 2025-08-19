import * as React from "react";

/**
 * Wrapper Card component - outer box
 */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Header section of the Card
 */
export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-4 font-semibold text-xl ${className}`}>{children}</div>
  );
}

/**
 * Card Title
 */
export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-medium ${className}`}>{children}</h2>;
}

/**
 * Main content area inside the card
 */
export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

/**
 * Optional description/subtitle
 */
export function CardDescription({ children, className = "" }) {
  return (
    <p
      className={`text-sm text-muted-foreground dark:text-zinc-400 ${className}`}
    >
      {children}
    </p>
  );
}
