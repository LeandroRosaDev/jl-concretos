"use client"

import { useEffect, useRef, useState } from "react"
import { bandeiras } from "@/content/site"

function depthOf(index: number, top: number, total: number) {
  return (index - top + total) % total
}

export function CardStack() {
  const ref = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const [top, setTop] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const applyReduce = () => setReduce(media.matches)
    applyReduce()
    media.addEventListener("change", applyReduce)

    const update = () => {
      const section = ref.current?.closest("section")
      if (!section || media.matches) return
      const rect = section.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      const next = Math.min(bandeiras.length - 1, Math.floor(progress * bandeiras.length))
      if (next === indexRef.current) return
      const flown = indexRef.current
      setLeaving(flown)
      indexRef.current = next
      setTop(next)
      window.setTimeout(() => setLeaving((current) => (current === flown ? null : current)), 560)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      media.removeEventListener("change", applyReduce)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={ref} className="relative mx-auto h-[250px] w-full max-w-[340px]">
      {bandeiras.map((bandeira, index) => {
        const total = bandeiras.length
        const depth = depthOf(index, top, total)
        const flying = leaving === index && index !== top
        const style = reduce
          ? {
              transform: `translateX(${(index - (total - 1) / 2) * 18}px) rotate(${(index - (total - 1) / 2) * 7}deg)`,
              zIndex: index + 1,
            }
          : flying
            ? {
                transform: "translateX(78%) rotate(16deg) scale(0.96)",
                zIndex: 30,
              }
            : {
                transform: `translateY(${depth * 12}px) scale(${1 - depth * 0.045}) rotate(${depth * -1.5}deg)`,
                zIndex: total - depth,
              }

        return (
          <article
            key={bandeira.nome}
            className="absolute inset-x-0 top-0 aspect-[16/10] overflow-hidden rounded-3xl p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out"
            style={{
              backgroundImage: `linear-gradient(135deg, ${bandeira.de}, ${bandeira.ate})`,
              ...style,
            }}
          >
            <div className="flex items-start justify-between">
              <span className="block h-7 w-9 rounded-md bg-gradient-to-br from-[#f6e2a8] to-[#b8893a]" aria-hidden />
              {bandeira.nome === "Mastercard" ? (
                <span className="flex" aria-hidden>
                  <span className="size-7 rounded-full bg-[#eb001b]" />
                  <span className="-ml-3 size-7 rounded-full bg-[#f79e1b]" />
                </span>
              ) : (
                <span className="text-[10px] tracking-[0.18em] text-white/70 uppercase">crédito</span>
              )}
            </div>
            <p className="mt-6 text-sm tracking-[0.28em] text-white/80">•••• 4812</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-lg leading-tight font-medium tracking-wide uppercase">{bandeira.nome}</p>
              <p className="text-right text-[11px] tracking-[0.14em] text-white/75 uppercase">até 12x</p>
            </div>
            <span className="absolute top-0 right-0 h-full w-10 bg-white/10" aria-hidden />
          </article>
        )
      })}
    </div>
  )
}
