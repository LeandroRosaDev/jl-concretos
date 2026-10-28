import { linkWhatsapp } from "@/lib/whatsapp"
import type {
  Diferencial,
  FaqItem,
  Bandeira,
  HeroSlide,
  HomeSection,
  NavLink,
  Obra,
  Post,
  RedeSocial,
  Servico,
  SiteConfig,
  Vendedor,
} from "@/types/site"

const leo = linkWhatsapp("5521970192706", "Léo")
const junior = linkWhatsapp("5521964099610", "Junior")

export const siteConfig: SiteConfig = {
  nome: "JL Concreto Usinado",
  frase: "Concreteira com usina própria em Duque de Caxias. Concreto direto da fonte para a sua obra.",
  url: "https://jlconcretousinado.com.br",
  telefone: "(21) 97019-2706",
  telefoneHref: "tel:+5521970192706",
  whatsapp: "(21) 97019-2706",
  whatsappHref: leo,
  email: "contato@jlconcretousinado.com.br",
  emails: [
    { rotulo: "Contato", email: "contato@jlconcretousinado.com.br" },
    { rotulo: "Comercial", email: "jlconcreto2020@gmail.com" },
  ],
  horario: "Segunda a sexta, das 7h às 18h. Sábado, das 7h às 12h.",
  horarioCurto: "Segunda a sexta, 7h às 18h · Sábado, 7h às 12h",
  endereco:
    "Rua Crateus, s/n, Quadra 05, Lote 05, Chácara Rio Petrópolis, Duque de Caxias — RJ",
  enderecoLinhas: [
    "Rua Crateus, s/n — Quadra 05, Lote 05",
    "Chácara Rio Petrópolis — Duque de Caxias",
  ],
  mapaEmbed:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sRua+Crateus,+Ch%C3%A1cara+Rio+Petr%C3%B3polis,+Duque+de+Caxias,+RJ!6i16!3m1!1spt-BR!5m1!1spt-BR",
  mapaHref:
    "https://www.google.com/maps/search/?api=1&query=Rua+Crateus+Chacara+Rio+Petropolis+Duque+de+Caxias",
  cidade: "Duque de Caxias — RJ",
}

export const seoConfig = {
  title: "JL Concreto Usinado — Concreto bombeado no Rio de Janeiro",
  description:
    "Concreteira com usina própria em Duque de Caxias. Concreto bombeado, piso industrial e laje pré-moldada para o Rio e o Grande Rio. Orçamento direto pelo WhatsApp.",
}

export const vendedores: Vendedor[] = [
  {
    nome: "Léo",
    rotulo: "Vendedor Léo",
    telefone: "(21) 97019-2706",
    telefoneE164: "5521970192706",
    telHref: "tel:+5521970192706",
    whatsappHref: leo,
  },
  {
    nome: "Junior",
    rotulo: "Vendedor Junior",
    telefone: "(21) 96409-9610",
    telefoneE164: "5521964099610",
    telHref: "tel:+5521964099610",
    whatsappHref: junior,
  },
]

export const redesSociais: RedeSocial[] = [
  { nome: "Facebook", href: "https://www.facebook.com/jlconcretousinado", rotulo: "@jlconcretousinado" },
  { nome: "Instagram", href: "https://www.instagram.com/jlconcretousinado/", rotulo: "@jlconcretousinado" },
  { nome: "Google", href: "https://g.co/kgs/JKjTWvX", rotulo: "@jlconcretousinado" },
]

export const heroSlides: HeroSlide[] = [
  {
    src: "/imagens/obra-usina.jpg",
    alt: "Silos da usina própria da JL Concreto Usinado em Duque de Caxias",
    tema: "Usina própria",
    titulo: "Usina própria em Duque de Caxias",
    subtitulo: "O concreto é dosado na fonte, sem revenda, e sai direto para a sua obra.",
  },
  {
    src: "/imagens/obra-bomba.jpg",
    alt: "Bomba de concreto lançando o material no ponto da obra",
    tema: "Concreto bombeado",
    titulo: "Concreto bombeado até o ponto da obra",
    subtitulo: "A bomba vence altura e acesso difícil, da betoneira direto na forma.",
  },
  {
    src: "/imagens/obra-carregamento.jpg",
    alt: "Carregamento de concreto usinado para um volume contínuo",
    tema: "Piso e laje",
    titulo: "Volume contínuo, sem junta fria",
    subtitulo: "Grandes panos de piso e capa de laje com lançamento no ritmo da concretagem.",
  },
  {
    src: "/imagens/obra-caminhao.jpg",
    alt: "Caminhão betoneira da JL a caminho de uma obra no Rio",
    tema: "Frota própria",
    titulo: "Frota para o Rio e o Grande Rio",
    subtitulo: "A concretagem tem hora marcada. A betoneira chega no horário combinado.",
  },
]

