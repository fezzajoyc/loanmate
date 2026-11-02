import { defineTool } from "../_lib/types";
import { CalcEngineSalary } from "../_engines/calc-engine-salary";

export default defineTool({
  slug: "hourly-to-salary",
  category: "utility",
  icon: "rotate",
  engine: { component: CalcEngineSalary, props: { mode: "hourly2salary" } },
  copy: {
    en: {
      name: "Hourly to Salary",
      tagline:
        "Turn an hourly rate into the annual, monthly, biweekly, weekly and daily equivalents — enter your hours and weeks to see the full-time picture.",
      intro: [
        "Comparing a 25-dollar hour with a salaried offer is hard until both sides are in yearly terms. Enter the hourly rate, your hours per week and the weeks per year you expect to work, and this calculator multiplies it out to annual, monthly, biweekly, weekly and daily pay.",
        "The weeks field is where most comparisons go wrong: a seasonal or contract role at 48 weeks a year is not the same money as a staff job at 52, even at the identical hourly rate. Set the weeks honestly and the annual figure is honest too.",
      ],
      steps: [
        "Enter the hourly rate you have been offered or currently earn.",
        "Add the hours per week you actually expect to work.",
        "Set the weeks per year — account for unpaid gaps or seasonal pauses.",
        "Read the annual figure first, then the monthly and weekly cadences.",
      ],
      faqs: [
        {
          q: "How does the conversion work?",
          a: "Annual = hourly rate × hours per week × weeks per year; the rest is division (monthly = annual ÷ 12, weekly = annual ÷ weeks, daily assumes a 5-day week). Example: 25.00/hour at 40 h/week over 52 weeks is exactly 52,000 a year.",
        },
        {
          q: "What about overtime, tips or bonuses?",
          a: "They are not included — this is the straight multiplication of your inputs. If overtime is a regular part of your income, estimate it separately and add it to the annual figure mentally.",
        },
        {
          q: "Is the result gross pay?",
          a: "Yes. It is before income tax, social contributions and benefits. A salaried comparison should also weigh benefits — health coverage, paid leave, retirement match — which hourly contract work often lacks.",
        },
      ],
    },
    zh: {
      name: "时薪转年薪",
      tagline: "时薪折算年薪:按你的每周工时和每年周数,算出年薪、月薪、双周薪、周薪和日薪。",
      intro: [
        "「时薪 25」和一份月薪工作到底哪个划算?换算到同一个口径之前很难比。输入时薪、每周工时和预计每年工作的周数,工具会乘出年薪、月薪、双周薪、周薪和日薪。",
        "「每年周数」是最容易比错的地方:一年只做 48 周的季节工或合同工,和做满 52 周的正式岗不是一回事,哪怕时薪一样。把周数填诚实,年薪才有参考价值。",
      ],
      steps: [
        "填写你拿到报价或正在挣的时薪。",
        "填入每周实际会工作的工时。",
        "设置每年周数——把无薪空档和季节性停工算进去。",
        "先看年薪,再看月薪和周薪。",
      ],
      faqs: [
        {
          q: "换算公式是什么?",
          a: "年薪 = 时薪 × 每周工时 × 每年周数;其余是除法(月薪 = 年薪 ÷ 12,周薪 = 年薪 ÷ 周数,日薪按每周 5 个工作日)。例如时薪 25.00、每周 40 小时、做满 52 周,年薪正好 52,000。",
        },
        {
          q: "加班费、小费和奖金算吗?",
          a: "不算——这里只做输入项的直乘。如果加班费是你收入的固定部分,请单独估算后自行加到年薪数字上。",
        },
        {
          q: "结果是税前吗?",
          a: "是,税前口径,不含个税、社保和福利。和正式岗位对比时,还应把福利(医保、带薪假、养老金匹配)计入权重——合同时薪工作往往缺这些。",
        },
      ],
    },
    ja: {
      name: "時給から年収へ",
      tagline: "時給を年収・月給・2週間ごと・週給・日給へ一括換算。週労働時間と年間週数でフルタイムの全体像が見えます。",
      intro: [
        "「時給 25」と月給制のオファー、どちらが得かは同じ単位になるまで比べられません。時給・週労働時間・年間の勤務予定週数を入力すると、年収・月給・2 週間ごと・週給・日給まで一気に計算します。",
        "比較で一番間違えやすいのが「年間週数」です。年 48 週の季節労働や契約仕事は、時給が同じでも年 52 週の正社員と同じ額にはなりません。週数を正直に設定すれば、年収の数字も正直になります。",
      ],
      steps: [
        "オファーされている(または現在の)時給を入力します。",
        "実際に働く予定の週労働時間を入力します。",
        "年間週数を設定します。無給の期間や季節変動も織り込んでください。",
        "まず年収を確認し、次に月給・週給のペースを読み取ります。",
      ],
      faqs: [
        {
          q: "換算はどのように行われますか?",
          a: "年収 = 時給 × 週労働時間 × 年間週数。残りは割り算です(月給 = 年収 ÷ 12、週給 = 年収 ÷ 週数、日給は週 5 日換算)。例:時給 25.00・週 40 時間・52 週なら年収はちょうど 52,000 です。",
        },
        {
          q: "残業代やチップ、賞与は含まれますか?",
          a: "含まれません。入力値の単純な掛け算です。残業代が恒常的な収入の一部なら、別途見積もって年収に加算して考えてください。",
        },
        {
          q: "結果は総支給(税引前)ですか?",
          a: "はい。所得税や社会保険料、福利厚生を含まない額です。正社員と比べる場合は、健康保険・有給・退職金制度など、時給の契約仕事にない恩典も重みとして考慮してください。",
        },
      ],
    },
    es: {
      name: "Hora a salario",
      tagline:
        "Convierte tu tarifa por hora en el equivalente anual, mensual, quincenal, semanal y diario — con tus horas y semanas verás el panorama completo.",
      intro: [
        "Comparar una hora de 25 con una oferta asalariada es difícil hasta que ambos lados están en términos anuales. Introduce la tarifa por hora, tus horas por semana y las semanas al año que esperas trabajar, y esta calculadora la multiplica hasta el pago anual, mensual, quincenal, semanal y diario.",
        "El campo de semanas es donde más comparaciones fallan: un puesto de temporada o por contrato de 48 semanas al año no es el mismo dinero que un empleo fijo de 52, incluso con la tarifa idéntica. Pon las semanas con honestidad y la cifra anual también lo será.",
      ],
      steps: [
        "Introduce la tarifa por hora ofrecida o la que ganas ahora.",
        "Añade las horas por semana que realmente esperarás trabajar.",
        "Fija las semanas por año — cuenta huecos sin sueldo o pausas de temporada.",
        "Lee primero la cifra anual y luego los ritmos mensual y semanal.",
      ],
      faqs: [
        {
          q: "¿Cómo funciona la conversión?",
          a: "Anual = tarifa × horas por semana × semanas por año; el resto son divisiones (mensual = anual ÷ 12, semanal = anual ÷ semanas, el diario asume una semana de 5 días). Ejemplo: 25,00/hora a 40 h/semana durante 52 semanas son exactamente 52.000 al año.",
        },
        {
          q: "¿Y las horas extra, propinas o bonos?",
          a: "No se incluyen: es la multiplicación directa de tus datos. Si las horas extra son una parte fija de tus ingresos, estímalas aparte y súmalas a la cifra anual.",
        },
        {
          q: "¿El resultado es salario bruto?",
          a: "Sí. Es antes de impuestos, cotizaciones y beneficios. Para comparar con un empleo asalariado valora también los beneficios —sanidad, vacaciones pagadas, plan de pensiones— que el trabajo por horas suele no tener.",
        },
      ],
    },
    pt: {
      name: "Hora para salário",
      tagline:
        "Converta seu valor por hora no equivalente anual, mensal, quinzenal, semanal e diário — com suas horas e semanas, o cenário completo.",
      intro: [
        "Comparar uma hora de 25 com uma oferta assalariada é difícil até os dois lados estarem em termos anuais. Informe o valor por hora, suas horas por semana e as semanas por ano que você espera trabalhar, e a calculadora multiplica tudo para o pagamento anual, mensal, quinzenal, semanal e diário.",
        "O campo de semanas é onde a maioria das comparações falha: uma função sazonal ou por contrato de 48 semanas por ano não rende o mesmo que um cargo fixo de 52, mesmo com a taxa idêntica. Preencha as semanas com honestidade e o valor anual também será honesto.",
      ],
      steps: [
        "Informe o valor por hora oferecido ou que você ganha hoje.",
        "Adicione as horas por semana que você realmente espera trabalhar.",
        "Defina as semanas por ano — conte períodos não pagos ou paradas sazonais.",
        "Leia primeiro o valor anual e depois os ritmos mensal e semanal.",
      ],
      faqs: [
        {
          q: "Como funciona a conversão?",
          a: "Anual = valor por hora × horas por semana × semanas por ano; o resto é divisão (mensal = anual ÷ 12, semanal = anual ÷ semanas, o diário assume uma semana de 5 dias). Exemplo: 25,00/hora a 40 h/semana por 52 semanas dá exatamente 52.000 por ano.",
        },
        {
          q: "E horas extras, gorjetas ou bônus?",
          a: "Não entram — é a multiplicação direta dos seus dados. Se a hora extra é parte fixa da sua renda, estime-a separadamente e some ao valor anual.",
        },
        {
          q: "O resultado é salário bruto?",
          a: "Sim. É antes de imposto de renda, contribuições e benefícios. Para comparar com um cargo assalariado, pese também os benefícios — plano de saúde, férias pagas, previdência — que o trabalho por hora costuma não ter.",
        },
      ],
    },
  },
  related: ["salary-to-hourly", "loan-calculator", "compound-interest-calculator"],
});
