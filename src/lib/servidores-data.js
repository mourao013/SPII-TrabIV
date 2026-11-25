/**
 * Camada de Dados e Serviço de Domínio (Servidores do Poder Executivo Federal)
 * Compatível com deploy serverless na Vercel e integração opcional com a API Flask/PostgreSQL
 * via variável de ambiente NEXT_PUBLIC_API_URL.
 */

export const UFS_BRASIL = [
  { sigla: "AC", nome: "Acre", regiao: "Norte" },
  { sigla: "AL", nome: "Alagoas", regiao: "Nordeste" },
  { sigla: "AP", nome: "Amapá", regiao: "Norte" },
  { sigla: "AM", nome: "Amazonas", regiao: "Norte" },
  { sigla: "BA", nome: "Bahia", regiao: "Nordeste" },
  { sigla: "CE", nome: "Ceará", regiao: "Nordeste" },
  { sigla: "DF", nome: "Distrito Federal", regiao: "Centro-Oeste" },
  { sigla: "ES", nome: "Espírito Santo", regiao: "Sudeste" },
  { sigla: "GO", nome: "Goiás", regiao: "Centro-Oeste" },
  { sigla: "MA", nome: "Maranhão", regiao: "Nordeste" },
  { sigla: "MT", nome: "Mato Grosso", regiao: "Centro-Oeste" },
  { sigla: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste" },
  { sigla: "MG", nome: "Minas Gerais", regiao: "Sudeste" },
  { sigla: "PA", nome: "Pará", regiao: "Norte" },
  { sigla: "PB", nome: "Paraíba", regiao: "Nordeste" },
  { sigla: "PR", nome: "Paraná", regiao: "Sul" },
  { sigla: "PE", nome: "Pernambuco", regiao: "Nordeste" },
  { sigla: "PI", nome: "Piauí", regiao: "Nordeste" },
  { sigla: "RJ", nome: "Rio de Janeiro", regiao: "Sudeste" },
  { sigla: "RN", nome: "Rio Grande do Norte", regiao: "Nordeste" },
  { sigla: "RS", nome: "Rio Grande do Sul", regiao: "Sul" },
  { sigla: "RO", nome: "Rondônia", regiao: "Norte" },
  { sigla: "RR", nome: "Roraima", regiao: "Norte" },
  { sigla: "SC", nome: "Santa Catarina", regiao: "Sul" },
  { sigla: "SP", nome: "São Paulo", regiao: "Sudeste" },
  { sigla: "SE", nome: "Sergipe", regiao: "Nordeste" },
  { sigla: "TO", nome: "Tocantins", regiao: "Norte" },
];

export const CARGOS_DOMINIO = [
  "PROFESSOR DO MAGISTERIO SUPERIOR",
  "TECNICO EM ASSUNTOS EDUCACIONAIS",
  "ANALISTA TRIBUTARIO DA RECEITA FEDERAL",
  "AUDITOR FISCAL DA RECEITA FEDERAL",
  "AGENTE ADMINISTRATIVO",
  "MEDICO",
  "ENFERMEIRO",
  "ASSISTENTE EM ADMINISTRACAO",
  "ENGENHEIRO CIVIL",
  "AGENTE DE POLICIA FEDERAL",
  "PESQUISADOR EM CIENCIA E TECNOLOGIA",
  "ANALISTA DE INFRAESTRUTURA",
  "TECNICO DO SEGURO SOCIAL",
  "ANALISTA DO SEGURO SOCIAL",
  "PROFESSOR ENS BASICO TECN TECNOLOGICO",
  "ADMINISTRADOR",
  "CONTADOR",
  "BIBLIOTECARIO-DOCUMENTALISTA",
  "ECONOMISTA",
  "ANALISTA DE TECNOLOGIA DA INFORMACAO",
];

export const ORGAOS_DOMINIO = [
  "MINISTERIO DA SAUDE",
  "MINISTERIO DA EDUCACAO",
  "INSTITUTO NACIONAL DO SEGURO SOCIAL",
  "UNIVERSIDADE FEDERAL DE MINAS GERAIS",
  "UNIVERSIDADE DE BRASILIA",
  "MINISTERIO DA FAZENDA",
  "DEPARTAMENTO DE POLICIA FEDERAL",
  "UNIVERSIDADE FEDERAL DO RIO DE JANEIRO",
  "INSTITUTO FEDERAL DE SAO PAULO",
  "FUNDACAO OSWALDO CRUZ",
  "MINISTERIO DA GESTAO E DA INOVACAO EM SERVICOS PUBLICOS",
  "UNIVERSIDADE FEDERAL DO PARANA",
  "INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATISTICA",
  "UNIVERSIDADE FEDERAL DA BAHIA",
  "MINISTERIO DA AGRICULTURA E PECUARIA",
];

const PRENOMES = [
  "ANA", "MARIA", "JOSE", "JOAO", "ANTONIO", "FRANCISCO", "CARLOS", "PAULO",
  "PEDRO", "LUCAS", "LUIZ", "MARCOS", "GABRIEL", "RAFAEL", "DANIEL", "MARCELO",
  "BRUNO", "FERNANDA", "JULIANA", "PATRICIA", "ALINE", "SANDRA", "CAMILA",
  "AMANDA", "BRUNA", "LETICIA", "JULIA", "LUCIANA", "MARIANA", "GABRIELA",
  "ROBERTO", "RICARDO", "EDUARDO", "RODRIGO", "GUSTAVO", "FELIPE", "BEATRIZ",
  "LARISSA", "CAROLINA", "HELENA",
];

const SOBRENOMES = [
  "SILVA", "SANTOS", "OLIVEIRA", "SOUZA", "RODRIGUES", "FERREIRA", "ALVES",
  "PEREIRA", "LIMA", "GOMES", "COSTA", "RIBEIRO", "MARTINS", "CARVALHO",
  "ALMEIDA", "LOPES", "SOARES", "FERNANDES", "VIEIRA", "BARBOSA", "ROCHA",
  "DIAS", "NASCIMENTO", "ANDRADE", "MOREIRA", "NUNES", "MARQUES", "MACHADO",
  "MENDES", "FREITAS", "CARDOSO", "MOURAO",
];

const TIPOS_APOSENTADORIA = [
  "VOLUNTARIA INTEGRAL",
  "COMPULSORIA",
  "INVALIDEZ PERMANENTE",
  "ESPECIAL MAGISTERIO",
];

export function normalizarTexto(texto = "") {
  return String(texto)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

/**
 * Gerador pseudo-aleatório determinístico (LCG) para manter exatamente os mesmos
 * servidores em tempo de build (SSG), revalidação (ISR) e SSR/API.
 */
function criarGerador(semente = 42) {
  let estado = semente;
  return () => {
    estado = (estado * 1664525 + 1013904223) % 4294967296;
    return estado / 4294967296;
  };
}

let _cacheBase = null;

export function obterBaseServidores() {
  if (_cacheBase) return _cacheBase;

  const rnd = criarGerador(171075);
  const lista = [];
  const total = 1200;

  for (let i = 1; i <= total; i++) {
    const p1 = PRENOMES[Math.floor(rnd() * PRENOMES.length)];
    const s1 = SOBRENOMES[Math.floor(rnd() * SOBRENOMES.length)];
    let s2 = SOBRENOMES[Math.floor(rnd() * SOBRENOMES.length)];
    if (s2 === s1) s2 = SOBRENOMES[(i + 7) % SOBRENOMES.length];

    const nome = `${p1} ${s1} ${s2}`;
    const aposentado = rnd() < 0.42;
    const cargo = CARGOS_DOMINIO[Math.floor(rnd() * CARGOS_DOMINIO.length)];
    const orgao = ORGAOS_DOMINIO[Math.floor(rnd() * ORGAOS_DOMINIO.length)];
    const ufObj = UFS_BRASIL[Math.floor(rnd() * UFS_BRASIL.length)];

    const anoIngresso = 1978 + Math.floor(rnd() * 42);
    const mesIngresso = String(1 + Math.floor(rnd() * 12)).padStart(2, "0");
    const diaIngresso = String(1 + Math.floor(rnd() * 28)).padStart(2, "0");
    const dataIngresso = `${anoIngresso}-${mesIngresso}-${diaIngresso}`;

    const anoApos = Math.min(2025, anoIngresso + 25 + Math.floor(rnd() * 12));
    const dataAposentadoria = aposentado ? `${anoApos}-${mesIngresso}-${diaIngresso}` : null;

    const c1 = String(100 + Math.floor(rnd() * 900));
    const c2 = String(100 + Math.floor(rnd() * 900));

    lista.push({
      id: i,
      nome,
      nome_busca: nome,
      cpf_mascarado: `***.${c1}.${c2}-**`,
      matricula: String(1000000 + i),
      situacao: aposentado ? "APOSENTADO" : "ATIVO",
      cargo,
      orgao,
      uf: ufObj.sigla,
      uf_nome: ufObj.nome,
      regiao: ufObj.regiao,
      tipo_aposentadoria: aposentado
        ? TIPOS_APOSENTADORIA[Math.floor(rnd() * TIPOS_APOSENTADORIA.length)]
        : null,
      data_ingresso: dataIngresso,
      data_aposentadoria: dataAposentadoria,
      jornada: aposentado ? "INATIVO / PROVENTOS" : "40 HORAS SEMANAIS",
      regime_juridico: "ESTATUTARIO (LEI 8.112/1990)",
    });
  }

  _cacheBase = lista;
  return lista;
}
