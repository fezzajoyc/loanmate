"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, fmtMoney, pick } from "./calc-ui";
import { mortgagePayment } from "../_lib/finance";

/**
 * LoanMate generic loan engine over finance.mortgagePayment() — the same
 * standard amortization formula as the mortgage tool, framed for any-purpose
 * borrowing (auto, personal, student, debt consolidation). No housing fields.
 * props: none.
 */

const CURRENCIES: Record<string, { symbol: string; frac: number }> = {
  USD: { symbol: "$", frac: 2 },
  EUR: { symbol: "€", frac: 2 },
  GBP: { symbol: "£", frac: 2 },
  CNY: { symbol: "¥", frac: 2 },
  JPY: { symbol: "¥", frac: 0 },
  BRL: { symbol: "R$", frac: 2 },
};

const S = {
  amount: { en: "Loan amount", zh: "借款金额", ja: "借入金額", es: "Importe del préstamo", pt: "Valor do empréstimo" },
  rate: { en: "Interest rate (% / year)", zh: "年利率(%)", ja: "年利(%)", es: "Interés anual (%)", pt: "Juros anuais (%)" },
  term: { en: "Term", zh: "借款期限", ja: "返済期間", es: "Plazo", pt: "Prazo" },
  years: { en: "years", zh: "年", ja: "年", es: "años", pt: "anos" },
  months: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses" },
  payment: { en: "Monthly payment", zh: "每月还款", ja: "月々の返済額", es: "Cuota mensual", pt: "Parcela mensal" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros" },
  paid: { en: "Total repaid", zh: "还款总额", ja: "返済総額", es: "Total pagado", pt: "Total pago" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda" },
  note: {
    en: "Payment = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) with r = rate ÷ 1200 and n = months — the standard reducing-balance formula lenders quote for fixed-rate loans. The result only covers principal and interest: fees, origination charges and any insurance are extra.",
    zh: "每月还款 = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),r = 年利率 ÷ 1200,n = 期数——这是固定利率贷款通用的等额本息公式。结果只含本金和利息:手续费、服务费和各类保险费不在其中。",
    ja: "月々の返済額 = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。r は月利(年利 ÷ 1200)、n は返済回数です。固定金利ローンで広く使われる元利均等の式です。結果には元本と利息のみが含まれ、手数料や保険料は別途かかります。",
    es: "La cuota = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), con r = tipo ÷ 1200 y n = meses: la fórmula de saldo decreciente estándar para préstamos a tipo fijo. El resultado cubre solo capital e interés: comisiones y seguros van aparte.",
    pt: "A parcela = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), com r = taxa ÷ 1200 e n = meses — a fórmula de saldo decrescente padrão para empréstimos a taxa fixa. O resultado cobre só principal e juros: tarifas e seguros ficam de fora.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineLoan() {
  const { locale } = useI18n();
  const [amount, setAmount] = useState("25000");
  const [rate, setRate] = useState("8.5");
  const [term, setTerm] = useState("5");
  const [unit, setUnit] = useState("years");
  const [currency, setCurrency] = useState("USD");

  const p = num(amount);
  const annual = num(rate);
  const t = num(term);
  const nMonths = Number.isFinite(t) ? Math.round(unit === "years" ? t * 12 : t) : NaN;
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const payment = useMemo(() => mortgagePayment(p, annual, Number.isFinite(nMonths) ? nMonths / 12 : NaN), [p, annual, nMonths]);

  const totalPaid = Number.isFinite(payment) && Number.isFinite(nMonths) ? payment * nMonths : NaN;
  const totalInterest = Number.isFinite(totalPaid) ? totalPaid - p : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.amount)}>
          <NumIn value={amount} onChange={setAmount} aria="loan amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual interest rate" />
        </Field>
        <Field label={pick(locale, S.term)}>
          <div className="flex gap-2">
            <NumIn value={term} onChange={setTerm} aria="loan term" className="min-w-0 flex-1" />
            <Sel value={unit} onChange={setUnit} aria="term unit">
              <option value="years">{pick(locale, S.years)}</option>
              <option value="months">{pick(locale, S.months)}</option>
            </Sel>
          </div>
        </Field>
        <Field label={pick(locale, S.currency)}>
          <Sel value={currency} onChange={setCurrency} aria="currency">
            <option value="USD">USD — $</option>
            <option value="EUR">EUR — €</option>
            <option value="GBP">GBP — £</option>
            <option value="CNY">CNY — ¥</option>
            <option value="JPY">JPY — ¥</option>
            <option value="BRL">BRL — R$</option>
          </Sel>
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          cols="sm:grid-cols-3"
          items={[
            { label: pick(locale, S.payment), value: money(payment), tone: "accent" },
            { label: pick(locale, S.interest), value: money(totalInterest), tone: "bad" },
            { label: pick(locale, S.paid), value: money(totalPaid), tone: "good" },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
