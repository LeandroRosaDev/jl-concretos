import { siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { CardStack } from "@/components/home/CardStack"
import { Container, sectionPad } from "@/components/layout/primitives"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function Offer({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10 bg-graphite text-inverse">
      <Container className={sectionPad}>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{section.tema}</p>
            <h2 className="mt-4 max-w-[16ch] text-[32px] leading-[38px] font-medium tracking-tight min-[1100px]:text-[46px] min-[1100px]:leading-[52px]">
              {section.titulo}
            </h2>
            <p className="mt-5 max-w-[36rem] text-base leading-7 text-inverse/75">{section.subtitulo}</p>
            <p className="mt-4 max-w-[36rem] text-sm leading-6 text-inverse/60">
              Visa, Mastercard, Elo, American Express, Hipercard e Diners Club. Parcelamento sujeito a confirmação no orçamento.
            </p>
            <WhatsAppLink href={siteConfig.whatsappHref} className="mt-8">
              Sim, quero fazer orçamento
            </WhatsAppLink>
          </div>
          <CardStack />
        </div>
      </Container>
    </section>
  )
}
