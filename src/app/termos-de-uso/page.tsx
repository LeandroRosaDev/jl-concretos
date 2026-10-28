import type { Metadata } from "next"
import { siteConfig } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições de uso do site da JL Concreto Usinado e do pedido de orçamento.",
  alternates: { canonical: "/termos-de-uso" },
}

export default function TermosPage() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro
          eyebrow="Institucional"
          title="Termos de uso"
          summary="O site apresenta a concreteira e os canais de atendimento. O fornecimento de concreto só existe depois de orçamento confirmado."
        />
        <div className="mt-10 max-w-[44rem] space-y-5 text-base leading-7 text-quiet">
          <p>
            As informações de serviço, região e horário descrevem a operação da {siteConfig.nome}. Elas podem ser atualizadas sem aviso prévio nesta página. A condição comercial válida é a que o vendedor confirmar no WhatsApp ou por escrito.
          </p>
          <p>
            Parcelamento em até 12 vezes sem juros e desconto à vista, em dinheiro ou Pix, são condições comerciais sujeitas a análise no orçamento. Não constituem oferta automática para qualquer volume, prazo ou praça.
          </p>
          <p>
            Fotos de usina, frota e obras ilustram a operação. Não representam, por si, o acabamento de um pedido futuro. Traço, volume, bomba e janela de entrega são definidos caso a caso.
          </p>
          <p>
            Textos, marca e fotografias deste site pertencem à JL Concreto Usinado ou são usados com autorização. Não está permitido copiar o conjunto para outro site comercial.
          </p>
          <p>
            Links externos, inclusive WhatsApp, redes sociais e mapa, levam a serviços de terceiros. A JL não controla o conteúdo nem a disponibilidade desses serviços.
          </p>
          <p>
            Dúvidas sobre estes termos: {siteConfig.email}. Endereço da usina: {siteConfig.endereco}.
          </p>
        </div>
      </PageBody>
    </PageMain>
  )
}
