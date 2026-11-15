import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹7,000 — Indian digit grouping. */
export function inr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
