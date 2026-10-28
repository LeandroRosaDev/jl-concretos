"use client"

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { indicadores } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container } from "@/components/layout/primitives"

function CountUp({
  value,
  prefixo = "",
  sufixo = "",
}: {
  value: number
  prefixo?: string
  sufixo?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const text = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString("pt-BR"))

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      motionValue.set(value)
      return
    }
    const controls = animate(motionValue, value, { duration: 1.4, ease: "easeOut" })
    return () => controls.stop()
  }, [inView, motionValue, reduce, value])

  return (
    <span ref={ref}>
      {prefixo}
      <motion.span>{text}</motion.span>
      {sufixo}
    </span>
  )
}

export function Stats({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} aria-label={section.titulo} className="relative z-10 overflow-hidden bg-brand text-inverse">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-8 -bottom-16 size-44 rounded-full border border-white/25" aria-hidden />
      <div className="pointer-events-none absolute top-8 left-[7%] size-16 rounded-full border border-white/20" aria-hidden />
      <Container className="relative py-16 md:py-20">
        <p className="text-xs font-medium tracking-[0.16em] text-white/80 uppercase">Concreteira</p>
        <h2 className="mt-3 max-w-[12ch] text-[32px] leading-[38px] font-medium tracking-tight text-white min-[1100px]:text-[46px] min-[1100px]:leading-[52px]">
          {section.titulo}
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/20">
          {indicadores.map((item) => (
            <li key={item.id} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="text-[56px] leading-none font-medium tracking-tight text-white tabular-nums min-[1100px]:text-[72px]">
                <CountUp value={item.valor} prefixo={item.prefixo} sufixo={item.sufixo} />
              </p>
              <p className="mt-3 max-w-[16ch] text-sm leading-6 text-white/75">{item.rotulo}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
