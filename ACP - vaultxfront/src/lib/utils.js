// src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally combine Tailwind class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
