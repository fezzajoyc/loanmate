import { defineTool } from "../_lib/types";
import { CalcEngineLoan } from "../_engines/calc-engine-loan";

export default defineTool({
  slug: "loan-calculator",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineLoan, props: {} },
  copy: {
    en: {
      name: "Loan Calculator",
      tagline:
        "Any-purpose loan payment in one step — auto, personal, student or consolidation. Enter amount, rate and term to get the monthly payment and total interest.",
      intro: [
        "Most fixed-rate loans — car loans, personal loans, student loans, consolidation loans — are priced with the same amortization formula as a mortgage. Enter the amount you want to borrow, the annual rate you have been quoted and the term, and you get the monthly payment, the total you will repay and how much of that is pure interest.",
        "The numbers make trade-offs concrete. Stretching the term lowers the monthly payment but raises total interest; shortening it does the opposite. Try the same loan at two or three terms and compare the total interest line before you sign anything.",
      ],
      steps: [
        "Enter the loan amount you are considering.",
        "Type the annual interest rate the lender quoted.",
        "Set the term in years or months.",
        "Compare the monthly payment against total interest — then try a different term.",
      ],
      faqs: [
        {
          q: "Which formula is behind the payment?",
          a: "The standard reducing-balance amortization formula: payment = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), with r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. It is the same math used for fixed-rate mortgages and most amortizing personal loans.",
        },
        {
          q: "Does the result include fees?",
          a: "No. The payment covers principal and interest only. Origination fees, administration charges, optional insurance and prepayment penalties are outside this calculation — ask the lender for the APR, which rolls most of those costs in.",
        },
        {
          q: "Why is the total interest so high on long terms?",
          a: "Interest accrues on the remaining balance every month, so the longer the balance survives, the more months of interest pile up. A lower monthly payment over 7 years can easily cost more in interest than a higher payment over 3 years.",
        },
      ],
    },
    zh: {
      name: "贷款计算器",
      tagline: "车贷、消费贷、助学贷、合并贷,输金额、利率、期限,一步算出每月还款和总利息。",
      intro: [
        "大多数固定利率贷款——车贷、消费贷、助学贷、债务合并贷——用的都是和房贷一样的等额本息公式。输入想借的金额、报价利率和期限,立刻得到每月还款额、还款总额,以及其中有多少是纯利息。",
        "数字会让取舍变得直观:拉长期限月供变低但总利息变高,缩短则相反。签合同之前,把同一笔贷款按两三个期限各算一遍,对比总利息那一行。",
      ],
      steps: [
        "填写想借的金额。",
        "输入贷款机构报的年利率。",
        "选择期限(按年或按月)。",
        "对比月供和总利息——再换个期限试试。",
      ],
      faqs: [
        {
          q: "月供用的什么公式?",
          a: "标准等额本息(余额递减)公式:月供 = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),r 为月利率(年利率 ÷ 12 ÷ 100),n 为期数。固定利率房贷和大多数分期消费贷都是这套算法。",
        },
        {
          q: "结果包含手续费吗?",
          a: "不包含。月供只含本金和利息。服务费、管理费、可选保险和提前还款违约金都不在计算范围内——让机构给你 APR(年化综合成本),它把大部分费用折进去了。",
        },
        {
          q: "为什么期限越长总利息越高?",
          a: "利息每月按剩余本金计收,本金余额存在的时间越长,累积的利息月份就越多。7 年期的低月供,总利息很容易超过 3 年期的高月供。",
        },
      ],
    },
    ja: {
      name: "ローン計算",
      tagline: "自動車ローン・カードローン・教育ローン・おまとめなど、金額・金利・期間から毎月の返済額と総利息をすぐ計算。",
      intro: [
        "多くの固定金利ローン——自動車ローン・カードローン・教育ローン・おまとめローン——は、住宅ローンと同じ元利均等方式で返済額が決まります。借入希望額と金利・期間を入力すれば、毎月の返済額、返済総額、そしてそのうち純粋な利息がいくらかが分かります。",
        "数字は判断材料になります。期間を伸ばすと月々の負担は軽くなる一方、総利息は増えます。同じ借入を 2〜3 通りの期間で計算し、総利息の行を比べてから契約してください。",
      ],
      steps: [
        "借入希望額を入力します。",
        "金融機関が提示した年利を入力します。",
        "期間を年または月で設定します。",
        "毎月の返済額と総利息を比べ、期間を変えて再計算します。",
      ],
      faqs: [
        {
          q: "返済額はどんな式で計算されますか?",
          a: "標準的な残高スライド式(元利均等)です:返済額 = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。r は月利(年利 ÷ 12 ÷ 100)、n は返済回数。固定金利の住宅ローンや多くの個人向けローンと同じ計算です。",
        },
        {
          q: "手数料は結果に含まれますか?",
          a: "含まれません。返済額は元本と利息のみです。事務手数料、管理費、任意の保険、繰上返済手数料は計算外です。大部分の費用を織り込んだ APR(実質年率)を金融機関に確認してください。",
        },
        {
          q: "期間が長いと総利息が増えるのはなぜですか?",
          a: "利息は毎月「残りの残高」に対して発生します。残高が長く残るほど利息の請求月が積み上がります。7 年の低い返済額は、3 年の高い返済額より総利息で上回ることがよくあります。",
        },
      ],
    },
    es: {
      name: "Calculadora de préstamos",
      tagline:
        "La cuota de cualquier préstamo en un paso — coche, personal, estudiantil o de consolidación. Importe, tipo y plazo para ver cuota mensual e interés total.",
      intro: [
        "La mayoría de los préstamos a tipo fijo — de coche, personales, estudiantiles o de consolidación — se calculan con la misma fórmula de amortización que una hipoteca. Introduce el importe, el tipo anual que te hayan ofrecido y el plazo, y obtendrás la cuota mensual, el total que devolverás y cuánto de eso es interés puro.",
        "Las cifras hacen tangibles los compromisos. Alargar el plazo baja la cuota pero sube el interés total; acortarlo hace lo contrario. Calcula el mismo préstamo a dos o tres plazos y compara la línea de interés total antes de firmar.",
      ],
      steps: [
        "Introduce el importe que quieres pedir.",
        "Escribe el tipo de interés anual ofrecido.",
        "Fija el plazo en años o meses.",
        "Compara la cuota mensual con el interés total — y prueba otro plazo.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula hay detrás de la cuota?",
          a: "La fórmula estándar de saldo decreciente: cuota = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), con r el tipo mensual (anual ÷ 12 ÷ 100) y n el número de meses. Es la misma matemática de las hipotecas fijas y de la mayoría de préstamos personales amortizables.",
        },
        {
          q: "¿El resultado incluye comisiones?",
          a: "No. La cuota cubre solo capital e interés. Comisión de apertura, gastos de administración, seguros opcionales y penalizaciones por cancelación quedan fuera — pide al prestamista la TAE, que incorpora la mayoría de esos costes.",
        },
        {
          q: "¿Por qué el interés total es tan alto en plazos largos?",
          a: "Los intereses se devengan cada mes sobre el saldo pendiente, así que cuanto más tiempo vive la deuda, más meses de interés se acumulan. Una cuota baja a 7 años puede costar más interés que una cuota alta a 3 años.",
        },
      ],
    },
    pt: {
      name: "Calculadora de empréstimos",
      tagline:
        "A parcela de qualquer empréstimo em um passo — veicular, pessoal, estudantil ou consolidação. Valor, taxa e prazo para ver a parcela mensal e os juros totais.",
      intro: [
        "A maioria dos empréstimos a taxa fixa — veicular, pessoal, estudantil ou de consolidação — é precificada com a mesma fórmula de amortização de um financiamento imobiliário. Informe o valor que pretende pegar, a taxa anual oferecida e o prazo, e você verá a parcela mensal, o total que vai pagar e quanto disso é juro puro.",
        "Os números tornam as escolhas concretas. Esticar o prazo reduz a parcela mas aumenta os juros totais; encurtar faz o oposto. Simule o mesmo empréstimo em dois ou três prazos e compare a linha de juros totais antes de assinar.",
      ],
      steps: [
        "Informe o valor do empréstimo.",
        "Digite a taxa de juros anual oferecida pelo banco.",
        "Defina o prazo em anos ou meses.",
        "Compare a parcela mensal com os juros totais — e simule outro prazo.",
      ],
      faqs: [
        {
          q: "Qual fórmula calcula a parcela?",
          a: "A fórmula padrão de saldo decrescente (tabela Price): parcela = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), com r a taxa mensal (anual ÷ 12 ÷ 100) e n o número de meses. É a mesma matemática de financiamentos imobiliários e da maioria dos empréstimos pessoais parcelados.",
        },
        {
          q: "O resultado inclui tarifas?",
          a: "Não. A parcela cobre apenas principal e juros. Tarifa de abertura, taxas administrativas, seguros opcionais e multas por quitação antecipada ficam fora — peça ao banco o CET, que embute a maior parte desses custos.",
        },
        {
          q: "Por que os juros totais são tão altos em prazos longos?",
          a: "Os juros incidem todo mês sobre o saldo devedor, então quanto mais tempo a dívida existe, mais meses de juros se acumulam. Uma parcela baixa em 7 anos pode custar mais juros que uma parcela alta em 3 anos.",
        },
      ],
    },
  },
  related: ["mortgage-calculator", "compound-interest-calculator", "break-even-calculator"],
});
