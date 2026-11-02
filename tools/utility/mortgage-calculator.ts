import { defineTool } from "../_lib/types";
import { CalcEngineMortgage } from "../_engines/calc-engine-mortgage";

export default defineTool({
  slug: "mortgage-calculator",
  category: "utility",
  icon: "calc",
  featured: true,
  engine: { component: CalcEngineMortgage, props: {} },
  copy: {
    en: {
      name: "Mortgage Calculator",
      tagline:
        "Work out your monthly mortgage payment before you talk to a bank — principal and interest plus tax, insurance and HOA, with the full yearly amortization schedule.",
      intro: [
        "This calculator gives you the monthly payment on a fixed-rate home loan and what that loan really costs over its life. Start from the home price and your down payment, add the rate and term you have been quoted, and you get the monthly principal-and-interest figure plus the total interest you will pay by the end.",
        "Housing costs rarely stop at principal and interest. Fill in yearly property tax, home insurance and monthly HOA fees to see the all-in PITI number lenders check against your income. The yearly schedule below shows how each year splits between principal and interest, and how the balance falls.",
      ],
      steps: [
        "Enter the home price and your down payment — as a percentage or a fixed amount.",
        "Type in the annual interest rate and the loan term in years.",
        "Optionally add property tax, insurance (per year) and HOA fees (per month) for the all-in monthly figure.",
        "Read the monthly payment, total interest and the year-by-year payoff schedule.",
      ],
      faqs: [
        {
          q: "What formula does this use?",
          a: "The standard amortization formula: payment = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the loan amount (price minus down payment), r is the monthly rate (annual rate divided by 12) and n is the number of monthly payments. This is the same reducing-balance math banks use for fixed-rate mortgages.",
        },
        {
          q: "What does PITI mean?",
          a: "Principal, Interest, Taxes and Insurance — the four parts of a typical monthly housing payment. The calculator adds your yearly property tax and insurance divided by 12, plus any monthly HOA fee, on top of the principal-and-interest payment.",
        },
        {
          q: "Why does most of my early payment go to interest?",
          a: "With a reducing-balance loan, interest each month is charged on the remaining balance, which is largest at the start. Look at the yearly schedule: the interest share shrinks and the principal share grows every year until the loan is paid off.",
        },
        {
          q: "Does this include PMI or closing costs?",
          a: "No. Private mortgage insurance (usually required below 20% down), points, appraisal and other closing costs are not modeled. If your down payment is under 20%, ask your lender for the PMI quote and add it mentally to the monthly figure.",
        },
      ],
    },
    zh: {
      name: "房贷计算器",
      tagline: "买房按揭先算清:月供多少、利息总共多少。支持首付比例、房产税、保险和物业费,附逐年还款计划表。",
      intro: [
        "输入房价、首付、利率和年限,立刻得到等额本息月供、贷款总额和到期总利息。再填上房产税、房屋保险(按年)和物业费(按月),就能看到银行审批时看的「每月总支出」(PITI)。",
        "下方的逐年还款表展示每年还了多少本金、多少利息、剩余本金还剩多少——早期利息占比高是正常现象,随着余额下降,本金占比逐年上升。",
      ],
      steps: [
        "填写房屋总价和首付(可用百分比或固定金额)。",
        "输入年利率和贷款年限。",
        "可选:填入房产税、保险(按年)和物业费(按月),得到每月总支出。",
        "查看月供、总利息和逐年还款计划。",
      ],
      faqs: [
        {
          q: "计算公式是什么?",
          a: "标准等额本息公式:月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L 为贷款额(房价减首付),r 为月利率(年利率除以 12),n 为还款月数。银行固定利率房贷用的就是这套余额递减算法。",
        },
        {
          q: "PITI 是什么?",
          a: "本金(Principal)、利息(Interest)、税费(Taxes)、保险(Insurance)四项的合称,即每月住房支出的全口径数字。本工具把房产税和保险按年 ÷ 12 摊进月供,物业费按你填的月数直接计入。",
        },
        {
          q: "为什么前期还的基本都是利息?",
          a: "余额递减贷款每月的利息按剩余本金计收,期初余额最大,所以利息占比最高。看逐年还款表就能发现:利息占比逐年缩小,本金占比逐年上升,直到还清。",
        },
        {
          q: "包含 PMI 或各种费用吗?",
          a: "不包含。首付低于 20% 通常要交的抵押贷款保险(PMI)、评估费、点数等费用没有建模。首付不足两成时,请向贷款机构要 PMI 报价,自行加到月供数字上。",
        },
      ],
    },
    ja: {
      name: "住宅ローン計算",
      tagline: "住宅ローンの毎月の返済額と総利息を購入前に試算。頭金比率・固定資産税・保険料・管理費にも対応し、年ごとの返済表つき。",
      intro: [
        "住宅価格・頭金・金利・期間を入力すると、元利均等の毎月返済額、借入額、完済までの総利息がすぐ出ます。固定資産税・火災保険(年額)と管理費(月額)を加えると、金融機関の審査で見られる月間支出の総額(PITI)まで分かります。",
        "下の年別返済表は、毎年の元本・利息の内訳と残高の減り方を示します。返済初期は利息の割合が大きく、残高が減るにつれて元本の割合が年々高まっていきます。",
      ],
      steps: [
        "住宅価格と頭金を入力します(百分比または金額)。",
        "年利と返済期間(年)を入力します。",
        "任意で固定資産税・保険(年額)と管理費(月額)を追加し、月間総支出を確認します。",
        "毎月の返済額・総利息・年別の返済計画を読み取ります。",
      ],
      faqs: [
        {
          q: "どんな計算式を使っていますか?",
          a: "標準的な元利均等返済の式:返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12)、n は返済回数です。固定金利住宅ローンで金融機関が使う残高スライド方式と同じ計算です。",
        },
        {
          q: "PITI とは何ですか?",
          a: "元本(Principal)・利息(Interest)・税金(Taxes)・保険(Insurance)の頭文字で、住宅に関わる月間支出の総額を指します。このツールは固定資産税と保険を 12 で割って上乗せし、管理費は入力した月額をそのまま加えます。",
        },
        {
          q: "返済初期はなぜ利息中心なのですか?",
          a: "残高スライド方式では、毎月の利息が「残りの借入残高」に対して課されます。初期は残高が最も大きいため利息の占める割合が高くなります。年別返済表を見ると、利息の割合が年々減り、元本の割合が増えていくのが分かります。",
        },
        {
          q: "保証料や諸費用は含まれますか?",
          a: "含まれません。頭金 2 割未満で必要になることが多い団信・保証料、事務手数料などの諸費用は対象外です。該当する場合は金融機関の見積もりを月額に加算して考えてください。",
        },
      ],
    },
    es: {
      name: "Calculadora hipotecaria",
      tagline:
        "Calcula tu cuota hipotecaria antes de hablar con el banco: capital e interés más impuestos, seguro y comunidad, con la tabla de amortización anual completa.",
      intro: [
        "Esta calculadora te da la cuota mensual de una hipoteca fija y lo que cuesta el préstamo a lo largo de su vida. Parte del precio de la vivienda y tu entrada, añade el tipo y el plazo que te hayan ofrecido, y obtendrás la cuota de capital e interés más el interés total que pagarás al final.",
        "El coste de una vivienda no se queda en capital e interés. Rellena el impuesto anual, el seguro y la cuota de comunidad mensual para ver el total mensual (PITI) que el banco compara con tus ingresos. La tabla anual muestra cómo se reparte cada año entre capital e interés y cómo cae el saldo.",
      ],
      steps: [
        "Introduce el precio de la vivienda y tu entrada, en porcentaje o importe fijo.",
        "Escribe el tipo de interés anual y el plazo en años.",
        "Opcionalmente añade impuesto, seguro (al año) y comunidad (al mes) para el total mensual.",
        "Lee la cuota mensual, el interés total y el calendario de amortización año por año.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula utiliza?",
          a: "La fórmula francesa de amortización: cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el préstamo (precio menos entrada), r el tipo mensual (anual ÷ 12) y n el número de cuotas. Es el mismo sistema de saldo decreciente que usan los bancos para hipotecas fijas.",
        },
        {
          q: "¿Qué significa PITI?",
          a: "Principal, Interés, Tasas y Seguro: las cuatro partes de una cuota hipotecaria típica. La calculadora suma el impuesto y el seguro anuales divididos por 12, más la comunidad mensual, sobre la cuota de capital e interés.",
        },
        {
          q: "¿Por qué al principio pago casi todo interés?",
          a: "En un préstamo de saldo decreciente, el interés mensual se cobra sobre el saldo pendiente, que es máximo al inicio. En la tabla anual verás que la parte de interés baja y la de capital sube cada año hasta cancelar la deuda.",
        },
        {
          q: "¿Incluye seguros obligatorios o gastos?",
          a: "No. Los seguros vinculados que exija el préstamo, la comisión de apertura, tasación y otros gastos no están modelados. Pídelos en la oferta y súmalos mentalmente a la cuota para comparar bien.",
        },
      ],
    },
    pt: {
      name: "Calculadora de financiamento",
      tagline:
        "Calcule a parcela do financiamento antes de falar com o banco: principal e juros mais IPTU, seguro e condomínio, com o cronograma de amortização anual completo.",
      intro: [
        "Esta calculadora mostra a parcela mensal de um financiamento imobiliário a taxa fixa e quanto o empréstimo custa no total. Comece pelo preço do imóvel e sua entrada, adicione a taxa e o prazo que o banco ofereceu, e você verá a parcela de principal e juros além dos juros acumulados até o fim.",
        "O custo de morar não para em principal e juros. Preencha o IPTU anual, o seguro e o condomínio mensal para ver o total mensal (PITI) que o banco compara com a sua renda. O cronograma anual mostra como cada ano se divide entre principal e juros e como o saldo cai.",
      ],
      steps: [
        "Informe o preço do imóvel e a entrada, em porcentagem ou valor fixo.",
        "Digite a taxa de juros anual e o prazo em anos.",
        "Opcionalmente adicione IPTU, seguro (por ano) e condomínio (por mês) para o total mensal.",
        "Leia a parcela mensal, os juros totais e o cronograma de amortização ano a ano.",
      ],
      faqs: [
        {
          q: "Qual fórmula é usada?",
          a: "A fórmula de amortização padrão (tabela Price): parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço menos entrada), r a taxa mensal (anual ÷ 12) e n o número de parcelas. É o mesmo sistema de saldo decrescente usado pelos bancos.",
        },
        {
          q: "O que é PITI?",
          a: "Principal, Juros, Taxas e Seguro — as quatro partes de uma parcela habitacional típica. A calculadora soma o IPTU e o seguro anuais divididos por 12, mais o condomínio mensal, sobre a parcela de principal e juros.",
        },
        {
          q: "Por que no início pago quase tudo de juros?",
          a: "No sistema de saldo decrescente, os juros mensais incidem sobre o saldo devedor, que é máximo no começo. No cronograma anual você vê a fatia de juros encolher e a de principal crescer a cada ano até quitar a dívida.",
        },
        {
          q: "Inclui seguro obrigatório ou tarifas?",
          a: "Não. Seguros exigidos pelo contrato, tarifa de avaliação, custas de registro e outros custos não entram no cálculo. Peça esses valores na proposta e some-os mentalmente à parcela antes de comparar.",
        },
      ],
    },
  },
  related: ["loan-calculator", "compound-interest-calculator", "salary-to-hourly"],
});
