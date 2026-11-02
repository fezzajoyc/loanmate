import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "LoanMate",
  tagline: "住宅ローン・ローン・給与の計算が、ブラウザで完結。",
  metaDesc: "無料の金融計算ツール:住宅ローンの月返済額と PITI、ローンと複利、年収と時給の換算、損益分岐点。すべてブラウザ内で計算され、数値は端末から出ません。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "住宅ローン、毎月の返済額を契約前に確かめる",
    heroSub: "お金の決断に必要な計算を 6 つに絞りました:住宅ローン、ローン、複利、年収と時給の換算、損益分岐点。無料ですぐ計算でき、数値はブラウザから出ません。",
    browseAll: "すべてのツールを見る",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "ファイルは端末内に留存",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating: [
      "3,000 万円・金利 6%・30 年なら月々約 18 万円——返済計画を先に見る",
      "毎月 1 万円を年利 5% で 10 年積み立てると約 155 万円——複利の力を見る",
      "年収 520 万円・週 40 時間は時給 2,500 円——あなたの時間の値段を確認",
      "固定費 100 万円・1 個の利益 2,000 円なら 500 個で黒字——自分の事業で試す",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "どの計算も端末上で実行され、数値がどこかへ送られることはありません。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "ファイルは、あなたのデバイスから出ません。",
    privacySub: "アップロードという工程が存在しません。ツールはブラウザ内で動く JavaScript そのものです。ポリシーではなく構造の話です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "ファイルはブラウザの File API で読み込み、メモリ内で処理されます。送信は一切ありません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "ツールを選んで、すぐ使える。",
    endSub: "5 言語、アップロード 0、インストール不要。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像", desc: "画像の圧縮・リサイズ・切り抜き・形式変換をブラウザ内で。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "日々の開発に使うフォーマッタ・エンコーダ・ジェネレータ。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "電卓", desc: "住宅ローン・ローン・複利・給与・損益分岐点の計算ツール。無料で即時、保存なし。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "無料の金融計算ツール。入力した数値は端末から出ません。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "LoanMate バッジ",
    desc: "あなたのサイトや README、ドキュメントに LoanMate バッジを置いてみてください。このサイトへリンクし、ツールが完全にブラウザ内で動くことを伝えます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "LoanMate は MCP(Model Context Protocol)サーバーを提供しています。Claude や Cursor などの AI アシスタントが、サイトと同じテスト済みロジックの金融計算をそのまま実行できます。",
    desc2: "ツールはサイト独自の純粋関数(住宅ローン・ローン・複利・給与換算・損益分岐点)を動かします。実行は npx 経由で AI クライアント側のマシン上で行われ、当社サーバーには何も送信されません。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;
