"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { mortgage } from "../_lib/finance";

/**
 * LoanMate mortgage engine over finance.mortgage(): monthly P&I from the
 * standard amortization formula, PITI once yearly property tax, insurance
 * (per year) and HOA (per month) are filled in, plus a yearly schedule.
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
  price: { en: "Home price", zh: "房屋总价", ja: "住宅価格", es: "Precio de la vivienda", pt: "Preço do imóvel" },
  down: { en: "Down payment", zh: "首付", ja: "頭金", es: "Entrada", pt: "Entrada" },
  amountWord: { en: "amount", zh: "金额", ja: "金額", es: "importe", pt: "valor" },
  rate: { en: "Interest rate (% / year)", zh: "年利率(%)", ja: "年利(%)", es: "Interés anual (%)", pt: "Juros anuais (%)" },
  term: { en: "Loan term (years)", zh: "贷款年限", ja: "返済期間(年)", es: "Plazo (años)", pt: "Prazo (anos)" },
  tax: { en: "Property tax / year", zh: "房产税 / 年", ja: "固定資産税 / 年", es: "Impuesto anual", pt: "IPTU / ano" },
  insurance: { en: "Home insurance / year", zh: "房屋保险 / 年", ja: "火災保険 / 年", es: "Seguro / año", pt: "Seguro / ano" },
  hoa: { en: "HOA / month", zh: "物业费 / 月", ja: "管理費 / 月", es: "Comunidad / mes", pt: "Condomínio / mês" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda" },
  monthlyPI: { en: "Monthly principal & interest", zh: "月供(本息)", ja: "月返済額(元利)", es: "Cuota (capital e interés)", pt: "Parcela (principal + juros)" },
  piti: { en: "All-in monthly (PITI)", zh: "每月总支出(PITI)", ja: "月間合計(PITI)", es: "Total mensual (PITI)", pt: "Total mensal (PITI)" },
  loan: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor financiado" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano" },
  thPrincipal: { en: "Principal", zh: "本金", ja: "元本", es: "Capital", pt: "Principal" },
  thInterest: { en: "Interest", zh: "利息", ja: "利息", es: "Intereses", pt: "Juros" },
  thBalance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo" },
  schedule: { en: "Year-by-year payoff schedule", zh: "逐年还款计划", ja: "年ごとの返済計画", es: "Calendario de amortización", pt: "Cronograma de amortização" },
  note: {
    en: "Payment = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) with L = price − down payment, r = rate ÷ 12 ÷ 100 and n = months. PITI adds each year's tax and insurance divided by 12, plus HOA as entered. The rate is whatever you type in — compare offers before you sign.",
    zh: "月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L 为贷款额(房价 − 首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为还款月数。PITI 把房产税、保险按年 ÷ 12 摊进月供,物业费按月直接计入。利率以你填的数字为准,签约前请多家比价。",
    ja: "返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は返済回数です。PITI は固定資産税と保険を 12 で割って上乗せし、管理費は入力した額をそのまま足します。金利は入力値そのままです。契約前に必ず複数の金融機関で比較してください。",
    es: "La cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), con L = precio − entrada, r = tipo ÷ 12 ÷ 100 y n = meses. El PITI añade el impuesto y el seguro anuales divididos por 12, más la cuota de comunidad tal cual. El tipo es el que tú escribas: compara ofertas antes de firmar.",
    pt: "A parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), com L = preço − entrada, r = taxa ÷ 12 ÷ 100 e n = meses. O PITI soma IPTU e seguro anuais divididos por 12, mais o condomínio informado. A taxa é a que você digitar: compare ofertas antes de assinar.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineMortgage() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("300000");
  const [down, setDown] = useState("20");
  const [downMode, setDownMode] = useState("percent");
  const [rate, setRate] = useState("6");
  const [term, setTerm] = useState("30");
  const [tax, setTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");
  const [currency, setCurrency] = useState("USD");

  const p = num(price);
  const d = num(down);
  const annual = num(rate);
  const years = num(term);
  const taxY = num(tax);
  const insY = num(insurance);
  const hoaM = num(hoa);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const downAmount = downMode === "percent" ? (p * d) / 100 : d;
  const loan = p - downAmount;

  const res = useMemo(() => mortgage(loan, annual, years), [loan, annual, years]);

  const extrasOK = [taxY, insY, hoaM].every((v) => !Number.isFinite(v) || v >= 0);
  const extras =
    (Number.isFinite(taxY) ? taxY : 0) / 12 +
    (Number.isFinite(insY) ? insY : 0) / 12 +
    (Number.isFinite(hoaM) ? hoaM : 0);
  const piti = Number.isFinite(res.monthlyPI) && extrasOK ? res.monthlyPI + extras : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="home price" />
        </Field>
        <Field label={pick(locale, S.down)}>
          <div className="flex gap-2">
            <NumIn value={down} onChange={setDown} aria="down payment" className="min-w-0 flex-1" />
            <Sel value={downMode} onChange={setDownMode} aria="down payment mode">
              <option value="percent">%</option>
              <option value="amount">{pick(locale, S.amountWord)}</option>
            </Sel>
          </div>
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual interest rate" />
        </Field>
        <Field label={pick(locale, S.term)}>
          <NumIn value={term} onChange={setTerm} aria="loan term in years" />
        </Field>
        <Field label={pick(locale, S.tax)}>
          <NumIn value={tax} onChange={setTax} aria="property tax per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.insurance)}>
          <NumIn value={insurance} onChange={setInsurance} aria="home insurance per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.hoa)}>
          <NumIn value={hoa} onChange={setHoa} aria="HOA per month" placeholder="0" />
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
          items={[
            { label: pick(locale, S.monthlyPI), value: money(res.monthlyPI), tone: "accent" },
            { label: pick(locale, S.piti), value: money(piti), tone: "good" },
            { label: pick(locale, S.loan), value: money(loan) },
            { label: pick(locale, S.interest), value: money(res.totalInterest) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.note)}</Note>
      </div>

      {res.schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.thPrincipal), pick(locale, S.thInterest), pick(locale, S.thBalance)]}
            rows={res.schedule.map((row) => [row.year, money(row.principal), money(row.interest), money(row.balance)])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
