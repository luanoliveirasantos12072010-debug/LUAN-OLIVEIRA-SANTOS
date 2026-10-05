// =====================================================================
//  DADOS DO SITE — edite aqui para atualizar o conteúdo da página.
//  Campos marcados com "PREENCHER" estão vazios porque não apareciam
//  no print do perfil.
// =====================================================================
window.DADOS = {
  nome: "Risoneide Gomes Xavier",
  profissao: "Psicóloga",
  cidade: "Petrolina",
  estado: "PE",
  registro: "CRP PE 07436",

  // Foto de perfil: coloque o arquivo em site-risoneide/img/foto.jpg
  // (se a foto não existir, aparecem as iniciais no lugar).
  foto: "img/foto.jpg",

  // PREENCHER: só números, com DDI e DDD. Ex.: "5587999999999"
  whatsapp: "",
  // PREENCHER: telefone para exibir. Ex.: "(87) 99999-9999"
  telefone: "",
  // PREENCHER: e-mail de contato (opcional)
  email: "",

  // Link do perfil original (usado em "Ver todas as opiniões")
  linkPerfilOriginal: "https://www.doctoralia.com.br/risoneide-gomes-xavier/psicologo/petrolina",

  nota: 5,
  totalOpinioes: 18,

  formacao: [
    "Psicologia — UNICAP (Universidade Católica de Pernambuco)",
    "Especialização em Psicologia Clínica",
    "Especialização em Saúde Mental e Psicologia Organizacional",
  ],

  sobreResumo:
    "Formada pela UNICAP, especialista em psicologia clínica, saúde mental e organizacional.",
  sobreTexto:
    "Crise existencial, depressão, pânico, ansiedade, luto, conflito de casal, mudanças de vida, dificuldade nos relacionamentos, avaliação para vasectomia, insônia.",

  abordagens: ["Terapia de casal", "Psicoterapia"],
  experienciaEm: ["Saúde mental"],

  doencas: [
    "Agitação Psicomotora",
    "Ansiedade",
    "Ansiedade da Separação",
    "Ansiedade e medo de dirigir",
    "Angústia",
    "Crise existencial",
    "Depressão",
    "Síndrome do pânico",
    "Luto",
    "Conflito de casal",
    "Mudanças de vida",
    "Dificuldade nos relacionamentos",
    "Avaliação para vasectomia",
    "Insônia",
  ],

  pacientes: [
    { icone: "adulto", texto: "Adultos" },
    { icone: "crianca", texto: "Crianças a partir dos 16 anos de idade" },
  ],

  servicos: [
    { nome: "Primeira consulta psicologia", preco: "R$ 200",
      detalhes: "Primeiro encontro para conhecer sua demanda, sua história e definir juntos o melhor caminho terapêutico." },
    { nome: "Psicoterapia adulto", preco: "R$ 380",
      detalhes: "Acompanhamento psicoterapêutico individual para adultos." },
    { nome: "Tratamento da depressão", preco: "A partir de R$ 300",
      detalhes: "Acompanhamento psicológico para quadros depressivos." },
    { nome: "Tratamento da ansiedade", preco: "A partir de R$ 250",
      detalhes: "Acompanhamento psicológico para ansiedade, pânico e preocupações excessivas." },
    { nome: "Terapia Familiar", preco: null,
      detalhes: "Atendimento voltado para a dinâmica e os conflitos familiares. Entre em contato para consultar valores." },
    // PREENCHER: o perfil original tinha mais 14 serviços que não
    // apareciam no print. Adicione aqui no mesmo formato.
  ],

  consultorios: [
    { tipo: "teleconsulta", titulo: "Teleconsulta" },
    // Endereço encontrado em busca na web; confirme o número da sala.
    { tipo: "endereco", titulo: "Clínica Joaquim Nabuco", endereco: "R. Joaquim Nabuco, 541 - Centro, Petrolina - PE" },
  ],

  formasPagamento: ["Convênios médicos aceitos neste endereço"],
  planos: [{ nome: "Outro (Reembolso)", obs: "(Não disponível para agendamentos online)" }],

  // Opiniões dos pacientes. O print não mostrava os textos; adicione aqui
  // no formato abaixo (use apenas iniciais para preservar os pacientes):
  // { autor: "M. S.", data: "2025-03-10", nota: 5, texto: "..." },
  opinioes: [],
};
