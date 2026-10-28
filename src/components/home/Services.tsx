import Image from "next/image"
import Link from "next/link"
import { servicos, siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { Reveal } from "@/components/motion/Reveal"
import { TiltCard } from "@/components/motion/TiltCard"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function Services({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10 bg-mist">
      <Container wide className={sectionPad}>
        <Reveal>
          <Eyebrow>{section.tema}</Eyebrow>
          <SectionTitle className="mt-4 max-w-[16ch]">{section.titulo}</SectionTitle>
          <p className="mt-4 max-w-[40rem] text-base leading-7 text-quiet">{section.subtitulo}</p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {servicos.map((servico, index) => (
              <li key={servico.slug} className="h-full">
                <Reveal delay={index * 90} className="h-full">
                <TiltCard className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(17,17,17,0.06)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                    <Image
                      src={servico.imagem}
                      alt={servico.imagemAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-medium text-ink">{servico.titulo}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-quiet">{servico.frase}</p>
                    <Link
                      href={`/servicos/${servico.slug}`}
                      className="relative mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                    >
                      Ver serviço
                      <span aria-hidden>→</span>
                    </Link>
                    <WhatsAppLink href={siteConfig.whatsappHref} className="mt-5 h-10 w-full text-xs">
                      Orçar no WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
                </TiltCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