export const bandeiras: Bandeira[] = [
  { nome: "Visa", de: "#1a1f71", ate: "#0a2a6b" },
  { nome: "Mastercard", de: "#1c1c1c", ate: "#3d2a2a" },
  { nome: "Elo", de: "#111111", ate: "#2c2c2c" },
  { nome: "American Express", de: "#016fd0", ate: "#012169" },
  { nome: "Hipercard", de: "#822124", ate: "#4a1012" },
  { nome: "Diners Club", de: "#0a3a6b", ate: "#071e38" },
]

export const menu: NavLink[] = [
  { id: "inicio", label: "Início", href: "/#inicio" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "trabalhos", label: "Trabalhos", href: "/#trabalhos" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contato", label: "Contato", href: "/#contato" },
]

export const footerNav = {
  empresa: [
    { label: "Sobre a empresa", href: "/sobre" },
    { label: "Nossos serviços", href: "/servicos" },
    { label: "Trabalhos", href: "/#trabalhos" },
    { label: "Blog", href: "/blog" },
    { label: "Fale conosco", href: "/contato" },
  ],
  servicos: [
    { label: "Concreto bombeado", href: "/servicos/concreto-bombeado" },
    { label: "Piso industrial", href: "/servicos/piso-industrial" },
    { label: "Laje pré-fabricada", href: "/servicos/laje-pre-fabricada" },
  ],
  institucional: [
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
    { label: "Cookies", href: "/cookies" },
    { label: "Termos de uso", href: "/termos-de-uso" },
  ],
}

export const areasAtendimento = [
  "Duque de Caxias",
  "Magé",
  "Piabetá",
  "Guapimirim",
  "São João de Meriti",
  "Pavuna",
  "Baixada Fluminense",
  "Zona Oeste",
  "Rio de Janeiro",
  "Grande Rio",
]

export const servicos: Servico[] = [
  {
    slug: "concreto-bombeado",
    titulo: "Concreto bombeado",
    frase: "O concreto sai da betoneira e chega ao ponto de aplicação, mesmo em altura ou em local de difícil acesso.",
    descricao:
      "No concreto bombeado, o material produzido na usina é transportado em betoneira e lançado por bomba hidráulica direto no ponto da obra. Isso reduz carrinho de mão, acelera a concretagem e mantém a mistura mais uniforme. A JL atende obras de pequeno, médio e grande porte em todo o Rio de Janeiro e no Grande Rio, com concreto estrutural dosado conforme a especificação do projeto.",
    inclui: [
      "Produção na usina própria, em Duque de Caxias",
      "Concreto estrutural dosado para a resistência do projeto",
      "Transporte em betoneira até o canteiro",
      "Bombeamento no local da aplicação",
      "Atendimento a lajes, fundações, pilares e pisos",
    ],
    aplicacoes: [
      "Lajes de casas, prédios e galpões",
      "Fundações e blocos de coroamento",
      "Pilares, vigas e estruturas convencionais",
      "Pisos que pedem lançamento contínuo",
      "Obras com acesso estreito ou grande altura",
    ],
    paraQuem:
      "Construtoras, empreiteiros e proprietários que precisam concretar com prazo curto, sem montar uma operação manual de transporte dentro do canteiro.",
    imagem: "/imagens/obra-bomba.jpg",
    imagemAlt: "Caminhão e bomba de concreto da JL Concreto Usinado",
  },
  {
    slug: "piso-industrial",
    titulo: "Piso industrial",
    frase: "Concreto bombeado para pisos que precisam de resistência, planicidade e continuidade de lançamento.",
    descricao:
      "Piso de galpão, pátio e área logística não admite junta improvisada nem interrupção no meio do lançamento. A JL fornece o concreto usinado e o bombeamento para a execução de pisos industriais e de piso polido, com volume contínuo e equipe acostumada ao ritmo da obra. A especificação do traço segue a carga e o uso do ambiente.",
    inclui: [
      "Concreto dosado para carga e tráfego do piso",
      "Bombeamento contínuo para grandes panos",
      "Apoio de prazo alinhado à equipe de execução",
      "Atendimento a galpões, depósitos e pátios",
      "Base adequada para acabamento polido",
    ],
    aplicacoes: [
      "Galpões industriais e centros de distribuição",
      "Pátios de manobra e estacionamentos de carga",
      "Pisos polidos de áreas comerciais",
      "Reformas que exigem liberação rápida da área",
    ],
    paraQuem:
      "Indústrias, operadores logísticos e obras comerciais que precisam de um piso resistente, executado com concreto de usina e lançamento sem interrupção.",
    imagem: "/imagens/obra-carregamento.jpg",
    imagemAlt: "Carregamento de caminhão de concreto na usina da JL",
  },
  {
    slug: "laje-pre-fabricada",
    titulo: "Laje pré-fabricada",
    frase: "Concretagem da capa de lajes pré-moldadas com rapidez, bombeamento e concreto na especificação certa.",
    descricao:
      "A laje pré-moldada encurta a estrutura porque vigotas e enchimento chegam prontos para montar. O que define a resistência da capa é o concreto da concretagem final. A JL entrega esse concreto usinado e faz o bombeamento no ponto da laje, em casas, prédios e galpões, para a execução ficar contínua e dentro do prazo de escoramento.",
    inclui: [
      "Concreto usinado para a capa da laje",
      "Bombeamento direto sobre a laje montada",
      "Volume programado para não interromper o lançamento",
      "Atendimento a obras residenciais, comerciais e industriais",
      "Alinhamento de horário com a equipe de montagem",
    ],
    aplicacoes: [
      "Casas e sobrados",
      "Prédios e condomínios",
      "Galpões e coberturas de vão livre",
      "Ampliações e pavimentos novos",
    ],
    paraQuem:
      "Quem já optou pela laje pré-moldada e precisa do concreto e do bombeamento da capa com pontualidade, do primeiro caminhão ao último.",
    imagem: "/imagens/obra-unidade.jpg",
    imagemAlt: "Unidade da concreteira JL Concreto Usinado",
  },
]

export const diferenciais: Diferencial[] = [
  {
    numero: "01",
    titulo: "Preço acessível",
    texto:
      "O orçamento sai direto da concreteira. Sem atravessador, o concreto da usina própria chega mais em conta do que comprar pelo revendedor.",
  },
  {
    numero: "02",
    titulo: "Qualidade",
    texto:
      "Equipe de obra e dosagem acostumada a atender na hora, com produtividade no canteiro e concreto dentro da especificação combinada.",
  },
  {
    numero: "03",
    titulo: "Pronto para entrega",
    texto:
      "Usina em Duque de Caxias e frota para o Rio e o Grande Rio. A programação acompanha o ritmo da sua concretagem.",
  },
]

export const obras: Obra[] = [
  {
    src: "/imagens/obra-usina.jpg",
    alt: "Usina própria da JL Concreto Usinado com silos e betoneira",
    legenda: "Usina própria",
  },
  {
    src: "/imagens/obra-caminhao.jpg",
    alt: "Caminhão betoneira da JL Concreto Usinado",
    legenda: "Betoneira",
  },
  {
    src: "/imagens/obra-bomba.jpg",
    alt: "Caminhão e bomba de concreto em operação",
    legenda: "Bombeamento",
  },
  {
    src: "/imagens/obra-carregamento.jpg",
    alt: "Carregamento de caminhão de concreto bombeado na usina",
    legenda: "Carregamento",
  },
  {
    src: "/imagens/obra-unidade.jpg",
    alt: "Unidade da JL Concreto Usinado em Duque de Caxias",
    legenda: "Unidade",
  },
]

export const faq: FaqItem[] = [
  {
    pergunta: "O que é a JL Concreto Usinado?",
    resposta:
      "A JL Concreto Usinado é uma concreteira de Duque de Caxias especializada em concreto bombeado de alta qualidade. Atende obras de pequeno, médio e grande porte, da produção na usina própria até o bombeamento no canteiro, com equipe dedicada a cada etapa.",
  },
  {
    pergunta: "Quais são os serviços da JL Concreto Usinado?",
    resposta: "Os serviços principais são concreto bombeado, piso industrial e laje pré-fabricada. Também fornecemos concreto estrutural para a estrutura da obra.",
    itens: ["Concreto bombeado", "Piso industrial e piso polido", "Laje pré-fabricada", "Concreto estrutural"],
  },
  {
    pergunta: "Onde a JL Concreto Usinado atende?",
    resposta: "Atendemos o Rio de Janeiro e o Grande Rio, com base em Duque de Caxias.",
    itens: areasAtendimento,
  },
  {
    pergunta: "Qual é o WhatsApp da JL Concreto Usinado?",
    resposta: "O orçamento é feito direto com os vendedores, pelo WhatsApp.",
    itens: ["Léo — (21) 97019-2706", "Junior — (21) 96409-9610"],
  },
  {
    pergunta: "Por que escolher a JL Concreto para a minha obra?",
    resposta:
      "Comprar de uma concreteira com usina própria junta qualidade, agilidade, economia e segurança. O concreto segue a especificação da obra, a equipe conhece o ritmo do canteiro e o pagamento pode ser parcelado em até 12 vezes sem juros ou feito à vista, com desconto, em dinheiro ou Pix.",
  },
]

export const posts: Post[] = [
  {
    slug: "concreto-bombeado-agilidade-e-qualidade",
    categoria: "Concreto bombeado",
    titulo: "Concreto bombeado: agilidade e qualidade para a obra no Rio",
    resumo:
      "Entenda como o bombeamento leva o concreto da betoneira ao ponto de aplicação e por que isso muda prazo, desperdício e acesso em obras do Rio e do Grande Rio.",
    imagem: "/imagens/obra-bomba.jpg",
    imagemAlt: "Bombeamento de concreto em obra atendida pela JL",
    corpo: [
      "Concreto bombeado é o concreto usinado lançado por bomba hidráulica, direto da betoneira até o ponto de aplicação. Em vez de subir balde ou empurrar carrinho, a bomba vence altura e distância horizontal com a mistura ainda dentro do prazo de trabalhabilidade.",
      "O método faz diferença em laje alta, subsolo, fundação apertada e qualquer canteiro em que o acesso do caminhão não chega até a forma. A concretagem fica contínua, o que importa quando o volume é grande e a junta fria não pode aparecer no meio do elemento.",
      "Há ganho de prazo porque o transporte interno deixa de depender de tanta mão de obra. Há ganho de uniformidade porque o material passa menos tempo exposto a sol, vento e chuva entre o caminhão e a forma. E há ganho de organização: o canteiro fica mais limpo e com menos retrabalho de material espalhado.",
      "Na prática, o concreto bombeado aparece em lajes de edifícios, pisos industriais, fundações de maior volume e estruturas em que a logística convencional travaria a obra. A bomba certa e o traço certo caminham juntos: de nada adianta pressão de lançamento se o concreto não foi dosado para aquela peça.",
      "A JL Concreto Usinado produz esse concreto na usina própria, em Duque de Caxias, e leva o bombeamento para obras do Rio e do Grande Rio. O orçamento é feito direto com a concreteira, pelo WhatsApp, com o volume e o horário alinhados ao cronograma da concretagem.",
    ],
  },
  {
    slug: "lajes-pre-moldadas",
    categoria: "Laje pré-fabricada",
    titulo: "Laje pré-moldada: o que muda na concretagem da capa",
    resumo:
      "Vigotas e enchimento aceleram a estrutura. A capa, porém, depende de concreto usinado e de bombeamento contínuo. Veja como a JL entra nessa etapa.",
    imagem: "/imagens/obra-unidade.jpg",
    imagemAlt: "Unidade da JL Concreto Usinado, base do atendimento a lajes",
    corpo: [
      "A laje pré-moldada combina vigotas de concreto e blocos de enchimento, cerâmicos ou de concreto, montados no vão e completados com uma capa concretada na obra. Os componentes chegam prontos para encaixar. O tempo de forma e de escoramento cai em relação à laje maciça moldada inteira no local.",
      "A etapa que não pode ser apressada de qualquer jeito é a concretagem da capa. O concreto precisa cobrir as vigotas com espessura e resistência previstas, sem interrupção que crie junta no meio do pano. É aí que o concreto usinado bombeado entra: o caminhão fica na rua e a bomba sobe o material até a laje.",
      "Além do prazo, a laje pré-moldada costuma pesar menos que a laje maciça, o que alivia fundação e vigas. Isso não dispensa projeto. Dispensa desperdício de madeira de forma e reduz equipe parada esperando concreteira.",
      "O uso é amplo: casas e sobrados, pavimentos de prédios, galpões com vão livre e ampliações. Em obra vertical, a altura deixa de ser obstáculo quando há bomba com alcance compatível.",
      "A JL Concreto Usinado não substitui o projetista da laje. Entrega o concreto da capa, no traço combinado, e o bombeamento no horário em que a montagem já está liberada. Para orçar volume e janela de concretagem, fale com o Léo ou com o Junior pelo WhatsApp.",
    ],
  },
  {
    slug: "tipos-de-piso-industrial",
    categoria: "Piso industrial",
    titulo: "Tipos de piso industrial e o papel do concreto usinado",
    resumo:
      "Do concreto polido ao piso de alto tráfego, a escolha depende de carga, química e limpeza. O lançamento contínuo começa na concreteira.",
    imagem: "/imagens/obra-carregamento.jpg",
    imagemAlt: "Concreto usinado sendo carregado para piso industrial",
    corpo: [
      "Piso industrial não é só a superfície por onde se caminha. Ele recebe empilhadeira, pallet, óleo, lavagem e, em muitos galpões, agente químico. Escolher o tipo errado aparece depois, em desgaste, trinca e parada de operação.",
      "O concreto polido é a opção mais comum em depósito e indústria leve: a própria placa, bem executada e polida, vira o acabamento. O custo de manutenção é baixo e a superfície aguenta tráfego de pessoas e máquinas sem exposição química agressiva.",
      "Onde há alimento, fármaco ou produto químico, entram revestimentos como epóxi e poliuretano, aplicados sobre a placa de concreto. Eles resistem melhor a derramamento e facilitam a higienização porque não têm junta aberta. A placa de baixo continua sendo concreto usinado, dosado para a carga.",
      "Pátio externo e manobra de caminhão pedem outra leitura: placa armada para carga pesada ou piso intertravado, que acomoda dilatação térmica. Oficina e linha de produção ainda consideram conforto e antiderrapância para quem fica o dia inteiro em pé.",
      "Em todos esses casos, a concretagem da placa pede volume contínuo. Parar no meio do pano para esperar o próximo caminhão marca o piso para sempre. A JL Concreto Usinado programa esse fornecimento a partir da usina em Duque de Caxias, com bombeamento para o Rio e o Grande Rio. O tipo de acabamento é definido com quem executa o piso; o concreto e o ritmo de entrega ficam com a concreteira.",
    ],
  },
]

export const sobreConteudo = {
  titulo: "Concreteira com usina própria no Rio de Janeiro",
  resumo:
    "Há mais de cinco anos a JL Concreto Usinado fornece concreto bombeado para obras de todos os portes, com dosagem na usina de Duque de Caxias e entrega no Rio e no Grande Rio.",
  paragrafos: [
    "A JL Concreto Usinado é uma concreteira com usina própria. O concreto não passa por revenda: sai dosado da planta, segue de betoneira e, quando a obra pede, é bombeado no ponto de aplicação. Esse caminho direto é o que torna o orçamento mais acessível.",
    "O atendimento cobre obra residencial, comercial e de infraestrutura. O pedido pode ser uma laje de sobrado ou um volume grande de piso e fundação. A equipe ajusta traço, horário e bomba ao que o projeto e o canteiro exigem.",
    "Pontualidade entra no serviço. Concretagem tem janela curta: escoramento liberado, equipe posicionada, clima aceitável. A programação da JL é feita para cumprir esse horário, não para deixar o caminhão chegar “em algum momento do dia”.",
    "A planta fica na Rua Crateus, Chácara Rio Petrópolis, em Duque de Caxias. Dali saem as entregas para a Baixada Fluminense, a Zona Oeste, a Pavuna e o restante do Rio e do Grande Rio.",
  ],
  missao:
    "Levar o concreto certo, na quantidade e na especificação combinadas, com durabilidade para a estrutura e clareza no atendimento.",
}

export const indicadores = [
  { id: "anos", valor: 5, prefixo: "+", rotulo: "anos de experiência" },
  { id: "regioes", valor: 10, rotulo: "regiões atendidas" },
  { id: "parcelas", valor: 12, sufixo: "x", rotulo: "sem juros no cartão" },
  { id: "dias", valor: 6, rotulo: "dias de atendimento por semana" },
]

export const homeSections: HomeSection[] = [
  {
    id: "hero",
    anchor: "inicio",
    ativo: true,
    ordem: 1,
    titulo: "Economize comprando diretamente conosco",
    subtitulo: "Temos usina própria e deixamos o concreto mais acessível para a sua obra.",
    tema: "Concreteira no Rio de Janeiro",
    fundo: "graphite",
  },
  {
    id: "stats",
    anchor: "numeros",
    ativo: true,
    ordem: 2,
    titulo: "A JL em números",
    fundo: "white",
  },
  {
    id: "sobre",
    anchor: "sobre",
    ativo: true,
    ordem: 3,
    titulo: "Sobre a empresa",
    subtitulo: "Concreto bombeado, estrutural, piso e laje para a obra sair do papel.",
    tema: "Usina própria",
    fundo: "white",
  },
  {
    id: "usina",
    anchor: "usina",
    ativo: true,
    ordem: 4,
    titulo: "Da usina para a sua obra",
    subtitulo: "Role para carregar a betoneira.",
    tema: "O processo",
    fundo: "graphite",
  },
  {
    id: "servicos",
    anchor: "servicos",
    ativo: true,
    ordem: 5,
    titulo: "Conheça nossos serviços",
    subtitulo: "Três frentes de concretagem para obra residencial, comercial e industrial.",
    tema: "Como podemos ajudar",
    fundo: "mist",
  },
  {
    id: "diferenciais",
    anchor: "diferenciais",
    ativo: true,
    ordem: 6,
    titulo: "Por que comprar direto da concreteira",
    tema: "Diferenciais",
    fundo: "white",
  },
  {
    id: "cta",
    anchor: "orcamento",
    ativo: true,
    ordem: 7,
    titulo: "O concreto da sua obra sai daqui",
    subtitulo: "Fale com um vendedor e receba o orçamento no WhatsApp.",
    tema: "Próximo passo",
    fundo: "graphite",
  },
  {
    id: "galeria",
    anchor: "trabalhos",
    ativo: true,
    ordem: 8,
    titulo: "Trabalhos recentes",
    subtitulo: "Usina, frota e bombeamento em operação.",
    tema: "Obras",
    fundo: "white",
  },
  {
    id: "oferta",
    anchor: "condicoes",
    ativo: true,
    ordem: 9,
    titulo: "Parcelamento em até 12 vezes sem juros",
    subtitulo: "Ou desconto no pagamento à vista, em dinheiro ou Pix.",
    tema: "Condições",
    fundo: "graphite",
  },
  {
    id: "faq",
    anchor: "duvidas",
    ativo: true,
    ordem: 10,
    titulo: "Perguntas frequentes",
    subtitulo: "Respostas diretas sobre serviço, região e atendimento.",
    tema: "Dúvidas",
    fundo: "mist",
  },
  {
    id: "social",
    anchor: "redes",
    ativo: true,
    ordem: 11,
    titulo: "Encontre a JL nas redes sociais",
    subtitulo: "Acompanhe obras, frota e o dia a dia da usina.",
    tema: "Redes sociais",
    fundo: "white",
  },
  {
    id: "regioes",
    anchor: "regioes",
    ativo: true,
    ordem: 12,
    titulo: "Atendemos em todos os locais do Rio de Janeiro",
    subtitulo: "Da Baixada Fluminense à Zona Oeste, o concreto sai de Duque de Caxias para o Rio e o Grande Rio.",
    tema: "Onde a JL chega",
    fundo: "graphite",
  },
  {
    id: "contato",
    anchor: "contato",
    ativo: true,
    ordem: 13,
    titulo: "Fale com um vendedor",
    subtitulo: "Orçamento pelo WhatsApp, sem formulário e sem espera de e-mail.",
    tema: "Contato",
    fundo: "white",
  },
]
