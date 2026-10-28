import type { Metadata } from "next"
import { siteConfig } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a JL Concreto Usinado trata dados de quem visita o site e entra em contato pelo WhatsApp ou e-mail.",
  alternates: { canonical: "/politica-de-privacidade" },
}

const topicos = [
  {
    titulo: "Quem somos",
    texto: `A ${siteConfig.nome} é uma concreteira com usina em ${siteConfig.endereco}. Este site apresenta os serviços e os canais de orçamento. Não há cadastro de usuário nem área logada.`,
  },
  {
    titulo: "Quais dados circulam",
    texto: "O site não tem formulário. Nenhum nome, telefone ou mensagem fica armazenado aqui. O orçamento acontece no WhatsApp ou por e-mail, fora desta página. Esses canais seguem as regras das próprias plataformas.",
  },
  {
    titulo: "Mapa e conteúdo de terceiros",
    texto: "A localização usa um mapa incorporado do Google. Ao carregar a página, o Google pode receber dados técnicos da sua visita, como endereço IP, conforme a política do próprio Google. Links para Facebook, Instagram e Google abrem sites de terceiros.",
  },
  {
    titulo: "Cookies",
    texto: "Não usamos cookies de publicidade nem de comentário. O detalhamento está na página de cookies. O navegador pode guardar dados técnicos da hospedagem, necessários para entregar a página.",
  },
  {
    titulo: "Por quanto tempo",
    texto: "Como o site não guarda mensagens nem contas, não há base de dados de visitantes para reter. Conversas de WhatsApp e e-mails ficam nos respectivos serviços, pelo tempo que a operação comercial precisar para atender o orçamento e as obrigações legais.",
  },
  {
    titulo: "Seus direitos",
    texto: `Para pedir acesso, correção ou exclusão de dados tratados pela JL em um atendimento, escreva para ${siteConfig.email}. O pedido não alcança dados que a lei obrigue a guardar.`,
  },
]

export default function PrivacidadePage() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro
          eyebrow="Institucional"
          title="Política de privacidade"
          summary="O site informa e encaminha o contato. Ele não coleta cadastro."
        />
        <div className="mt-10 max-w-[44rem] space-y-8">
          {topicos.map((item) => (
            <section key={item.titulo}>
              <h2 className="text-xl font-medium text-ink">{item.titulo}</h2>
              <p className="mt-3 text-base leading-7 text-quiet">{item.texto}</p>
            </section>
          ))}
        </div>
      </PageBody>
    </PageMain>
  )
}
