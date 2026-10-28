"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { obras } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { Reveal } from "@/components/motion/Reveal"

export function Gallery({ section }: { section: HomeSection }) {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    if (index === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null)
      if (event.key === "ArrowRight") setIndex((current) => (current === null ? current : (current + 1) % obras.length))
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current === null ? current : (current - 1 + obras.length) % obras.length))
      }
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [index])

  const active = index === null ? null : obras[index]

  return (
    <section id={section.anchor} className="relative z-10">
      <Container wide className={sectionPad}>
        <Eyebrow>{section.tema}</Eyebrow>
        <SectionTitle className="mt-4">{section.titulo}</SectionTitle>
        <p className="mt-4 max-w-[36rem] text-base leading-7 text-quiet">{section.subtitulo}</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {obras.map((obra, obraIndex) => (
            <li key={obra.src} className={obraIndex === 0 ? "col-span-2 row-span-2" : undefined}>
              <Reveal delay={obraIndex * 70} className="h-full">
              <button
                type="button"
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-graphite text-left"
                onClick={() => setIndex(obraIndex)}
              >
                <Image
                  src={obra.src}
                  alt={obra.alt}
                  fill
                  sizes={obraIndex === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm text-white">
                  {obra.legenda}
                </span>
              </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {active && index !== null ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={active.legenda}>
          <button
            type="button"
            className="absolute top-4 right-4 grid size-11 place-items-center text-white"
            onClick={() => setIndex(null)}
            aria-label="Fechar"
          >
            <X />
          </button>
          <button
            type="button"
            className="absolute left-3 grid size-11 place-items-center text-white md:left-6"
            onClick={() => setIndex((index - 1 + obras.length) % obras.length)}
            aria-label="Foto anterior"
          >
            <ChevronLeft />
          </button>
          <figure className="relative h-[min(78vh,820px)] w-full max-w-4xl overflow-hidden rounded-3xl">
            <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
            <figcaption className="absolute inset-x-0 -bottom-8 text-center text-sm text-white">{active.legenda}</figcaption>
          </figure>
          <button
            type="button"
            className="absolute right-3 grid size-11 place-items-center text-white md:right-6"
            onClick={() => setIndex((index + 1) % obras.length)}
            aria-label="Próxima foto"
          >
            <ChevronRight />
          </button>
        </div>
      ) : null}
    </section>
  )
}
