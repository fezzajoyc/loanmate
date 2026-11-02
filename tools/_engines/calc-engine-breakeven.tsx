"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { breakEven } from "../_lib/finance";

/**
 * LoanMate break-even engine over finance.breakEven(): the unit volume and
 * revenue that cover fixed costs, the contribution margin per unit, and profit
 * at 0.5× / 1× / 1.5× / 2× of break-even volume.
 * props: none.
 */

const S = {
  fixed: { en: "Fixed costs", zh: "固定成本", ja: "固定費", es: "Costos fijos", pt: "Custos fixos" },
  price: { en: "Price per unit", zh: "单价", ja: "販売価格 / 個", es: "Precio por unidad", pt: "Preço por unidade" },
  variable: { en: "Variable cost per unit", zh: "单位变动成本", ja: "変動費 / 個", es: "Costo variable por unidad", pt: "Custo variável por unidade" },
  units: { en: "Units to break even", zh: "保本销量", ja: "損益分岐点個数", es: "Unidades para equilibrar", pt: "Unidades para empatar" },
  revenue: { en: "Revenue to break even", zh: "保本收入", ja: "損益分岐点売上", es: "Ingresos para equilibrar", pt: "Receita para empatar" },
  margin: { en: "Margin per unit", zh: "单位毛利", ja: "限界利益 / 個", es: "Margen por unidad", pt: "Margem por unidade" },
  marginPct: { en: "Margin (% of price)", zh: "毛利率", ja: "マージン(%)", es: "Margen (% del precio)", pt: "Margem (% do preço)" },
  level: { en: "Volume", zh: "销量水平", ja: "販売水準", es: "Volumen", pt: "Volume" },
  thUnits: { en: "Units", zh: "销量", ja: "個数", es: "Unidades", pt: "Unidades" },
  thRevenue: { en: "Revenue", zh: "收入", ja: "売上", es: "Ingresos", pt: "Receita" },
  thProfit: { en: "Profit", zh: "利润", ja: "利益", es: "Beneficio", pt: "Lucro" },
  table: { en: "Profit at different volumes", zh: "不同销量下的利润", ja: "販売量別の利益", es: "Beneficio según volumen", pt: "Lucro em diferentes volumes" },
  formula: {
    en: "Units to break even = fixed costs ÷ (price − variable cost). Every sale puts that difference toward the fixed costs; once they are covered, the same difference is profit.",
    zh: "保本销量 = 固定成本 ÷(单价 − 单位变动成本)。每卖一件,这个差额就用来填固定成本;填平之后,同样的差额就是利润。",
    ja: "損益分岐点個数 = 固定費 ÷(販売価格 − 変動費)。1 個売るごとにその差額が固定費を埋め、埋まりきった後は同じ差額が利益になります。",
    es: "Unidades para equilibrar = costos fijos ÷ (precio − costo variable). Cada venta aporta esa diferencia a cubrir los costos fijos; una vez cubiertos, esa misma diferencia es beneficio.",
    pt: "Unidades para empatar = custos fixos ÷ (preço − custo variável). Cada venda usa essa diferença para cobrir os custos fixos; depois disso, a mesma diferença é lucro.",
  },
  never: {
    en: "With these inputs the price does not cover the variable cost, so no sales volume can break even. Cut the variable cost or raise the price.",
    zh: "按当前输入,单价还抵不上单位变动成本,卖多少都保不了本。要么压低变动成本,要么提高单价。",
    ja: "現在の入力では販売価格が変動費を下回っており、どれだけ売れても損益分岐点には届きません。変動費を下げるか、価格を上げてください。",
    es: "Con estos datos el precio no cubre el costo variable, así que ningún volumen llega al equilibrio. Baje el costo variable o suba el precio.",
    pt: "Com esses valores o preço não cobre o custo variável, então nenhum volume empata. Reduza o custo variável ou aumente o preço.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineBreakEven() {
  const { locale } = useI18n();
  const [fixed, setFixed] = useState("10000");
  const [price, setPrice] = useState("50");
  const [variable, setVariable] = useState("30");
  const symbol = "$";

  const res = useMemo(() => breakEven(num(fixed), num(price), num(variable)), [fixed, price, variable]);
  const impossible =
    !Number.isFinite(res.units) && num(fixed) >= 0 && num(price) > 0 && num(variable) >= 0;

  const scaleLabel = (scale: number, l: Locale) =>
    pick(l, {
      en: `${scale}× break-even`,
      zh: `${scale}× 保本点`,
      ja: `${scale}× 分岐点`,
      es: `${scale}× equilibrio`,
      pt: `${scale}× equilíbrio`,
    });

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.fixed)}>
          <NumIn value={fixed} onChange={setFixed} aria="fixed costs" />
        </Field>
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="price per unit" />
        </Field>
        <Field label={pick(locale, S.variable)}>
          <NumIn value={variable} onChange={setVariable} aria="variable cost per unit" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.units), value: fmt(res.units, locale, 1), tone: "accent" },
            { label: pick(locale, S.revenue), value: fmtMoney(res.revenue, locale, symbol), tone: "good" },
            { label: pick(locale, S.margin), value: fmtMoney(res.contributionMargin, locale, symbol) },
            { label: pick(locale, S.marginPct), value: Number.isFinite(res.marginPct) ? `${fmt(res.marginPct, locale, 1)}%` : "—" },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.formula)}</Note>
        {impossible && <p className="mt-2 text-[13px] leading-5 text-[var(--color-bad)]">{pick(locale, S.never)}</p>}
      </div>

      {res.points.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
          <TableBox
            head={[pick(locale, S.level), pick(locale, S.thUnits), pick(locale, S.thRevenue), pick(locale, S.thProfit)]}
            rows={res.points.map((pt) => [
              scaleLabel(pt.scale, locale),
              fmt(pt.units, locale, 1),
              fmtMoney(pt.revenue, locale, symbol),
              fmtMoney(pt.profit, locale, symbol),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
