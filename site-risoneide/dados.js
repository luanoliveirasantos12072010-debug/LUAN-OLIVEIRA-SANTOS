// =====================================================================
//  DADOS DO SITE — edite aqui para atualizar o conteúdo da página.
//  Tudo foi copiado do perfil original (vídeo enviado em 05/10/2026).
// =====================================================================
window.DADOS = {
  nome: "Risoneide Gomes Xavier",
  primeiroNome: "Risoneide",
  profissao: "Psicóloga",
  cidade: "Petrolina",
  registro: "CRP PE 07436",
  foto: "img/foto.jpg",

  // PREENCHER: só números, com DDI e DDD. Ex.: "5587999999999".
  // Os formulários enviam a mensagem para este WhatsApp.
  whatsapp: "558791542626",
  // PREENCHER (opcional): telefone para exibir e e-mail de contato.
  telefone: "(87) 9154-2626",
  email: "",

  nota: 5,

  // AVALIAÇÕES SALVAS NO SITE (para todos os visitantes)
  // Crie um projeto grátis em https://supabase.com e cole aqui a "Project URL"
  // e a chave "anon public" (veja o passo a passo no LEIA-ME.md).
  // Enquanto estiver vazio, cada avaliação fica salva só no aparelho de quem avaliou.
  supabaseUrl: "",
  supabaseChave: "",

  // ---------------- EXPERIÊNCIA ----------------
  formacao: [
    "Psicologia — UNICAP (Universidade Católica de Pernambuco)",
    "Especialização em Psicologia Clínica",
    "Especialização em Saúde Mental e Psicologia Organizacional",
  ],
  sobreResumo: "Formada pela UNICAP,especialista em psicologia clínica , saúde mental e organizacional.",
  sobreTexto: "Crise existencial, depressão, pânico, ansiedade, luto, conflito casal, mudanças de vida, dificuldade nos relacionamentos, avaliação vasectomia, insônia....",
  trabalhoComo: ["Psicóloga"],
  abordagens: ["Terapia de casal", "Psicoterapia"],
  experienciaEm: ["Saúde mental"],
  experienciaEmDetalhes: ["Terapia de Casal", "Psicoterapia", "Saúde Mental"],
  doencas: [
    "Agitação Psicomotora", "Ansiedade", "Ansiedade da Separação", "Ansiedade e medo de dirigir", "Angústia",
    "Crise existencial", "Depressão", "Síndrome do pânico", "Luto", "Conflito de casal", "Mudanças de vida",
    "Dificuldade nos relacionamentos", "Avaliação para vasectomia", "Insônia", "Estresse", "Transtorno depressivo",
  ],
  pacientes: [
    { icone: "adulto", texto: "Adultos" },
    { icone: "crianca", texto: "Crianças a partir dos 16 anos de idade" },
  ],
  idiomas: ["Português"],
  pagamentos: ["PIX", "Dinheiro", "Depósito Bancário", "Reembolso do plano de saúde (com recibo)"],

  // ---------------- CONSULTÓRIOS ----------------
  consultorios: {
    tele: {
      aba: "Teleconsulta",
      titulo: "Teleconsulta",
      preparo: "Prepare-se 10 minutos antes da consulta e verifique se o seu smartphone ou notebook está com a bateria carregada. Para uma videochamada, verifique se tudo funciona: conexão com a internet, câmera e microfone. Prepare também a documentação médica (como resultado de um exame) caso precise mostrar na consulta.",
    },
    end: {
      aba: "Endereço",
      titulo: "R. Joaquim Nabuco, 541 - 1°andar sala 108, Petrolina",
      local: "Empresarial Trade Center Dom Campelo",
      mapa: "R. Joaquim Nabuco, 541, Petrolina - PE",
    },
  },

  planos: [{ nome: "Outro (Reembolso)" }],

  // ---------------- SERVIÇOS ----------------
  // preco: texto da lista | precoModal: texto dentro de "Detalhes"
  // locais: "end" = consultório, "tele" = teleconsulta
  servicos: [
    { nome: "Primeira consulta psicologia", preco: "R$ 200", precoModal: "200 R$", locais: ["end"] },
    { nome: "Psicoterapia adulto", preco: "R$ 380", precoModal: "380 R$", locais: ["end"] },
    { nome: "Tratamento da depressão", preco: "A partir de R$ 300", precoModal: "Desde 300 R$", locais: ["end"] },
    { nome: "Tratamento da ansiedade", preco: "A partir de R$ 250", precoModal: "Desde 250 R$", locais: ["end"] },
    { nome: "Terapia Familiar", preco: null, locais: ["end"] },
    { nome: "Terapia de Casal", preco: "R$ 400", precoModal: "400 R$", locais: ["end", "tele"] },
    { nome: "Psicoterapia Psicanalítica", preco: null, locais: ["end"] },
    { nome: "Psicoterapia de Grupo", preco: "R$ 200", precoModal: "200 R$", locais: ["end"] },
    { nome: "Psicoterapia breve", preco: "R$ 200", precoModal: "200 R$", locais: ["end"] },
    { nome: "Orientação Vocacional", preco: null, locais: ["end"] },
    { nome: "Teleconsulta", preco: "A partir de R$ 200", precoModal: "Desde 200 R$", locais: ["tele"], temDescricao: true },
    { nome: "Orientação profissional", preco: null, locais: ["end"] },
    { nome: "Orientação aos pais", preco: null, locais: ["end"] },
    { nome: "Mudança de comportamento alimentar", preco: null, locais: ["end"] },
    { nome: "Consulta psicológica do idoso", preco: "R$ 250", precoModal: "250 R$", locais: ["tele", "end"] },
    { nome: "Consulta psicológica do adulto", preco: "R$ 250", precoModal: "250 R$", locais: ["tele", "end"] },
    { nome: "Consulta psicológica do adolescente", preco: "A partir de R$ 250", precoModal: "Desde 250 R$", locais: ["end"] },
    { nome: "Psicoterapia", preco: "A partir de R$ 200", precoModal: "Desde 200 R$", locais: ["end"],
      descricao: "A primeira consulta presencial o valor é 280,00, o tempo é maior,  será uma avaliação do planejamento do Trabalho a ser desenvolvido. As próximas sessões  podem  ser negociadas ." },
    { nome: "Tratamento da síndrome do pânico", preco: "R$ 250", precoModal: "250 R$", locais: ["end"] },
  ],

  // ---------------- OPINIÕES ----------------
  // tipo: "opiniao" = Opinião Verificada | "consulta" = Consulta verificada
  opinioes: [
    { autor: "G.R.", tipo: "opiniao", data: "21 de agosto de 2026", local: "Teleconsulta", servico: "Consulta psicológica do adulto",
      texto: "Profissional transmite muita confiança e domínio do assunto, deixando você mais segura e tranquila durante a sessão. Pontual e muito atenta às queixas e com a evolução do paciente; excelente profissional, eu super recomendo." },
    { autor: "ALMNA", tipo: "opiniao", data: "19 de agosto de 2026", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Maravilhosa!! Atendimento humanizado, me sinto ouvida com atenção do início ao fim. Realmente percebi resultados positivos em minha qualidade de vida!" },
    { autor: "Tiago Martins da Silva", tipo: "consulta", data: "21 de junho de 2026", local: "Empresarial Trade Center Dom Campelo", servico: "Primeira consulta psicologia",
      texto: "ótima profissional , gostei muito e super indico" },
    { autor: "S. W.", tipo: "consulta", data: "16 de junho de 2026", local: "Empresarial Trade Center Dom Campelo", servico: "Primeira consulta psicologia",
      texto: "Gostei muito da consulta, forma que atende, calma, consultório aconchegante. Espero voltar outras vezes." },
    { autor: "Ceany", tipo: "opiniao", data: "20 de abril de 2026", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Doutora Risoneide eu nunca a esqueço a senhora foi um marco divisor da minha vida. Acho que minha vida mudou muito, passei a ver muitas coisas com outro ponto de vista. Foi muito bom pra mim, não tem como eu esquecer. Deus te abençoe!" },
    { autor: "Taynara", tipo: "consulta", data: "14 de janeiro de 2026", local: "Empresarial Trade Center Dom Campelo", servico: "Primeira consulta psicologia",
      texto: "Consulta maravilhosa. Sai flutuando . Profissional muito excelente." },
    { autor: "Carlos Alberto Martins", tipo: "opiniao", data: "18 de novembro de 2025", local: "Teleconsulta", servico: "Teleconsulta",
      texto: "Dra. Risoneide me atende (on-Line) a 4 meses, pois sou de SP. Tenho Depressão e fiquei 2 meses sem sair de casa. Atualmente consigo conviver socialmente. Continuo a psicoterapia e só tenho agradecimentos. \"Salvou minha vida\"." },
    { autor: "Arantes", tipo: "opiniao", data: "17 de novembro de 2025", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Excelente profissional, capacitada, inteligente, muito bem preparada, domina a técnica terapêutica com grande conhecimento. Pode confiar com total plenitude. SUPER INDICO.." },
    { autor: "Wagner", tipo: "consulta", data: "9 de julho de 2025", local: "Empresarial Trade Center Dom Campelo", servico: "Consulta psicológica do adulto",
      texto: "Passou segurança e experiência. Boa comunicação." },
    { autor: "Maria Dalvania", tipo: "opiniao", data: "14 de abril de 2025", local: "outro lugar", servico: "Outro",
      texto: "Dr. Risoneide é uma excelente profissional, depois que eu comecei minhas terapias cm ela. Eu melhorei bastante, minhas crises de ansiedade diminuíram muito e eu tô conseguindo dormir bem." },
    { autor: "Clara Campos", tipo: "opiniao", data: "12 de fevereiro de 2025", local: "outro lugar", servico: "Outro",
      texto: "Excelente profissional. Ótima conduta. Foi o processo mais importante da minha vida e pude me sentir mais forte e me conhecer mais e Risoneide foi fundamental para isso. Sou muito grata pela oportunidade de conhecê-la." },
    { autor: "M.F.", tipo: "opiniao", data: "12 de fevereiro de 2025", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Maturidade profissional, excelente acolhida, total foco nas questões levantadas e nas saídas propostas, tive êxito nos dois períodos em que fui acompanhada. Gratas recomendações" },
    { autor: "Regiane", tipo: "opiniao", data: "12 de fevereiro de 2025", local: "outro lugar", servico: "Outro",
      texto: "Excelente profissional, fiquei com ela uns 8 meses e o resultado veio! Só gratidão!" },
    { autor: "danny", tipo: "opiniao", data: "6 de novembro de 2024", local: "Empresarial Trade Center Dom Campelo", servico: "Terapia de Casal",
      texto: "atendimento otimo explicou muito bem gostei muito do atendimento" },
    { autor: "Richardson Barbosa", tipo: "consulta", data: "6 de novembro de 2024", local: "Empresarial Trade Center Dom Campelo", servico: "Terapia de Casal",
      texto: "Gratidão pelo atendimento, equilíbrio e acertos nas palavras" },
    { autor: "Eline Maria Feitosa", tipo: "consulta", data: "5 de novembro de 2024", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Excelente abordagem terapêutica, pontualidade, comprometimento e asservidade!!" },
    { autor: "Cinthya nallyane de Siqueira alves caldeira", tipo: "consulta", data: "30 de outubro de 2024", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Estou com risoneide as mas 2 anos e mesmo tento ido embora continuo on line por que confio na sua conduta e na eficácia do acompanhamento" },
    { autor: "Fatima", tipo: "consulta", data: "30 de outubro de 2024", local: "Empresarial Trade Center Dom Campelo", servico: "Psicoterapia",
      texto: "Muito bom,profissional comprometida com o trabalho q faz" },
  ],

  // ---------------- DÚVIDAS RESPONDIDAS ----------------
  // As respostas apareciam cortadas no vídeo ("...mais"). Complete o texto
  // em "resposta" se quiser mostrar a resposta inteira.
  duvidas: [
    { titulo: "Olá! Tenho diagnóstico de TPPP (Tontura Postural Perceptual Persistente) dado por um otoneurologista",
      pergunta: "Olá! Tenho diagnóstico de TPPP (Tontura Postural Perceptual Persistente) dado por um otoneurologista. Ele disse que sofro de hipervigilância e que devo tratar isso com psicoterapia. Não entendi ainda o que é essa hipervigilância e como a psicoterapia pode me auxiliar nisso. Poderiam me ajudar, por favor? Agradecido.",
      resposta: "Tudo indica, que sua mente está liberando substâncias que ativam o cérebro, como se estivesse em perigo. Como o médico já avaliou que não existem questões de ordem física , precisa rever sua história..." },
    { titulo: "Como saber se estou em um relacionamento abusivo ou se é apenas uma fase ruim?",
      pergunta: "Como saber se estou em um relacionamento abusivo ou se é apenas uma fase ruim?",
      resposta: "As relações abusivas geralmente começam bem, a pessoa demonstra compreender suas necessidades emocionais e aceitar você com sua história. Mas, já pode indicar pequenos sinais, muitas vezes..." },
  ],
};
