"use client"

import Image from "next/image"
import { faq, siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function Faq({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10 bg-mist">
      <Container className={sectionPad}>
        <div className="grid items-start gap-10 min-[1100px]:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
          <div>
            <Eyebrow>{section.tema}</Eyebrow>
            <SectionTitle className="mt-4">{section.titulo}</SectionTitle>
            <p className="mt-4 text-base leading-7 text-quiet">{section.subtitulo}</p>
            <Accordion className="mt-8 rounded-3xl border border-ink/10 bg-white px-5">
              {faq.map((item) => (
                <AccordionItem key={item.pergunta} value={item.pergunta} className="border-ink/10">
                  <AccordionTrigger className="py-4 text-left text-base font-medium text-ink hover:no-underline">
                    {item.pergunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-quiet">
                    <p>{item.resposta}</p>
                    {item.itens ? (
                      <ul className="mt-3 flex flex-col gap-1">
                        {item.itens.map((linha) => (
                          <li key={linha}>{linha}</li>
                        ))}
                      </ul>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 rounded-3xl border border-brand/30 bg-white p-5">
              <p className="text-lg font-medium text-ink">Ainda tem dúvida? Chama no WhatsApp.</p>
              <WhatsAppLink href={siteConfig.whatsappHref} className="mt-4">
                Falar com um vendedor
              </WhatsAppLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-graphite">
            <div className="relative aspect-[4/5]">
              <Image
                src="/imagens/perguntas.webp"
                alt="Atendente da JL Concreto Usinado pronta para tirar dúvidas"
                fill
                sizes="(min-width: 1100px) 420px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pt-24 pb-6 text-inverse">
              <p className="text-2xl leading-tight font-medium">Uma equipe sempre pronta para te atender</p>
              <p className="mt-2 text-sm leading-6 text-inverse/80">{siteConfig.horario}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
