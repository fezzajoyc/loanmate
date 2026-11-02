import { defineTool } from "../_lib/types";
import { CalcEngineCompound } from "../_engines/calc-engine-compound";

export default defineTool({
  slug: "compound-interest-calculator",
  category: "utility",
  icon: "layers",
  featured: true,
  engine: { component: CalcEngineCompound, props: {} },
  copy: {
    en: {
      name: "Compound Interest Calculator",
      tagline:
        "See what your money becomes with compound interest and regular contributions — final balance, what you put in, what interest added, year by year.",
      intro: [
        "Compound interest is interest that earns interest. Each period your balance grows by the rate, and every contribution you add starts growing too. Enter a starting amount, a monthly contribution and an annual return, and this calculator projects the final balance plus a year-by-year breakdown of what you deposited versus what the market added.",
        "The gap between “you put in” and “interest earned” is the whole point of starting early. The schedule shows that gap widening over time as the balance gets larger and compounds on itself.",
      ],
      steps: [
        "Enter your starting amount and the amount you can add each month.",
        "Type an annual return — use a conservative estimate for long horizons.",
        "Pick the compounding frequency (monthly, quarterly or annually).",
        "Read the final balance, total contributed, interest earned and the yearly growth table.",
      ],
      faqs: [
        {
          q: "Are contributions counted at the start or the end of each period?",
          a: "At the start — annuity-due. Each contribution earns interest from the very period it is deposited, so results run slightly higher than end-of-period calculators. The difference over long horizons is real but modest.",
        },
        {
          q: "What rate should I enter?",
          a: "Whatever annual return you want to assume. Long-run stock market averages have historically been around 7–10% before inflation, but future returns are not guaranteed. Try a pessimistic and an optimistic scenario instead of trusting one number.",
        },
        {
          q: "Is this nominal or adjusted for inflation?",
          a: "Nominal — the results are in today's currency units and do not subtract inflation. A common shortcut: subtract expected inflation from your rate (e.g. 7% return with 3% inflation ≈ 4% real) to see the result in today's purchasing power.",
        },
      ],
    },
    zh: {
      name: "复利计算器",
      tagline: "本金加每月定投,按复利滚下去能到多少?期末金额、累计投入、利息收益一目了然,附逐年增长明细。",
      intro: [
        "复利就是「利息也能生利息」。每一期余额按收益率增长,你追加的每笔投入也从当期开始滚。输入初始本金、每月定投金额和年收益率,就能得到期末金额,以及「你投了多少」和「收益赚了多少」的逐年对比。",
        "「累计投入」和「利息收益」之间的差距,正是尽早开始的意义所在。看逐年明细表:随着余额变大、利滚利加速,这个差距会越拉越大。",
      ],
      steps: [
        "填写初始本金和每月能定投的金额。",
        "输入年收益率——长期测算建议用保守估计。",
        "选择复利频率(每月、每季度或每年)。",
        "查看期末金额、累计投入、利息收益和逐年增长表。",
      ],
      faqs: [
        {
          q: "定投按期初还是期末计入?",
          a: "按期初(期初年金口径)。每笔投入从存入当期就开始生息,所以结果比期末计入的计算器略高。长期看差异真实存在,但幅度不算大。",
        },
        {
          q: "收益率该填多少?",
          a: "填你想假设的年化收益。股市长期历史年化大约在 7%–10%(通胀前),但未来没有保证。与其迷信单一数字,不如分别用悲观和乐观两种情景各算一遍。",
        },
        {
          q: "结果考虑通胀了吗?",
          a: "没有,结果是名义值,以今天的货币单位计。一个常用捷径:用收益率减去预期通胀(比如 7% 收益、3% 通胀 ≈ 4% 实际),就能大致看到按今天购买力衡量的结果。",
        },
      ],
    },
    ja: {
      name: "複利計算",
      tagline: "元本と毎月の積立が複利でいくらになるかを試算。最終金額・投入額・運用収益の内訳を年ごとに確認できます。",
      intro: [
        "複利とは「利息にさらに利息がつく」仕組みです。各期ごとに残高が利回りで伸び、追加した積立もその期から運用が始まります。元本・毎月の積立額・年利回りを入力すると、最終金額と「自分が投げたお金」と「運用が増やしたお金」の年別内訳が分かります。",
        "「投入額」と「運用収益」の差こそ、早く始める意味です。残高が大きくなるほど利回りが残高自身に掛かるため、年別の表ではその差が加速度的に広がっていきます。",
      ],
      steps: [
        "元本と毎月積み立てられる金額を入力します。",
        "年利回りを入力します。長期の試算なら控えめな数字がおすすめです。",
        "複利間隔(毎月・四半期・毎年)を選びます。",
        "最終金額・投入額合計・運用収益・年別の推移表を確認します。",
      ],
      faqs: [
        {
          q: "積立は期初と期末のどちらで計上されますか?",
          a: "期初(期初払い)です。各積立は預け入れた期から利息がつくため、期末払いの計算より結果が少し高くなります。長期では差が現れますが、大きすぎるほどではありません。",
        },
        {
          q: "利回りはいくらにすればいいですか?",
          a: "仮定したい年利回りを入れてください。株式市場の長期平均はインフレ前で年 7〜10% 程度とされてきましたが、将来は保証されません。一つの数字に頼らず、悲観シナリオと楽観シナリオの両方で試してみてください。",
        },
        {
          q: "結果はインフレ調整済みですか?",
          a: "いいえ、名目ベースで今日の通貨単位のままで、インフレは差し引いていません。目安として、想定インフレ率を利回りから引く(例:7% 利回り − 3% インフレ ≈ 実質 4%)と、今日の購買力ベースの結果がつかめます。",
        },
      ],
    },
    es: {
      name: "Calculadora de interés compuesto",
      tagline:
        "Calcula cuánto crece tu dinero con interés compuesto y aportes regulares: saldo final, lo que aportas, lo que suman los intereses, año por año.",
      intro: [
        "El interés compuesto es interés que genera interés. Cada periodo tu saldo crece según la tasa y cada aporte que añades empieza a crecer también. Introduce un capital inicial, un aporte mensual y un rendimiento anual, y esta calculadora proyecta el saldo final con el desglose año por año de lo que depositaste frente a lo que sumó el mercado.",
        "La diferencia entre «total aportado» e «intereses ganados» es toda la razón para empezar pronto. La tabla muestra cómo esa diferencia se amplía con el tiempo a medida que el saldo crece y se compone sobre sí mismo.",
      ],
      steps: [
        "Introduce tu capital inicial y lo que puedes aportar cada mes.",
        "Escribe un rendimiento anual; para plazos largos usa una estimación conservadora.",
        "Elige la frecuencia de capitalización (mensual, trimestral o anual).",
        "Lee el saldo final, lo aportado, los intereses ganados y la tabla de crecimiento anual.",
      ],
      faqs: [
        {
          q: "¿Los aportes cuentan al inicio o al final de cada periodo?",
          a: "Al inicio (renta anticipada). Cada aporte genera intereses desde el mismo periodo en que se deposita, así que los resultados salen algo más altos que en calculadoras de fin de periodo. A largo plazo la diferencia existe, pero es moderada.",
        },
        {
          q: "¿Qué rendimiento debo poner?",
          a: "El que quieras asumir. La media histórica de la bolsa ronda el 7–10% anual antes de inflación, pero el futuro no está garantizado. Mejor que fiarte de una cifra, prueba un escenario pesimista y otro optimista.",
        },
        {
          q: "¿El resultado está ajustado por inflación?",
          a: "No, es nominal, en unidades de moneda actuales. Un atajo habitual: resta la inflación esperada al rendimiento (7% de rendimiento con 3% de inflación ≈ 4% real) para ver el resultado en poder adquisitivo de hoy.",
        },
      ],
    },
    pt: {
      name: "Calculadora de juros compostos",
      tagline:
        "Veja quanto seu dinheiro rende com juros compostos e aportes mensais: saldo final, quanto você investiu e quanto veio dos juros, ano a ano.",
      intro: [
        "Juros compostos são juros que rendem juros. A cada período seu saldo cresce pela taxa e cada aporte que você adiciona começa a render também. Informe um valor inicial, um aporte mensal e uma rentabilidade anual, e a calculadora projeta o saldo final com o detalhamento ano a ano do que você depositou e do que o rendimento acrescentou.",
        "A diferença entre “total investido” e “juros ganhos” é toda a razão para começar cedo. A tabela mostra essa diferença crescendo com o tempo, conforme o saldo aumenta e os juros incidem sobre os próprios juros.",
      ],
      steps: [
        "Informe o valor inicial e quanto você consegue aportar por mês.",
        "Digite uma rentabilidade anual; para prazos longos, use uma estimativa conservadora.",
        "Escolha a frequência de capitalização (mensal, trimestral ou anual).",
        "Leia o saldo final, o total investido, os juros ganhos e a tabela de crescimento anual.",
      ],
      faqs: [
        {
          q: "Os aportes contam no início ou no fim de cada período?",
          a: "No início (parcelamento antecipado). Cada aporte rende desde o próprio período em que entra, então os resultados ficam um pouco acima das calculadoras que consideram depósitos no fim. No longo prazo a diferença existe, mas é modesta.",
        },
        {
          q: "Que taxa devo colocar?",
          a: "A rentabilidade anual que quiser assumir. A média histórica da bolsa gira em torno de 7–10% ao ano antes da inflação, mas o futuro não é garantido. Em vez de confiar num número só, teste um cenário pessimista e um otimista.",
        },
        {
          q: "O resultado está ajustado pela inflação?",
          a: "Não, é nominal, em unidades da moeda de hoje. Um atalho comum: subtraia a inflação esperada da taxa (7% de retorno com 3% de inflação ≈ 4% real) para ver o resultado no poder de compra atual.",
        },
      ],
    },
  },
  related: ["mortgage-calculator", "loan-calculator", "break-even-calculator"],
});
