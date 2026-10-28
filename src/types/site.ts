export type SectionBackground = "white" | "mist" | "graphite"

export type SectionId =
  | "hero"
  | "stats"
  | "sobre"
  | "usina"
  | "servicos"
  | "diferenciais"
  | "cta"
  | "galeria"
  | "oferta"
  | "faq"
  | "social"
  | "regioes"
  | "contato"

export type HomeSection = {
  id: SectionId
  anchor: string
  ativo: boolean
  ordem: number
  titulo: string
  subtitulo?: string
  tema?: string
  fundo: SectionBackground
}

export type NavLink = {
  id?: string
  label: string
  href: string
}

export type Vendedor = {
  nome: string
  rotulo: string
  telefone: string
  telefoneE164: string
  telHref: string
  whatsappHref: string
}

export type EmailCanal = {
  rotulo: string
  email: string
}

export type RedeSocial = {
  nome: "Facebook" | "Instagram" | "Google"
  href: string
  rotulo: string
}

export type HeroSlide = {
  src: string
  alt: string
  tema: string
  titulo: string
  subtitulo: string
}

export type Bandeira = {
  nome: string
  de: string
  ate: string
}

export type SiteConfig = {
  nome: string
  frase: string
  url: string
  telefone: string
  telefoneHref: string
  whatsapp: string
  whatsappHref: string
  email: string
  emails: EmailCanal[]
  horario: string
  horarioCurto: string
  endereco: string
  enderecoLinhas: string[]
  mapaEmbed: string
  mapaHref: string
  cidade: string
}

export type Servico = {
  slug: string
  titulo: string
  frase: string
  descricao: string
  inclui: string[]
  aplicacoes: string[]
  paraQuem: string
  imagem: string
  imagemAlt: string
}

export type Diferencial = {
  numero: string
  titulo: string
  texto: string
}

export type Obra = {
  src: string
  alt: string
  legenda: string
}

export type FaqItem = {
  pergunta: string
  resposta: string
  itens?: string[]
}

export type Post = {
  slug: string
  categoria: string
  titulo: string
  resumo: string
  corpo: string[]
  imagem: string
  imagemAlt: string
}
