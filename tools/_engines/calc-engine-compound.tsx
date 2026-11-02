"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { compound, type Freq } from "../_lib/finance";

/**
 * LoanMate compound-interest engine over finance.compound(). The balance
 * recursion is FV ← (FV + contribution) × (1 + r): each contribution is
 * deposited at the START of its period (annuity-due) and earns interest from
 * that period on. props: none.
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
  principal: { en: "Starting amount", zh: "初始本金", ja: "元本", es: "Capital inicial", pt: "Valor inicial" },
  contribution: { en: "Monthly contribution", zh: "每月追加投入", ja: "毎月の追加額", es: "Aporte mensual", pt: "Aporte mensal" },
  rate: { en: "Annual return (%)", zh: "年收益率(%)", ja: "年利回り(%)", es: "Rendimiento anual (%)", pt: "Rentabilidade anual (%)" },
  years: { en: "Years", zh: "年数", ja: "年数", es: "Años", pt: "Anos" },
  freq: { en: "Compounding", zh: "复利频率", ja: "複利間隔", es: "Capitalización", pt: "Capitalização" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda" },
  balance: { en: "Final balance", zh: "期末金额", ja: "最終金額", es: "Saldo final", pt: "Saldo final" },
  contributed: { en: "You put in", zh: "累计投入", ja: "投入額合計", es: "Total aportado", pt: "Total investido" },
  earned: { en: "Interest earned", zh: "利息收益", ja: "運用収益", es: "Intereses ganados", pt: "Juros ganhos" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano" },
  thPutIn: { en: "Put in", zh: "累计投入", ja: "投入累計", es: "Aportado", pt: "Investido" },
  thInterest: { en: "Interest", zh: "利息", ja: "利息", es: "Intereses", pt: "Juros" },
  thBalance: { en: "Balance", zh: "余额", ja: "残高", es: "Saldo", pt: "Saldo" },
  table: { en: "Growth, year by year", zh: "逐年增长", ja: "年ごとの推移", es: "Crecimiento año a año", pt: "Crescimento ano a ano" },
  note: {
    en: "Each period the balance updates as FV ← (FV + contribution) × (1 + r), where r = annual rate ÷ periods per year (12 / 4 / 1). Contributions count from the start of each period, so they earn interest that same period — slightly more optimistic than end-of-period deposits.",
    zh: "每期余额按 FV ← (FV + 投入) × (1 + r) 递推,r = 年利率 ÷ 每年期数(12 / 4 / 1)。投入按每期期初计入,当期就开始生息,结果比期末存入的口径略高一点。",
    ja: "各期の残高は FV ← (FV + 追加額) × (1 + r) で更新します。r は年利 ÷ 年間の期数(12 / 4 / 1)です。追加額は各期の初めに計上され、その期から利息がつくため、期末扱いより少し有利な見積もりになります。",
    es: "En cada periodo el saldo se actualiza como FV ← (FV + aporte) × (1 + r), donde r = tasa anual ÷ periodos por año (12 / 4 / 1). Los aportes cuentan desde el inicio del periodo, así que generan intereses ese mismo periodo: un poco más optimista que depositar al final.",
    pt: "A cada período o saldo atualiza como FV ← (FV + aporte) × (1 + r), onde r = taxa anual ÷ períodos por ano (12 / 4 / 1). Os aportes contam desde o início do período e rendem já nesse período — um pouco mais otimista do que depósitos no fim.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineCompound() {
  const { locale } = useI18n();
  const [principal, setPrincipal] = useState("10000");
  const [contribution, setContribution] = useState("100");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState<Freq>("monthly");
  const [currency, setCurrency] = useState("USD");

  const p = num(principal);
  const c = num(contribution);
  const annual = num(rate);
  const y = num(years);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const { total, contributed, schedule } = useMemo(() => compound(p, c, annual, y, freq), [p, c, annual, y, freq]);

  const earned = Number.isFinite(total) ? total - contributed : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="starting amount" />
        </Field>
        <Field label={pick(locale, S.contribution)}>
          <NumIn value={contribution} onChange={setContribution} aria="monthly contribution" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual return" />
        </Field>
        <Field label={pick(locale, S.years)}>
          <NumIn value={years} onChange={setYears} aria="years" />
        </Field>
        <Field label={pick(locale, S.freq)}>
          <Sel value={freq} onChange={(v) => setFreq(v as Freq)} aria="compounding frequency">
            <option value="monthly">{pick(locale, { en: "Monthly", zh: "每月", ja: "毎月", es: "Mensual", pt: "Mensal" })}</option>
            <option value="quarterly">{pick(locale, { en: "Quarterly", zh: "每季度", ja: "四半期ごと", es: "Trimestral", pt: "Trimestral" })}</option>
            <option value="annually">{pick(locale, { en: "Annually", zh: "每年", ja: "毎年", es: "Anual", pt: "Anual" })}</option>
          </Sel>
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
            { label: pick(locale, S.balance), value: money(total), tone: "accent" },
            { label: pick(locale, S.contributed), value: money(contributed) },
            { label: pick(locale, S.earned), value: money(earned), tone: "good" },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.note)}</Note>
      </div>

      {schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.thPutIn), pick(locale, S.thInterest), pick(locale, S.thBalance)]}
            rows={schedule.map((row) => [row.year, money(row.contrib), money(row.interest), money(row.balance)])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
