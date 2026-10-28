import Image from "next/image"
import { sobreConteudo } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { Reveal } from "@/components/motion/Reveal"
import { ButtonLink } from "@/components/ui/button-link"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { siteConfig } from "@/content/site"

export function About({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 min-[1100px]:block [background-image:radial-gradient(rgba(26,28,31,0.10)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_78%)]"
      />
      <Container className={sectionPad}>
        <Reveal>
          <div className="grid items-center gap-10 min-[1100px]:grid-cols-2">
            <div>
              <Eyebrow>{section.tema}</Eyebrow>
              <SectionTitle className="mt-4 max-w-[16ch]">{section.titulo}</SectionTitle>
              <p className="mt-6 text-base leading-7 text-quiet">
                A JL Concreto Usinado é uma concreteira no Rio de Janeiro. Fornecemos concreto bombeado,
                concreto estrutural, piso polido e laje pré-moldada para a obra sair do papel.
              </p>
              <p className="mt-4 text-base leading-7 text-quiet">
                Atendemos o Rio e o Grande Rio. Comprar direto da concreteira, com usina própria, reduz o
                custo em obra pequena, média ou de grande porte.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/sobre" variant="brand">
                  Conheça a empresa
                </ButtonLink>
                <WhatsAppLink href={siteConfig.whatsappHref}>Quero um orçamento</WhatsAppLink>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-graphite sm:aspect-[5/4]">
              <Image
                src="/imagens/obra-usina.jpg"
                alt="Silos da usina própria da JL Concreto Usinado"
                fill
                sizes="(min-width: 1100px) 540px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="sr-only">{sobreConteudo.titulo}</p>
        </Reveal>
      </Container>
    </section>
  )
}
