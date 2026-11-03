import type { Dictionary } from "../i18n";

const es: Dictionary = {
  brand: "LoanMate",
  tagline: "Calculadoras de hipoteca, préstamos y salario, todo en tu navegador.",
  metaDesc: "Calculadoras financieras gratuitas: cuota hipotecaria con PITI, préstamos e interés compuesto, conversión entre salario y hora, punto de equilibrio. Todo se calcula en tu navegador: tus números no salen de tu dispositivo.",

  nav: {
    tools: "Todas las herramientas",
    categories: "Categorías",
    about: "Acerca de",
    menu: "Menú",
    language: "Idioma",
  },

  home: {
    heroTitle: "Calcula tu cuota hipotecaria antes de hablar con el banco",
    heroSub: "Seis calculadoras para las decisiones de dinero que importan: hipoteca, préstamos, interés compuesto, salario y hora, punto de equilibrio. Gratis, al instante y sin que tus datos salgan del navegador.",
    browseAll: "Ver todas las herramientas",
    categoriesTitle: "Categorías",
    featuredTitle: "Herramientas populares",
    trustLocal: "Tus archivos permanecen en tu dispositivo",
    trustFree: "Gratis, sin cuenta",
    trustFast: "Instantáneo, funciona sin conexión",
    rotating: [
      "¿Un préstamo de 240.000 al 6% a 30 años? Unos 1.439 al mes — mira el calendario completo",
      "100 al mes al 5% durante 10 años se convierten en 32.063 — mira cómo crece el interés",
      "52.000 al año son exactamente 25 la hora — comprueba tu propio salario en segundos",
      "¿Cuántas unidades hasta el equilibrio? Introduce tus costos fijos y verlo",
    ],
    statsLabels: { tools: "herramientas", languages: "idiomas", uploads: "subidas", accounts: "cuentas" },
    eyebrow: "Gratis siempre",
    heroCtaSecondary: "Cómo funciona",
    statsTools: "{n} herramientas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 subidas",
    statsAccounts: "0 cuentas",
    categoriesSub: "Cada calculadora se ejecuta en tu dispositivo: nada se envía a ningún sitio.",
    popularSub: "Las herramientas más usadas.",
    privacyTitle: "Tus archivos nunca salen de tu dispositivo.",
    privacySub: "No existe el paso de subida: las herramientas son JavaScript que corre en tu navegador. No es una promesa de política, es cómo están construidas.",
    privacyPoint1T: "Procesado local",
    privacyPoint1D: "Los archivos se leen con la File API del navegador y se procesan en memoria. Nada se transmite.",
    privacyPoint2T: "Sin cuentas",
    privacyPoint2D: "Ni registro, ni correo, ni historial. Abre y usa.",
    privacyPoint3T: "Honestos por diseño",
    privacyPoint3D: "Si algo no se puede hacer en el navegador, lo decimos en vez de fingir.",
    privacyLink: "Leer la nota de privacidad",
    endTitle: "Elige una herramienta. Funciona.",
    endSub: "5 idiomas, 0 subidas, nada que instalar.",
  },

  tools: {
    title: "Todas las herramientas",
    subtitle: "Busca entre {count} herramientas gratuitas. Sin subidas, sin registro.",
    filterPlaceholder: "Buscar herramientas…",
    count: "{count} herramientas",
    empty: "Ninguna herramienta coincide con «{query}».",
  },

  categories: {
    pdf: { name: "PDF", desc: "Combina, divide, convierte y edita PDF sin subirlos a ningún sitio." },
    image: { name: "Imagen", desc: "Comprime, redimensiona, recorta y convierte imágenes en tu navegador." },
    text: { name: "Texto", desc: "Cuenta, limpia, ordena y transforma texto al instante, mientras escribes." },
    developer: { name: "Desarrollador", desc: "Formateadores, codificadores, decodificadores y generadores para el día a día." },
    seo: { name: "SEO", desc: "Metaetiquetas, datos estructurados, vista previa SERP y más ayuda SEO." },
    security: { name: "Seguridad", desc: "Contraseñas, hashes y consultas: generados y verificados en tu dispositivo." },
    utility: { name: "Calculadoras", desc: "Calculadoras de hipoteca, préstamos, interés compuesto, salario y equilibrio — gratis, instantáneas y privadas." },
  },

  tool: {
    howTo: "Cómo usarlo",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    privacyNote:
      "Esta herramienta funciona por completo en tu navegador. Tus datos nunca salen de tu dispositivo y no se suben a ningún servidor.",
    inCategory: "Más de {category}",
    backToCategory: "Todas las herramientas de {category}",
  },

  common: {
    openTool: "Abrir herramienta",
    copy: "Copiar",
    copied: "Copiado",
    download: "Descargar",
    reset: "Restablecer",
    swap: "Intercambiar",
    clear: "Limpiar",
    error: "Algo salió mal. Revisa los datos e inténtalo de nuevo.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opciones",
    dropFiles: "Suelta los archivos aquí o haz clic para elegirlos",
    dropFile: "Suelta un archivo aquí o haz clic para elegirlo",
    processing: "Procesando…",
    fileSize: "Tamaño",
    sample: "Probar un ejemplo",
    uppercase: "MAYÚSCULAS",
  },

  unit: {
    from: "De",
    to: "A",
    amount: "Cantidad",
    result: "Resultado",
    common: "Conversiones frecuentes",
    formula: "Fórmula",
    allUnits: "Todas las unidades",
  },

  text: {
    stats: {
      words: "Palabras",
      characters: "Caracteres",
      charsNoSpaces: "Sin espacios",
      sentences: "Frases",
      paragraphs: "Párrafos",
      lines: "Líneas",
      readingTime: "Tiempo de lectura",
      readingMinutes: "{n} min de lectura",
    },
  },

  footer: {
    line: "Calculadoras financieras gratuitas. Tus números se quedan en tu dispositivo.",
    privacy: "Privacidad",
    terms: "Términos",
    about: "Acerca de",
    badges: "Insignias",
    language: "Idioma",
  },

  badge: {
    title: "Insignias de LoanMate",
    desc: "Pon una insignia de LoanMate en tu sitio, README o documentación. Enlaza aquí y cuenta que las herramientas funcionan por completo en el navegador.",
    voluntary: "Incrustarla es totalmente voluntario: elige una si te gusta el proyecto. No hace falta permiso.",
    md: "Markdown (README)",
    html: "HTML (web)",
    thanks: "Gracias por pasarlo — cada inserción ayuda a más gente a descubrir herramientas que respetan sus archivos.",
  },

    embed: {
    title: "Insertar esta herramienta",
    desc: "Pon esta herramienta en tu sitio con una línea: se ejecuta en el navegador del visitante.",
  },

    mcp: {
    title: "Servidor MCP — herramientas accesibles para IA",
    desc1: "LoanMate incluye un servidor MCP (Model Context Protocol): asistentes de IA como Claude o Cursor pueden ejecutar las mismas calculadoras financieras de este sitio, con la misma lógica probada y sin reimplementaciones.",
    desc2: "Las herramientas ejecutan las funciones puras propias del sitio: hipoteca, préstamos, interés compuesto, salario y punto de equilibrio. La ejecución ocurre en la máquina del cliente de IA vía npx; nada se envía a nuestros servidores.",
    toolsTitle: "Herramientas ejecutables ({n})",
    requiresNode: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
    privacy: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
  },

    notFound: {
    title: "Página no encontrada",
    body: "La herramienta que buscas no existe. Explora todas las herramientas.",
    home: "Ir a la página principal",
  },
};

export default es;
