import { defineTool } from "../_lib/types";
import { CalcEngineBreakEven } from "../_engines/calc-engine-breakeven";

export default defineTool({
  slug: "break-even-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineBreakEven, props: {} },
  copy: {
    en: {
      name: "Break-Even Calculator",
      tagline:
        "Find the unit volume and revenue that cover your fixed costs — contribution margin per unit, margin percentage and profit at different volumes.",
      intro: [
        "Before a product, a service or a small business makes money, it has to pay for itself. Enter your fixed costs (rent, software, salaries that do not move with volume), the price per unit and the variable cost of producing one more unit, and the calculator tells you how many units you need to sell before profit begins.",
        "Every unit sold contributes its margin — price minus variable cost — toward the fixed costs. The scenario table shows profit at half, one-and-a-half and twice the break-even volume, so you can see how fast losses turn into profit once the threshold is behind you.",
      ],
      steps: [
        "Enter your fixed costs for the period — the costs that exist even at zero sales.",
        "Type the price you charge per unit.",
        "Enter the variable cost of one unit: materials, fees, direct labor.",
        "Read the break-even units and revenue, then scan the profit-at-different-volumes table.",
      ],
      faqs: [
        {
          q: "What is the break-even formula?",
          a: "Break-even units = fixed costs ÷ (price per unit − variable cost per unit). The difference is the contribution margin: each sale first repays the fixed costs, and once they are covered the same margin becomes profit.",
        },
        {
          q: "What if the price is lower than the variable cost?",
          a: "Then no volume can break even — every sale loses money. The calculator says so honestly instead of returning zero. Lower the variable cost or raise the price until the margin turns positive.",
        },
        {
          q: "What counts as a fixed cost?",
          a: "Anything that does not change with each unit sold within the period: rent, insurance, base salaries, software subscriptions. If a cost scales with production — materials, per-order shipping, payment processing fees — it belongs in the variable cost per unit.",
        },
      ],
    },
    zh: {
      name: "盈亏平衡计算器",
      tagline: "卖多少件才能保本?输入固定成本、单价和变动成本,算出保本销量、单位毛利和不同销量下的利润。",
      intro: [
        "一款产品、一项服务或一门小生意开始赚钱之前,得先「回本」。输入固定成本(房租、软件、不随销量变动的人力)、单价,以及多生产一件的变动成本,工具会告诉你:要卖多少件才开始有利润。",
        "每卖一件,其毛利(单价减变动成本)都用于填补固定成本。下方的情景表展示保本点的 0.5 倍、1.5 倍和 2 倍销量下的利润——跨过门槛之后,亏损转盈利的速度一目了然。",
      ],
      steps: [
        "填写该周期的固定成本——销量为零也要付的钱。",
        "输入每件售价。",
        "填写单件变动成本:材料、佣金、直接人工。",
        "读取保本销量和保本收入,再看不同销量下的利润表。",
      ],
      faqs: [
        {
          q: "保本公式是什么?",
          a: "保本销量 = 固定成本 ÷(单价 − 单件变动成本)。这个差就是单位边际贡献:每笔销售先偿还固定成本,填平之后,同样的差额就变成利润。",
        },
        {
          q: "如果单价低于变动成本怎么办?",
          a: "那卖多少件都保不了本——每卖一件都在亏钱。工具会如实提示,而不是返回 0。先压低变动成本或提高单价,让差额转正。",
        },
        {
          q: "什么算固定成本?",
          a: "在该周期内不随销量变化的部分:房租、保险、基础工资、软件订阅费。凡是随产量变的成本——材料、按单运费、支付通道手续费——都应计入单件变动成本。",
        },
      ],
    },
    ja: {
      name: "損益分岐点計算",
      tagline: "何個売れれば黒字化するか。固定費・単価・変動費から損益分岐点と限界利益、販売量別の利益を計算します。",
      intro: [
        "製品やサービス、小さなビジネスが利益を出す前に、まず自分自身の費用を回収する必要があります。固定費(家賃・ソフトウェア・売上に連動しない人件費)、販売単価、1 個追加でかかる変動費を入力すれば、利益が出始めるまでに何個売ればいいかが分かります。",
        "1 個売れるごとに、その限界利益(単価 − 変動費)が固定費を埋めていきます。シナリオ表は分岐点の 0.5 倍・1.5 倍・2 倍の販売量での利益を示し、閾を超えた後どれほど速く黒字に転換するかを見えます。",
      ],
      steps: [
        "その期間の固定費を入力します。売上ゼロでも払う費用です。",
        "1 個あたりの販売価格を入力します。",
        "1 個の変動費(材料・手数料・直接労務)を入力します。",
        "分岐点の個数と売上を確認し、販売量別の利益表を見ます。",
      ],
      faqs: [
        {
          q: "損益分岐点の計算式は?",
          a: "分岐点個数 = 固定費 ÷(販売単価 − 1 個あたり変動費)。この差が限界利益で、各販売はまず固定費を回収し、埋まり切った後は同じ差額が利益になります。",
        },
        {
          q: "単価が変動費を下回る場合は?",
          a: "その場合、どれだけ売れても損益分岐点には届きません——売るほど赤字です。計算機は 0 を返すのではなく、その旨を正直に表示します。変動費を下げるか単価を上げて、差額をプラスにしてください。",
        },
        {
          q: "固定費には何を入れますか?",
          a: "期間内で販売数に応じて変わらないもの全てです。家賃・保険・基本給・ソフトウェアのサブスクなど。生産量に応じて変わる費用(材料、受注ごとの配送料、決済手数料)は 1 個あたりの変動費に入れてください。",
        },
      ],
    },
    es: {
      name: "Calculadora de punto de equilibrio",
      tagline:
        "Averigua qué volumen e ingresos cubren tus costos fijos: margen por unidad, porcentaje de margen y beneficio a distintos volúmenes.",
      intro: [
        "Antes de que un producto, un servicio o un pequeño negocio genere dinero, tiene que pagarse a sí mismo. Introduce tus costos fijos (alquiler, software, salarios que no varían con el volumen), el precio por unidad y el costo variable de producir una unidad más, y la calculadora te dirá cuántas unidades debes vender antes de que empiece el beneficio.",
        "Cada unidad vendida aporta su margen — precio menos costo variable — a cubrir los costos fijos. La tabla de escenarios muestra el beneficio a la mitad, al año y medio y al doble del volumen de equilibrio, para que veas lo rápido que las pérdidas se vuelven beneficio una vez superado el umbral.",
      ],
      steps: [
        "Introduce tus costos fijos del periodo: los que pagas incluso con ventas cero.",
        "Escribe el precio que cobras por unidad.",
        "Introduce el costo variable de una unidad: materiales, comisiones, mano de obra directa.",
        "Lee las unidades e ingresos de equilibrio y revisa la tabla de beneficio por volumen.",
      ],
      faqs: [
        {
          q: "¿Cuál es la fórmula del punto de equilibrio?",
          a: "Unidades de equilibrio = costos fijos ÷ (precio por unidad − costo variable por unidad). La diferencia es el margen de contribución: cada venta repaga primero los costos fijos y, una vez cubiertos, ese mismo margen se convierte en beneficio.",
        },
        {
          q: "¿Qué pasa si el precio es menor que el costo variable?",
          a: "Entonces ningún volumen alcanza el equilibrio: cada venta pierde dinero. La calculadora lo dice abiertamente en lugar de devolver cero. Baja el costo variable o sube el precio hasta que el margen sea positivo.",
        },
        {
          q: "¿Qué cuenta como costo fijo?",
          a: "Todo lo que no cambia con las unidades vendidas dentro del periodo: alquiler, seguros, salarios base, suscripciones de software. Si un costo escala con la producción — materiales, envío por pedido, comisiones de pago — pertenece al costo variable por unidad.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ponto de equilíbrio",
      tagline:
        "Descubra qual volume e receita cobrem seus custos fixos: margem por unidade, porcentagem de margem e lucro em diferentes volumes.",
      intro: [
        "Antes de um produto, um serviço ou um pequeno negócio dar lucro, ele precisa se pagar. Informe seus custos fixos (aluguel, software, salários que não variam com o volume), o preço por unidade e o custo variável de produzir mais uma unidade, e a calculadora diz quantas unidades você precisa vender até o lucro começar.",
        "Cada unidade vendida contribui com sua margem — preço menos custo variável — para cobrir os custos fixos. A tabela de cenários mostra o lucro na metade, no um e meio e no dobro do volume de equilíbrio, para você ver a velocidade com que o prejuízo vira lucro depois do limiar.",
      ],
      steps: [
        "Informe seus custos fixos do período — os que você paga mesmo sem vender nada.",
        "Digite o preço que você cobra por unidade.",
        "Informe o custo variável de uma unidade: materiais, taxas, mão de obra direta.",
        "Leia as unidades e a receita de equilíbrio e veja a tabela de lucro por volume.",
      ],
      faqs: [
        {
          q: "Qual é a fórmula do ponto de equilíbrio?",
          a: "Unidades de equilíbrio = custos fixos ÷ (preço por unidade − custo variável por unidade). A diferença é a margem de contribuição: cada venda primeiro reembolsa os custos fixos e, cobertos, essa mesma margem vira lucro.",
        },
        {
          q: "E se o preço for menor que o custo variável?",
          a: "Então nenhum volume alcança o equilíbrio: cada venda dá prejuízo. A calculadora avisa isso abertamente em vez de devolver zero. Reduza o custo variável ou aumente o preço até a margem ficar positiva.",
        },
        {
          q: "O que conta como custo fixo?",
          a: "Tudo que não muda com as unidades vendidas no período: aluguel, seguro, salários-base, assinaturas de software. Se um custo escala com a produção — materiais, frete por pedido, taxas de pagamento — ele pertence ao custo variável por unidade.",
        },
      ],
    },
  },
  related: ["loan-calculator", "compound-interest-calculator", "mortgage-calculator"],
});
