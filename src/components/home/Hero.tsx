"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { heroSlides, siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container } from "@/components/layout/primitives"
import { ButtonLink } from "@/components/ui/button-link"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function Hero({ section }: { section: HomeSection }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const slide = heroSlides[index]

  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [reduce, index])

  return (
    <section
      id={section.anchor}
      className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-graphite text-inverse md:min-h-[calc(100svh-6.25rem)]"
    >
      <AnimatePresence>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.08 }}
            animate={{ scale: reduce ? 1 : 1.16 }}
            transition={{ duration: reduce ? 0 : 6.5, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={slide.src === heroSlides[0].src}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-graphite/78" />
      <Container className="relative z-10 flex flex-col items-center py-20 text-center">
        <motion.div
          initial={reduce ? false : { scale: 0.62, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
        >
          <Image
            src="/imagens/logo.png"
            alt="JL Concreto Usinado"
            width={280}
            height={112}
            priority
            className="h-14 w-auto md:h-16"
          />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.titulo}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
            className="mt-8"
          >
            <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{slide.tema}</p>
            <h1 className="mx-auto mt-4 max-w-[16ch] text-[36px] leading-[42px] font-medium tracking-tight min-[1100px]:text-[60px] min-[1100px]:leading-[64px]">
              {slide.titulo}
            </h1>
            <p className="mx-auto mt-5 max-w-[34rem] text-base leading-7 text-inverse/80 min-[1100px]:text-lg">
              {slide.subtitulo}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink href={siteConfig.whatsappHref}>Sim, quero fazer orçamento</WhatsAppLink>
          <ButtonLink href="#servicos" variant="outline">
            Conhecer serviços
          </ButtonLink>
        </div>
        <div className="mt-12 flex items-center gap-2" role="tablist" aria-label="Destaques da concreteira">
          {heroSlides.map((item, itemIndex) => {
            const active = itemIndex === index
            return (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={item.titulo}
                onClick={() => setIndex(itemIndex)}
                className={`h-1.5 rounded-full transition-all ${active ? "w-10 bg-brand" : "w-5 bg-white/40 hover:bg-white/70"}`}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}
