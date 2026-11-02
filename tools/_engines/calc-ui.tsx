"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";

/**
 * LoanMate calculator UI primitives. Engines own their strings (core-5 inline
 * via pick()); these pieces only handle layout, inputs and locale formatting.
 */

/** Intl locale per site locale, for all number formatting in the engines. */
export const INTL_LOCALES: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  es: "es-ES",
  pt: "pt-BR",
  fr: "fr-FR",
  de: "de-DE",
  ru: "ru-RU",
  it: "it-IT",
  tr: "tr-TR",
  ko: "ko-KR",
  ar: "ar-SA",
  hi: "hi-IN",
  id: "id-ID",
  vi: "vi-VN",
};

/** Read a string from an inline per-locale record, falling back to English. */
export function pick(locale: Locale, rec: Record<string, string>): string {
  return rec[locale] ?? rec.en;
}

/** Locale-aware number formatting; non-finite values render as an em dash. */
export function fmt(n: number, locale: Locale, maxFrac = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    maximumFractionDigits: maxFrac,
  }).format(n);
}

/** Money formatting with a plain symbol ($ prefixed, other symbols suffixed). */
export function fmtMoney(n: number, locale: Locale, symbol: string, maxFrac = 2): string {
  const s = fmt(n, locale, maxFrac);
  if (!Number.isFinite(n)) return s;
  return symbol === "$" ? `$${s}` : `${s} ${symbol}`;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[13px] font-medium text-[var(--color-sub)]">{label}</span>
      {children}
    </div>
  );
}

export function NumIn({
  value,
  onChange,
  aria,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`field bare mono ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={aria}
    />
  );
}

export function Sel({
  value,
  onChange,
  aria,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  children: ReactNode;
}) {
  return (
    <select className="field" value={value} onChange={(e) => onChange(e.target.value)} aria-label={aria}>
      {children}
    </select>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-[var(--color-sub)]">{children}</p>;
}

/** Grid of small label/value result cards, with optional color tones. */
export function Stats({
  items,
  cols = "sm:grid-cols-2",
}: {
  items: { label: string; value: string; tone?: "good" | "bad" | "accent" }[];
  cols?: string;
}) {
  const tone = (t?: string) =>
    t === "good"
      ? "text-[var(--color-good)]"
      : t === "bad"
        ? "text-[var(--color-bad)]"
        : t === "accent"
          ? "text-[var(--color-accent-strong)]"
          : "text-[var(--color-ink)]";
  return (
    <div className={`grid grid-cols-2 gap-3 ${cols}`}>
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border hairline px-3.5 py-3">
          <div className="text-[12.5px] font-medium text-[var(--color-sub)]">{it.label}</div>
          <div className={`mono mt-1 text-[17px] font-semibold leading-6 ${tone(it.tone)}`} aria-live="polite">
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Bordered, scrollable table shell (yearly schedules, scenario tables). */
export function TableBox({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border hairline">
      <div className="max-h-[26rem] overflow-y-auto">
        <table className="w-full text-[14px]">
          <thead className="sticky top-0 bg-[var(--color-card)]">
            <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
              {head.map((h, i) => (
                <th key={h} scope="col" className={`px-3.5 py-2 font-semibold ${i > 0 ? "text-right" : "text-left"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                {r.map((c, j) => (
                  <td key={j} className={`mono px-3.5 py-2 ${j > 0 ? "text-right text-[var(--color-sub)]" : "font-medium"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
