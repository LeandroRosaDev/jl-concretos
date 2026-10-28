"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { siteConfig, vendedores } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, sectionPad } from "@/components/layout/primitives"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function CtaBanner({ section }: { section: HomeSection }) {
  const sectionRef = useRef<HTMLElement>(null)
  const truckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const element = sectionRef.current
      const truck = truckRef.current
      const road = truck?.parentElement
      if (!element || !truck || !road) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        truck.style.transform = `translateX(${(road.clientWidth - truck.clientWidth - 76) / 2}px)`
        return
      }
      const rect = road.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.8)))
      const travel = Math.max(0, road.clientWidth - truck.clientWidth - 76)
      truck.style.transform = `translateX(${progress * travel}px)`
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <section ref={sectionRef} id={section.anchor} className="relative z-10 overflow-hidden bg-graphite text-inverse">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
      <Container className={`relative ${sectionPad}`}>
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{section.tema}</p>
            <h2 className="mt-4 max-w-[16ch] text-[32px] leading-[38px] font-medium tracking-tight min-[1100px]:text-[46px] min-[1100px]:leading-[52px]">
              {section.titulo}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-inverse/75">{section.subtitulo}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            {vendedores.map((vendedor) => (
              <WhatsAppLink key={vendedor.nome} href={vendedor.whatsappHref}>
                WhatsApp {vendedor.nome}
              </WhatsAppLink>
            ))}
            <a href={siteConfig.telefoneHref} className="text-center text-sm text-inverse/70 hover:text-inverse">
              Ou ligue {siteConfig.telefone}
            </a>
          </div>
        </div>
        <div className="relative mt-10 h-24 md:h-28">
          <div className="absolute bottom-6 right-0 left-0 border-t border-dashed border-white/30" />
          <div className="pointer-events-none absolute bottom-7 right-[24%] left-[24%] flex justify-between text-brand/80" aria-hidden>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="text-lg leading-none">
                ›
              </span>
            ))}
          </div>
          <span className="absolute bottom-6 left-0 z-10 flex size-12 items-center justify-center rounded-full border border-white/40 bg-graphite text-sm font-medium tracking-wide">
            JL
          </span>
          <span className="absolute right-0 bottom-6 z-10 flex size-12 items-center justify-center rounded-full border border-brand bg-graphite text-center text-[11px] leading-tight font-medium">
            Sua
            <br />
            Obra
          </span>
          {/* icone.png é quadrado com margem transparente: o recuo negativo apoia as rodas na pista */}
          <div ref={truckRef} className="absolute bottom-[-5px] left-0 z-20 w-32 md:bottom-[-13px] md:w-40">
            <Image src="/imagens/icone.png" alt="" width={420} height={240} className="h-auto w-full" />
          </div>
        </div>
      </Container>
    </section>
  )
}
