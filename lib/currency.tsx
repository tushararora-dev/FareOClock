"use client";

import { useEffect, useSyncExternalStore } from "react";

export type Currency = {
  code: string;
  symbol: string;
  /** INR -> currency multiplier. */
  rate: number;
  decimals: number;
};

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", rate: 1, decimals: 0 },
  { code: "USD", symbol: "$", rate: 1 / 86.2, decimals: 2 },
  { code: "EUR", symbol: "€", rate: 1 / 92.8, decimals: 2 },
  { code: "GBP", symbol: "£", rate: 1 / 108.2, decimals: 2 },
  { code: "AED", symbol: "AED ", rate: 1 / 23.5, decimals: 2 },
  { code: "SGD", symbol: "S$", rate: 1 / 63.6, decimals: 2 },
  { code: "MYR", symbol: "RM ", rate: 1 / 18.3, decimals: 2 },
  { code: "THB", symbol: "฿", rate: 1 / 2.44, decimals: 2 },
  { code: "JPY", symbol: "¥", rate: 1 / 0.571, decimals: 0 },
  { code: "AUD", symbol: "A$", rate: 1 / 55.6, decimals: 2 },
];

const STORAGE_KEY = "bb-currency-v3";
const DEFAULT = CURRENCIES[0]; // INR

let current: Currency = DEFAULT;
let hydrated = false;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

function loadSaved() {
  try {
    const code = window.localStorage.getItem(STORAGE_KEY);
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) current = found;
  } catch {
    // localStorage unavailable — keep the default.
  }
}

export function setCurrency(currency: Currency) {
  current = currency;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency.code);
  } catch {
    // ignore
  }
  emit();
}

/** Formats an INR amount in the active currency, e.g. 999 -> "$11.59". */
export function formatInrAmount(amountInr: number): string {
  const c = hydrated ? current : DEFAULT;
  const value = amountInr * c.rate;
  if (c.code === "INR") {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  }
  return `${c.symbol}${value.toFixed(c.decimals)}`;
}

/** Converts ₹ amounts inside copy ("a ₹40,000 flight") to the active currency. */
export function moneyText(text: string): string {
  return text.replace(/₹([\d,]+)/g, (_, raw) =>
    formatInrAmount(Number(raw.replace(/,/g, ""))),
  );
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => (hydrated ? current : DEFAULT);
const getServerSnapshot = () => DEFAULT;

/**
 * Active currency + formatter. Rendering stays on the server default (INR)
 * until the first client effect, so hydration never mismatches; the saved
 * choice is then loaded from localStorage and every consumer re-renders.
 */
export function useCurrency() {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    loadSaved();
    if (!hydrated) {
      hydrated = true;
      emit();
    }
  }, []);

  return { currency, setCurrency, money: formatInrAmount };
}
