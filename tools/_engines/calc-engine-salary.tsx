"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, fmt, fmtMoney, pick } from "./calc-ui";
import { hourlyToSalary, salaryBreakdown } from "../_lib/finance";

/**
 * LoanMate shared engine for the salary ↔ hourly pair.
 * props.mode = "salary2hourly" | "hourly2salary".
 * Salary mode: hourly = salary ÷ (hours × weeks); unpaid days off shrink the
 * working year by 1/5 week each and the adjusted hourly spreads the same
 * salary over the hours actually worked. Hourly mode multiplies back up.
 * All amounts are gross.
 */

const S = {
  salary: { en: "Annual salary", zh: "年薪", ja: "年収", es: "Salario anual", pt: "Salário anual" },
  hourlyRate: { en: "Hourly rate", zh: "时薪", ja: "時給", es: "Pago por hora", pt: "Valor por hora" },
  hoursWeek: { en: "Hours per week", zh: "每周工时", ja: "週労働時間", es: "Horas por semana", pt: "Horas por semana" },
  weeksYear: { en: "Weeks per year", zh: "每年周数", ja: "年間週数", es: "Semanas por año", pt: "Semanas por ano" },
  unpaid: { en: "Unpaid days off / year", zh: "每年无薪假天数", ja: "無給休暇日数 / 年", es: "Días sin sueldo / año", pt: "Dias não pagos / ano" },
  hourly: { en: "Per hour", zh: "时薪", ja: "時給", es: "Por hora", pt: "Por hora" },
  daily: { en: "Per day", zh: "日薪", ja: "日給", es: "Por día", pt: "Por dia" },
  weekly: { en: "Per week", zh: "周薪", ja: "週給", es: "Por semana", pt: "Por semana" },
  biweekly: { en: "Every 2 weeks", zh: "双周薪", ja: "2週間ごと", es: "Quincenal", pt: "Quinzenal" },
  monthly: { en: "Per month", zh: "月薪", ja: "月給", es: "Por mes", pt: "Por mês" },
  annual: { en: "Per year", zh: "年薪", ja: "年額", es: "Por año", pt: "Por ano" },
  adjusted: { en: "Hourly, unpaid days counted", zh: "扣无薪假后的时薪", ja: "無給休暇込みの時給", es: "Hora con días sin sueldo", pt: "Hora com dias não pagos" },
  noteSalary: {
    en: "Hourly = salary ÷ (hours per week × weeks per year); daily assumes a 5-day week. A 52,000 salary at 40 h/week over 52 weeks works out to exactly 25.00 an hour.",
    zh: "时薪 = 年薪 ÷(每周工时 × 每年周数),日薪按每周 5 个工作日折算。比如年薪 52,000、每周 40 小时、做满 52 周,时薪正好是 25.00。",
    ja: "時給 = 年収 ÷(週労働時間 × 年間週数)。日給は週 5 日換算です。年収 52,000・週 40 時間・52 週なら、時給はちょうど 25.00 になります。",
    es: "Hora = salario ÷ (horas por semana × semanas por año); el día asume una semana de 5 días. Un salario de 52.000 a 40 h/semana durante 52 semanas da exactamente 25,00 por hora.",
    pt: "Hora = salário ÷ (horas por semana × semanas por ano); o dia assume uma semana de 5 dias. Um salário de 52.000 a 40 h/semana por 52 semanas dá exatamente 25,00 por hora.",
  },
  noteHourly: {
    en: "Salary = hourly rate × hours per week × weeks per year; daily assumes a 5-day week. 25.00 an hour at 40 h/week over 52 weeks adds up to exactly 52,000 a year.",
    zh: "年薪 = 时薪 × 每周工时 × 每年周数,日薪按每周 5 个工作日折算。比如时薪 25.00、每周 40 小时、做满 52 周,年薪正好是 52,000。",
    ja: "年収 = 時給 × 週労働時間 × 年間週数。日給は週 5 日換算です。時給 25.00・週 40 時間・52 週なら、年額はちょうど 52,000 になります。",
    es: "Salario = tarifa × horas por semana × semanas por año; el día asume una semana de 5 días. 25,00 por hora a 40 h/semana durante 52 semanas suman exactamente 52.000 al año.",
    pt: "Salário = valor por hora × horas por semana × semanas por ano; o dia assume uma semana de 5 dias. 25,00 por hora a 40 h/semana por 52 semanas somam exatamente 52.000 por ano.",
  },
  noteUnpaid: {
    en: "Unpaid days off shorten the working year at 5 working days per week: 10 days ≈ 2 weeks. The adjusted hourly divides the same salary over the hours you actually work, so more unpaid time means a higher true hourly rate. All figures are gross pay — taxes and deductions not included.",
    zh: "无薪假按每周 5 个工作日折算,会缩短工作年:10 天 ≈ 2 周。「扣无薪假后的时薪」把同一年薪摊到实际工作的小时上,无薪假越多,真实时薪越高。所有金额均为税前,不含税费和扣款。",
    ja: "無給休暇は週 5 勤務換算で労働年を縮めます:10 日 ≈ 2 週間。「無給休暇込みの時給」は同じ年収を実際に働いた時間で割ったもので、休暇が多いほど実質時給は高くなります。金額はすべて税引前で、税・控除は含みません。",
    es: "Los días sin sueldo acortan el año laboral a 5 días laborables por semana: 10 días ≈ 2 semanas. La hora ajustada reparte el mismo salario entre las horas realmente trabajadas, así que más días sin sueldo significa una hora real más alta. Todas las cifras son brutas, sin impuestos ni deducciones.",
    pt: "Os dias não pagos encurtam o ano de trabalho à base de 5 dias úteis por semana: 10 dias ≈ 2 semanas. O valor por hora ajustado distribui o mesmo salário pelas horas realmente trabalhadas, então mais folga não paga significa uma hora real mais alta. Todos os valores são brutos, sem impostos ou descontos.",
  },
  weeksShrinkA: {
    en: "With the unpaid days you entered, the working year is about ",
    zh: "按你填的无薪假天数,实际工作年约为 ",
    ja: "入力した無給休暇日数では、実労働年は約 ",
    es: "Con los días sin sueldo indicados, el año laboral es de unas ",
    pt: "Com os dias não pagos informados, o ano de trabalho é de cerca de ",
  },
  weeksShrinkB: { en: " weeks.", zh: " 周。", ja: " 週です。", es: " semanas.", pt: " semanas." },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineSalary({ mode }: { mode: string }) {
  const { locale } = useI18n();
  const toHourly = mode === "salary2hourly";
  const [salary, setSalary] = useState("52000");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hours, setHours] = useState("40");
  const [weeks, setWeeks] = useState("52");
  const [unpaid, setUnpaid] = useState("");

  const h = num(hours);
  const w = num(weeks);
  const symbol = "$";

  const sb = useMemo(
    () => salaryBreakdown(num(salary), h, w, unpaid.trim() === "" ? 0 : num(unpaid)),
    [salary, h, w, unpaid],
  );
  const hs = useMemo(() => hourlyToSalary(num(hourlyRate), h, w), [hourlyRate, h, w]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {toHourly ? (
          <>
            <Field label={pick(locale, S.salary)}>
              <NumIn value={salary} onChange={setSalary} aria="annual salary" />
            </Field>
            <Field label={pick(locale, S.unpaid)}>
              <NumIn value={unpaid} onChange={setUnpaid} aria="unpaid days off per year" placeholder="0" />
            </Field>
          </>
        ) : (
          <Field label={pick(locale, S.hourlyRate)}>
            <NumIn value={hourlyRate} onChange={setHourlyRate} aria="hourly rate" />
          </Field>
        )}
        <Field label={pick(locale, S.hoursWeek)}>
          <NumIn value={hours} onChange={setHours} aria="hours per week" />
        </Field>
        <Field label={pick(locale, S.weeksYear)}>
          <NumIn value={weeks} onChange={setWeeks} aria="weeks per year" />
        </Field>
      </div>

      <div className="mt-5">
        {toHourly ? (
          <Stats
            items={[
              { label: pick(locale, S.hourly), value: fmtMoney(sb.hourly, locale, symbol), tone: "accent" },
              { label: pick(locale, S.adjusted), value: fmtMoney(sb.adjustedHourly, locale, symbol), tone: "good" },
              { label: pick(locale, S.daily), value: fmtMoney(sb.daily, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(sb.weekly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(sb.biweekly, locale, symbol) },
              { label: pick(locale, S.monthly), value: fmtMoney(sb.monthly, locale, symbol) },
            ]}
          />
        ) : (
          <Stats
            items={[
              { label: pick(locale, S.annual), value: fmtMoney(hs.annual, locale, symbol), tone: "accent" },
              { label: pick(locale, S.monthly), value: fmtMoney(hs.monthly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(hs.biweekly, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(hs.weekly, locale, symbol) },
              { label: pick(locale, S.daily), value: fmtMoney(hs.daily, locale, symbol) },
            ]}
          />
        )}
      </div>

      <div className="mt-3 space-y-2">
        <Note>{toHourly ? pick(locale, S.noteSalary) : pick(locale, S.noteHourly)}</Note>
        {toHourly && Number.isFinite(sb.effectiveWeeks) && sb.effectiveWeeks < w && (
          <Note>
            {pick(locale, S.weeksShrinkA)}
            {fmt(sb.effectiveWeeks, locale, 1)}
            {pick(locale, S.weeksShrinkB)}
          </Note>
        )}
        <Note>{pick(locale, S.noteUnpaid)}</Note>
      </div>
    </ToolPanel>
  );
}
