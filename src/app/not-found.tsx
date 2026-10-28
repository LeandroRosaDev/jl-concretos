import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export default function NotFound() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro
          eyebrow="JL Concreto Usinado"
          title="Página não encontrada"
          summary="Esse endereço não existe. Volte ao início ou fale com um vendedor pelo WhatsApp."
        />
      </PageBody>
    </PageMain>
  )
}
