import { z } from "zod";
import {
  breakEven, compound, hourlyToSalary, mortgage, mortgagePayment, salaryBreakdown,
} from "../tools/_lib/finance";

/**
 * LoanMate MCP 工具注册表:把 tools/_lib/finance.ts 的纯函数暴露为 AI 可执行工具。
 * 站上的同名工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const err = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true as const });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "mortgage_payment",
    title: "Mortgage payment (P&I / PITI)",
    description:
      "Monthly mortgage payment via the standard amortization formula M = L·r·(1+r)ⁿ / ((1+r)ⁿ − 1), with r = annual rate ÷ 1200 and n = months. Returns monthly P&I, all-in PITI (adds yearly property tax and insurance ÷ 12 plus monthly HOA), loan amount, total interest and a yearly amortization schedule.",
    schema: {
      home_price: z.number().positive().describe("total home price"),
      down_payment_pct: z.number().min(0).max(100).default(20).describe("down payment as % of price (e.g. 20)"),
      annual_rate_pct: z.number().min(0).describe("nominal annual interest rate in %"),
      years: z.number().positive().max(100).describe("loan term in years"),
      property_tax_yearly: z.number().min(0).default(0).describe("optional property tax per year"),
      home_insurance_yearly: z.number().min(0).default(0).describe("optional home insurance per year"),
      hoa_monthly: z.number().min(0).default(0).describe("optional HOA fee per month"),
    },
    run: (a) => {
      const loan = a.home_price * (1 - a.down_payment_pct / 100);
      const r = mortgage(loan, a.annual_rate_pct, a.years);
      if (!Number.isFinite(r.monthlyPI)) {
        return err("invalid input: loan amount (price − down payment) must be positive; rate ≥ 0 and term 1–100 years");
      }
      const extras = a.property_tax_yearly / 12 + a.home_insurance_yearly / 12 + a.hoa_monthly;
      return json({ ...r, loan_amount: loan, monthly_piti: r.monthlyPI + extras });
    },
  },
  {
    name: "compound_interest",
    title: "Compound interest with contributions",
    description:
      "Future value with regular contributions under annuity-due semantics: each period FV ← (FV + contribution) × (1 + r), r = annual rate ÷ periods per year, so contributions earn interest from the period they are deposited. Returns total, contributed, interest and a year-by-year schedule.",
    schema: {
      principal: z.number().min(0).describe("starting amount"),
      monthly_contribution: z.number().min(0).default(0).describe("amount added every month"),
      annual_rate_pct: z.number().min(0).describe("annual return in %"),
      years: z.number().positive().max(100),
      periods_per_year: z.union([z.literal(1), z.literal(4), z.literal(12)]).default(12),
    },
    run: (a) => {
      const freq = a.periods_per_year === 1 ? "annually" : a.periods_per_year === 4 ? "quarterly" : "monthly";
      const r = compound(a.principal, a.monthly_contribution, a.annual_rate_pct, a.years, freq);
      if (!Number.isFinite(r.total)) {
        return err("invalid input: values must be non-negative and years 1–100");
      }
      return json({ ...r, interest: r.total - r.contributed });
    },
  },
  {
    name: "loan_payment",
    title: "Loan payment (any purpose)",
    description:
      "Monthly payment for a fixed-rate loan (auto, personal, student, consolidation) via the standard reducing-balance formula P = A·r·(1+r)ⁿ / ((1+r)ⁿ − 1). Principal and interest only — fees are not included. Returns payment, term, total paid and total interest.",
    schema: {
      loan_amount: z.number().positive(),
      annual_rate_pct: z.number().min(0),
      term_months: z.number().int().positive().max(1200).describe("term in months (e.g. 60)"),
    },
    run: (a) => {
      const payment = mortgagePayment(a.loan_amount, a.annual_rate_pct, a.term_months / 12);
      if (!Number.isFinite(payment)) {
        return err("invalid input: loan amount must be positive, rate ≥ 0, term 1–1200 months");
      }
      const totalPaid = payment * a.term_months;
      return json({
        monthly_payment: payment,
        term_months: a.term_months,
        total_paid: totalPaid,
        total_interest: totalPaid - a.loan_amount,
      });
    },
  },
  {
    name: "salary_to_hourly",
    title: "Salary to hourly",
    description:
      "Break an annual salary into hourly = salary ÷ (hours/week × weeks/year), plus daily (5-day week), weekly, biweekly and monthly. Unpaid days off shrink the working year by 1/5 week per day; adjusted_hourly is the same salary over the hours actually worked. Gross pay.",
    schema: {
      annual_salary: z.number().positive(),
      hours_per_week: z.number().positive().max(168).default(40),
      weeks_per_year: z.number().positive().max(52).default(52),
      unpaid_days_off: z.number().min(0).default(0).describe("unpaid working days per year"),
    },
    run: (a) => {
      const r = salaryBreakdown(a.annual_salary, a.hours_per_week, a.weeks_per_year, a.unpaid_days_off);
      if (!Number.isFinite(r.hourly)) {
        return err("invalid input: salary > 0, hours 1–168, weeks 1–52, unpaid days ≥ 0 and below a full year");
      }
      return json(r);
    },
  },
  {
    name: "hourly_to_salary",
    title: "Hourly to salary",
    description:
      "Convert an hourly rate to annual = rate × hours/week × weeks/year, plus daily (5-day week), weekly, biweekly and monthly equivalents. Gross pay.",
    schema: {
      hourly_rate: z.number().min(0),
      hours_per_week: z.number().positive().max(168).default(40),
      weeks_per_year: z.number().positive().max(52).default(52),
    },
    run: (a) => {
      const r = hourlyToSalary(a.hourly_rate, a.hours_per_week, a.weeks_per_year);
      if (!Number.isFinite(r.annual)) {
        return err("invalid input: rate ≥ 0, hours 1–168, weeks 1–52");
      }
      return json(r);
    },
  },
  {
    name: "break_even",
    title: "Break-even point",
    description:
      "Break-even units = fixed costs ÷ (price − variable cost per unit). Returns units and revenue to break even, contribution margin, margin % and profit at 0.5×/1×/1.5×/2× of break-even volume. Reports an error when the margin is not positive (no volume can break even).",
    schema: {
      fixed_costs: z.number().min(0),
      price_per_unit: z.number().positive(),
      variable_cost_per_unit: z.number().min(0),
    },
    run: (a) => {
      const r = breakEven(a.fixed_costs, a.price_per_unit, a.variable_cost_per_unit);
      if (!Number.isFinite(r.units)) {
        return err("cannot break even: price per unit must exceed variable cost per unit, fixed costs ≥ 0");
      }
      return json(r);
    },
  },
];
