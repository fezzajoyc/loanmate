import { defineTool } from "../_lib/types";
import { CalcEngineSalary } from "../_engines/calc-engine-salary";

export default defineTool({
  slug: "salary-to-hourly",
  category: "utility",
  icon: "clock",
  featured: true,
  engine: { component: CalcEngineSalary, props: { mode: "salary2hourly" } },
  copy: {
    en: {
      name: "Salary to Hourly",
      tagline:
        "Convert your annual salary into hourly, daily, weekly, biweekly and monthly pay — and see how unpaid days off change your real hourly rate.",
      intro: [
        "A salary is a single number; an hourly rate tells you what your time is actually worth. Enter your annual salary, your usual hours per week and weeks per year, and you get the hourly rate plus every other cadence: daily, weekly, biweekly and monthly.",
        "The second number matters just as much: the adjusted hourly. If you take unpaid days off, your working year shrinks (5 working days per week, so 10 days ≈ 2 weeks) while the salary stays the same — the same money spread over fewer worked hours means your true hourly rate is higher than the headline one.",
      ],
      steps: [
        "Enter your annual salary.",
        "Add your typical hours per week and weeks per year.",
        "Optionally add unpaid days off per year for the adjusted hourly.",
        "Read the hourly rate and the full daily/weekly/biweekly/monthly breakdown.",
      ],
      faqs: [
        {
          q: "How is the hourly rate computed?",
          a: "Hourly = annual salary ÷ (hours per week × weeks per year). Daily pay assumes a 5-day week, weekly is salary ÷ weeks, biweekly doubles that and monthly is salary ÷ 12. Example: 52,000 at 40 h/week over 52 weeks is exactly 25.00 an hour.",
        },
        {
          q: "Why does the adjusted hourly go up when I take unpaid time off?",
          a: "Because the same annual salary is then earned in fewer worked hours. Unpaid days shrink the working year at 1/5 week per day; dividing the salary by the smaller worked-hours total raises the effective rate. It is a rate per hour worked, not extra money.",
        },
        {
          q: "Are these figures before or after tax?",
          a: "Before. Everything here is gross pay — no income tax, social contributions or deductions. Compare gross-to-gross, or run your net through your payslip's own hourly division.",
        },
      ],
    },
    zh: {
      name: "年薪转时薪",
      tagline: "年薪折算时薪:日薪、周薪、双周薪、月薪一次给全,无薪假越多,真实时薪越高。",
      intro: [
        "年薪只是一个数字;时薪才说明你的时间值多少钱。输入年薪、每周工时和每年工作周数,除了时薪,日薪、周薪、双周薪、月薪一并算出。",
        "第二个数字同样重要:「扣无薪假后的时薪」。请了无薪假,工作年会缩短(每周 5 个工作日,10 天 ≈ 2 周),而年薪不变——同样的钱摊在更少的工作小时上,真实时薪就比名义时薪更高。",
      ],
      steps: [
        "填写你的年薪。",
        "填入每周工时和每年工作周数。",
        "可选:填入每年无薪假天数,查看调整后时薪。",
        "读取时薪和完整的日薪/周薪/双周薪/月薪明细。",
      ],
      faqs: [
        {
          q: "时薪是怎么算的?",
          a: "时薪 = 年薪 ÷(每周工时 × 每年周数)。日薪按每周 5 个工作日折算,周薪 = 年薪 ÷ 周数,双周薪 × 2,月薪 = 年薪 ÷ 12。例如年薪 52,000、每周 40 小时、做满 52 周,时薪正好 25.00。",
        },
        {
          q: "为什么休无薪假反而让调整后时薪变高?",
          a: "因为同一年薪是在更少的工作小时里挣到的。无薪假按每天 1/5 周缩短工作年,年薪除以更小的实际工时总数,有效时薪自然上升。它是「每工作小时对应的薪酬」,不是多出来的钱。",
        },
        {
          q: "这些数字是税前还是税后?",
          a: "税前。这里所有金额都是毛收入,不含个税、社保和各类扣款。对比请统一用税前口径,或用自己的工资单折算税后时薪。",
        },
      ],
    },
    ja: {
      name: "年収から時給へ",
      tagline: "年収を時給・日給・週給・月給へ一括換算。無給休暇が多いほど実質時給が上がる仕組みも分かります。",
      intro: [
        "年収は一つの数字にすぎません。時給になって初めて「1 時間の価値」が見えます。年収・週労働時間・年間週数を入力すれば、時給に加えて日給・週給・2 週間ごと・月給まで一括で計算します。",
        "もう一つの注目点は「無給休暇込みの時給」です。無給休暇を取ると労働年は短くなり(週 5 日換算で 10 日 ≈ 2 週間)、年収は同じ。同じお金をより少ない労働時間で稼ぐことになるので、実質時給は名目より高くなります。",
      ],
      steps: [
        "年収を入力します。",
        "ふだんの週労働時間と年間週数を入力します。",
        "任意で年間の無給休暇日数を加え、調整後の時給を確認します。",
        "時給と日給・週給・月給の内訳を読み取ります。",
      ],
      faqs: [
        {
          q: "時給はどう計算されますか?",
          a: "時給 = 年収 ÷(週労働時間 × 年間週数)。日給は週 5 日換算、週給は年収 ÷ 週数、2 週間ごとはその 2 倍、月給は年収 ÷ 12 です。例:年収 52,000・週 40 時間・52 週なら時給はちょうど 25.00 です。",
        },
        {
          q: "無給休暇を取ると調整後の時給が上がるのはなぜですか?",
          a: "同じ年収をより少ない労働時間で稼ぐことになるからです。無給休暇は 1 日につき 1/5 週だけ労働年を縮め、年収を実労働時間で割ると実効時給が上がります。余分なお金が増えるわけではなく、あくまで時給レートの話です。",
        },
        {
          q: "表示金額は税込(手取り前)ですか?",
          a: "すべて税引前の総支給ベースです。所得税や社会保険料などは含みません。比較する際は総支給同士で、手取りの実質時給はご自身の給与明細で確認してください。",
        },
      ],
    },
    es: {
      name: "Salario a hora",
      tagline:
        "Convierte tu salario anual en pago por hora, día, semana, quincena y mes — y mira cómo los días sin sueldo cambian tu hora real.",
      intro: [
        "Un salario es una sola cifra; la tarifa por hora te dice cuánto vale de verdad tu tiempo. Introduce tu salario anual, tus horas habituales por semana y las semanas por año, y obtendrás la tarifa por hora más las demás periodicidades: diaria, semanal, quincenal y mensual.",
        "El segundo número importa igual: la hora ajustada. Si tomas días sin sueldo, tu año laboral se acorta (5 días laborables por semana, así que 10 días ≈ 2 semanas) mientras el salario sigue igual — el mismo dinero repartido en menos horas trabajadas significa que tu hora real es más alta que la nominal.",
      ],
      steps: [
        "Introduce tu salario anual.",
        "Añade tus horas por semana y semanas por año habituales.",
        "Opcionalmente añade días sin sueldo al año para la hora ajustada.",
        "Lee la tarifa por hora y el desglose diario, semanal, quincenal y mensual.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la tarifa por hora?",
          a: "Hora = salario anual ÷ (horas por semana × semanas por año). El día asume una semana de 5 días, la semana es salario ÷ semanas, la quincena es el doble y el mes es salario ÷ 12. Ejemplo: 52.000 a 40 h/semana durante 52 semanas son exactamente 25,00 por hora.",
        },
        {
          q: "¿Por qué sube la hora ajustada si tomo días sin sueldo?",
          a: "Porque el mismo salario anual se gana en menos horas trabajadas. Los días sin sueldo acortan el año laboral a 1/5 de semana por día; al dividir el salario entre menos horas, la tarifa efectiva sube. Es una tarifa por hora trabajada, no dinero extra.",
        },
        {
          q: "¿Las cifras son brutas o netas?",
          a: "Brutas. Todo lo aquí mostrado es salario bruto, sin IRPF, cotizaciones ni deducciones. Compara bruto con bruto, o calcula tu hora neta con tu propia nómina.",
        },
      ],
    },
    pt: {
      name: "Salário para hora",
      tagline:
        "Converta seu salário anual em valor por hora, dia, semana, quinzena e mês — e veja como os dias não pagos mudam sua hora real.",
      intro: [
        "Um salário é um único número; o valor por hora mostra quanto seu tempo realmente vale. Informe seu salário anual, suas horas habituais por semana e as semanas por ano, e você recebe o valor por hora mais todas as outras frequências: diária, semanal, quinzenal e mensal.",
        "O segundo número importa tanto quanto: a hora ajustada. Se você tira dias não pagos, seu ano de trabalho encurta (5 dias úteis por semana, então 10 dias ≈ 2 semanas) enquanto o salário permanece igual — o mesmo dinheiro dividido por menos horas trabalhadas significa que sua hora real é maior que a nominal.",
      ],
      steps: [
        "Informe seu salário anual.",
        "Adicione suas horas por semana e semanas por ano habituais.",
        "Opcionalmente adicione dias não pagos por ano para a hora ajustada.",
        "Leia o valor por hora e o detalhamento diário, semanal, quinzenal e mensal.",
      ],
      faqs: [
        {
          q: "Como o valor por hora é calculado?",
          a: "Hora = salário anual ÷ (horas por semana × semanas por ano). O dia assume uma semana de 5 dias, a semana é salário ÷ semanas, a quinzena é o dobro e o mês é salário ÷ 12. Exemplo: 52.000 a 40 h/semana por 52 semanas dá exatamente 25,00 por hora.",
        },
        {
          q: "Por que a hora ajustada sobe quando tiro dias não pagos?",
          a: "Porque o mesmo salário anual passa a ser ganho em menos horas trabalhadas. Dias não pagos encurtam o ano de trabalho em 1/5 de semana por dia; dividir o salário por menos horas eleva a taxa efetiva. É uma taxa por hora trabalhada, não dinheiro extra.",
        },
        {
          q: "Os valores são brutos ou líquidos?",
          a: "Brutos. Tudo aqui é salário bruto, sem imposto de renda, contribuições ou descontos. Compare bruto com bruto, ou calcule sua hora líquida pelo próprio contracheque.",
        },
      ],
    },
  },
  related: ["hourly-to-salary", "loan-calculator", "mortgage-calculator"],
});
