// it: dizionario UI italiano — forma chiavi identica a en (tests/seo.test.ts fa un confronto ricorsivo).
// Registro informale ("tu"), coerente con il resto del sito. "LoanMate" e i segnaposto {n}/{count}/{query}/{category} restano intatti.
const it = {
  brand: "LoanMate",
  tagline: "Calcolatori per mutuo, prestiti e stipendio, direttamente nel browser.",
  metaDesc: "Calcolatori finanziari gratuiti: rata del mutuo con PITI, prestiti e interesse composto, conversione tra salario e paga oraria, punto di pareggio. Tutto si calcola nel browser: i tuoi numeri non lasciano il dispositivo.",

  nav: {
    tools: "Tutti gli strumenti",
    categories: "Categorie",
    about: "Chi siamo",
    menu: "Menu",
    language: "Lingua",
  },

  home: {
    heroTitle: "Scopri la rata del mutuo prima di parlare con la banca",
    heroSub: "Sei calcolatori per le decisioni di denaro che contano: mutuo, prestiti, interesse composto, stipendio e paga oraria, punto di pareggio. Gratis, immediati, nulla esce dal tuo browser.",
    browseAll: "Sfoglia tutti gli strumenti",
    pinned: "Fissati",
    pin: "Fissa in alto",
    unpin: "Rimuovi dai fissati",
    popular: "Popolari adesso",
    categoriesTitle: "Categorie",
    featuredTitle: "Strumenti popolari",
    trustLocal: "I file restano sul tuo dispositivo",
    trustFree: "Gratis, senza account",
    trustFast: "Istantaneo, funziona offline",
    rotating: [
      "Un prestito di 240.000 al 6% in 30 anni? Circa 1.439 al mese — guarda il piano completo",
      "100 al mese al 5% per 10 anni diventano 32.063 — guarda gli interessi accumularsi",
      "52.000 all'anno sono esattamente 25 all'ora — verifica il tuo stipendio in pochi secondi",
      "Quante unità per arrivare al pareggio? Inserisci i tuoi costi fissi",
    ],
    statsLabels: { tools: "strumenti", languages: "lingue", uploads: "upload", accounts: "account" },
    eyebrow: "Gratis per sempre",
    heroCtaSecondary: "Come funziona",
    statsTools: "{n} strumenti",
    statsLanguages: "{n} lingue",
    statsUploads: "0 upload",
    statsAccounts: "0 account",
    categoriesSub: "Ogni calcolatore gira sul tuo dispositivo — nulla viene inviato da nessuna parte.",
    popularSub: "Gli strumenti che le persone aprono più spesso.",
    privacyTitle: "I tuoi file non lasciano mai il tuo dispositivo.",
    privacySub:
      "Non esiste un passaggio di upload. Gli strumenti sono JavaScript in esecuzione nel tuo browser: non è una promessa in una privacy policy, è come sono costruiti.",
    privacyPoint1T: "Elaborazione locale",
    privacyPoint1D:
      "I file vengono letti con la File API del browser ed elaborati in memoria. Nulla viene trasmesso, da nessuna parte.",
    privacyPoint2T: "Nessun account",
    privacyPoint2D: "Niente registrazione, niente email, niente cronologia salvata. Apri uno strumento e usalo.",
    privacyPoint3T: "Onesti per costruzione",
    privacyPoint3D:
      "Se qualcosa non si può davvero fare nel browser, lo diciamo invece di fingere il contrario.",
    privacyLink: "Leggi la nota privacy completa",
    endTitle: "Scegli uno strumento. Funziona, e basta.",
    endSub: "Cinque lingue, zero upload, niente da installare.",
  },

  tools: {
    title: "Tutti gli strumenti",
    subtitle: "Cerca tra {count} strumenti gratuiti nel browser. Nessun upload, nessuna registrazione.",
    filterPlaceholder: "Cerca strumenti…",
    count: "{count} strumenti",
    empty: "Nessuno strumento corrisponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Unisci, dividi, converti e modifica file PDF senza caricarli da nessuna parte." },
    image: { name: "Immagini", desc: "Comprimi, ridimensiona, ritaglia e converti immagini direttamente nel tuo browser." },
    text: { name: "Testo", desc: "Conta, pulisci, ordina e trasforma il testo all'istante, mentre scrivi." },
    developer: { name: "Sviluppo", desc: "Formattatori, codificatori, decodificatori e generatori per il lavoro di ogni giorno." },
    seo: { name: "SEO", desc: "Meta tag, markup schema, anteprima SERP e altri aiuti per la SEO on-page." },
    security: { name: "Sicurezza", desc: "Password, hash e ricerche — generati e verificati sul tuo dispositivo." },
    utility: { name: "Calcolatori", desc: "Calcolatori per mutuo, prestiti, interesse composto, stipendio e pareggio — gratuiti, istantanei e privati." },
  },

  tool: {
    howTo: "Come si usa",
    faq: "Domande frequenti",
    related: "Strumenti correlati",
    nextStep: "Passaggi successivi",
    copyLink: "Copia link",
    privacyNote:
      "Questo strumento gira interamente nel tuo browser. I tuoi dati non lasciano mai il dispositivo: non vengono caricati su nessun server.",
    inCategory: "Altri in {category}",
    backToCategory: "Tutti gli strumenti {category}",
  },

  common: {
    openTool: "Apri strumento",
    copy: "Copia",
    copied: "Copiato",
    download: "Scarica",
    reset: "Reimposta",
    swap: "Inverti",
    clear: "Svuota",
    error: "Qualcosa è andato storto. Controlla i dati inseriti e riprova.",
    input: "Input",
    output: "Risultato",
    settings: "Opzioni",
    dropFiles: "Trascina qui i file o clicca per sceglierli",
    dropFile: "Trascina qui un file o clicca per sceglierlo",
    processing: "Elaborazione…",
    fileSize: "Dimensione",
    sample: "Prova un esempio",
    uppercase: "MAIUSCOLO",
  },

  unit: {
    from: "Da",
    to: "A",
    amount: "Quantità",
    result: "Risultato",
    common: "Conversioni comuni",
    formula: "Formula",
    allUnits: "Tutte le unità",
  },

  text: {
    stats: {
      words: "Parole",
      characters: "Caratteri",
      charsNoSpaces: "Senza spazi",
      sentences: "Frasi",
      paragraphs: "Paragrafi",
      lines: "Righe",
      readingTime: "Tempo di lettura",
      readingMinutes: "{n} min di lettura",
    },
  },

  footer: {
    line: "Calcolatori finanziari gratuiti. I tuoi numeri restano sul tuo dispositivo.",
    privacy: "Privacy",
    terms: "Termini",
    about: "Chi siamo",
    badges: "Badge",
    language: "Lingua",
  },

  badge: {
    title: "Badge LoanMate",
    desc: "Metti un badge LoanMate sul tuo sito, nel README o nella documentazione. Rimanda qui e racconta che gli strumenti dietro a quel badge girano interamente nel browser.",
    voluntary: "L'incorporamento è del tutto volontario: scegli un badge se il progetto ti piace. Non serve alcun permesso.",
    md: "Markdown (README)",
    html: "HTML (sito web)",
    thanks: "Grazie per spargere la voce: ogni incorporamento aiuta più persone a scoprire strumenti che rispettano i loro file.",
  },

    embed: {
    title: "Incorpora questo strumento",
    desc: "Metti questo strumento sul tuo sito con una riga: gira nel browser del visitatore.",
  },

    mcp: {
    title: "Server MCP — strumenti accessibili all'IA",
    desc1: "LoanMate offre un server MCP (Model Context Protocol): gli assistenti IA come Claude o Cursor eseguono gli stessi calcolatori finanziari di questo sito — stessa logica testata, nessuna reimplementazione.",
    desc2: "Gli strumenti eseguono le funzioni pure del sito: mutuo, prestiti, interesse composto, salario e punto di pareggio. L'esecuzione avviene sulla macchina del client IA via npx — nulla viene inviato ai nostri server.",
    toolsTitle: "Strumenti eseguibili ({n})",
    requiresNode: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
    privacy: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
  },

    notFound: {
    title: "Pagina non trovata",
    body: "Lo strumento che cerchi non esiste. Sfoglia invece tutti gli strumenti.",
    home: "Vai alla homepage",
  },
};

export default it;
