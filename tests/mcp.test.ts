import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("LoanMate MCP server", () => {
  it("exposes exactly the 6 finance tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.length).toBe(6);
    expect(new Set(tools.map((t) => t.name))).toEqual(
      new Set([
        "mortgage_payment",
        "compound_interest",
        "loan_payment",
        "salary_to_hourly",
        "hourly_to_salary",
        "break_even",
      ]),
    );
    // every description names the formula or its semantics so the model can sanity-check outputs
    for (const t of tools) {
      expect((t.description ?? "").length).toBeGreaterThan(80);
    }
    await client.close();
  });

  it("computes the mortgage against the closed-form amortization check (300k / 20% down / 6% / 30y → 1438.92)", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "mortgage_payment",
      arguments: { home_price: 300000, down_payment_pct: 20, annual_rate_pct: 6, years: 30 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    // 240,000 loan, r = 0.005, n = 360 → M = 1438.9215…
    expect(parsed.monthlyPI).toBeCloseTo(1438.92, 1);
    expect(parsed.loan_amount).toBe(240000);
    expect(parsed.schedule.length).toBe(30);
    // PITI without extras equals P&I
    expect(parsed.monthly_piti).toBeCloseTo(parsed.monthlyPI, 9);
    // PITI with extras adds monthly shares of yearly amounts plus the monthly HOA
    const r2 = await client.callTool({
      name: "mortgage_payment",
      arguments: {
        home_price: 300000, down_payment_pct: 20, annual_rate_pct: 6, years: 30,
        property_tax_yearly: 3600, home_insurance_yearly: 1200, hoa_monthly: 200,
      },
    });
    const p2 = JSON.parse((r2.content as any)[0].text);
    expect(p2.monthly_piti).toBeCloseTo(parsed.monthlyPI + 300 + 100 + 200, 6);
    await client.close();
  });

  it("computes compound interest with annuity-due contributions", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "compound_interest",
      arguments: { principal: 10000, monthly_contribution: 100, annual_rate_pct: 5, years: 10 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.total).toBeCloseTo(32063.02, 1);
    expect(parsed.contributed).toBe(22000);
    expect(parsed.interest).toBeCloseTo(parsed.total - parsed.contributed, 9);
    expect(parsed.schedule.length).toBe(10);
    await client.close();
  });

  it("prices a generic loan from amount, rate and term in months", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "loan_payment",
      arguments: { loan_amount: 240000, annual_rate_pct: 6, term_months: 360 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    // same math as the mortgage closed-form check: 240k @ 6% for 360 months
    expect(parsed.monthly_payment).toBeCloseTo(1438.92, 1);
    expect(parsed.total_paid).toBeCloseTo(parsed.monthly_payment * 360, 6);
    expect(parsed.total_interest).toBeCloseTo(parsed.total_paid - 240000, 6);
    await client.close();
  });

  it("breaks salary and hourly conversions down in both directions", async () => {
    const client = await connect();
    const s = await client.callTool({
      name: "salary_to_hourly",
      arguments: { annual_salary: 52000, hours_per_week: 40, weeks_per_year: 52 },
    });
    const sp = JSON.parse((s.content as any)[0].text);
    expect(sp.hourly).toBe(25);
    expect(sp.weekly).toBe(1000);
    expect(sp.monthly).toBeCloseTo(52000 / 12, 9);

    const h = await client.callTool({
      name: "hourly_to_salary",
      arguments: { hourly_rate: 25, hours_per_week: 40, weeks_per_year: 52 },
    });
    const hp = JSON.parse((h.content as any)[0].text);
    expect(hp.annual).toBe(52000);

    // unpaid days off raise the adjusted hourly: 10 days = 2 weeks → 52000/(40×50) = 26
    const u = await client.callTool({
      name: "salary_to_hourly",
      arguments: { annual_salary: 52000, unpaid_days_off: 10 },
    });
    const up = JSON.parse((u.content as any)[0].text);
    expect(up.effectiveWeeks).toBe(50);
    expect(up.adjustedHourly).toBe(26);
    await client.close();
  });

  it("finds the break-even point and profit ladder", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "break_even",
      arguments: { fixed_costs: 10000, price_per_unit: 50, variable_cost_per_unit: 30 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.units).toBe(500);
    expect(parsed.revenue).toBe(25000);
    expect(parsed.contributionMargin).toBe(20);
    expect(parsed.points.map((p: any) => p.profit)).toEqual([-5000, 0, 5000, 10000]);
    await client.close();
  });

  it("handles invalid input at two layers: schema (protocol error) and logic (isError)", async () => {
    const client = await connect();
    // logic layer: down payment of 100% leaves a zero loan → isError (NaN must not serialize as null)
    const zeroLoan = await client.callTool({
      name: "mortgage_payment",
      arguments: { home_price: 100, down_payment_pct: 100, annual_rate_pct: 6, years: 30 },
    });
    expect((zeroLoan as any).isError).toBe(true);
    expect((zeroLoan.content as any)[0].text).toContain("must be positive");
    // logic layer: price below variable cost can never break even → isError
    const noMargin = await client.callTool({
      name: "break_even",
      arguments: { fixed_costs: 10000, price_per_unit: 20, variable_cost_per_unit: 30 },
    });
    expect((noMargin as any).isError).toBe(true);
    expect((noMargin.content as any)[0].text).toContain("cannot break even");
    // logic layer: an impossible unpaid-days count (a full year off) → isError
    const badUnpaid = await client.callTool({
      name: "salary_to_hourly",
      arguments: { annual_salary: 52000, unpaid_days_off: 260 },
    });
    expect((badUnpaid as any).isError).toBe(true);
    // schema layer: negative price rejected by zod → SDK returns isError with -32602
    const schemaBad = await client.callTool({
      name: "mortgage_payment",
      arguments: { home_price: -5, down_payment_pct: 20, annual_rate_pct: 6, years: 30 },
    });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    // schema layer: non-integer term rejected
    const schemaBad2 = await client.callTool({
      name: "loan_payment",
      arguments: { loan_amount: 1000, annual_rate_pct: 5, term_months: 12.5 },
    });
    expect((schemaBad2 as any).isError).toBe(true);
    await client.close();
  });
});
