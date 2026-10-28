"use client"

import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState, type RefObject } from "react"
import { siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { cn } from "@/lib/utils"

// Toda a cena vive num viewBox 640x320 e o wrapper tem a mesma proporção,
// então coordenadas do SVG e posições em % do wrapper apontam para o mesmo ponto.
const VB = { w: 640, h: 320 }
const GROUND = 292
// icone.png é 512x512 com o caminhão ocupando y 141..395 e x 9..512,
// então a caixa quadrada precisa afundar a margem transparente para as rodas
// pararem na linha do chão.
const TRUCK = { box: 180, x: 193, travel: 106, wheels: 0.771 }
const TRUCK_BOTTOM = VB.h - (GROUND - TRUCK.wheels * TRUCK.box + TRUCK.box)

const LABEL = "text-[15px] md:text-[12px]"

const pct = (value: number, total: number) => `${(value / total) * 100}%`

type Material = {
  id: string
  label: string
  src: string
  mobile: boolean
  from: { x: number; y: number }
  to: { x: number; y: number }
}

const materials: Material[] = [
  { id: "brita", label: "Brita", src: "/imagens/materiais/brita.png", mobile: true, from: { x: -90, y: 250 }, to: { x: 99, y: 46 } },
  { id: "areia", label: "Areia", src: "/imagens/materiais/areia.png", mobile: true, from: { x: 730, y: 240 }, to: { x: 165, y: 46 } },
  { id: "cimento", label: "Cimento", src: "/imagens/materiais/cimento.png", mobile: true, from: { x: -80, y: 40 }, to: { x: 39, y: 62 } },
  { id: "agua", label: "Água", src: "/imagens/materiais/agua.png", mobile: false, from: { x: 730, y: 20 }, to: { x: 303, y: 52 } },
]

function usePaint<T>(value: MotionValue<T>, apply: (next: T) => void) {
  const applyRef = useRef(apply)
  useEffect(() => {
    applyRef.current = apply
    apply(value.get())
  }, [apply, value])
  useMotionValueEvent(value, "change", (next) => applyRef.current(next))
}

function segment(progress: number, input: number[], output: number[]) {
  if (progress <= input[0]) return output[0]
  for (let index = 1; index < input.length; index += 1) {
    if (progress <= input[index]) {
      const span = input[index] - input[index - 1]
      const amount = span === 0 ? 0 : (progress - input[index - 1]) / span
      return output[index - 1] + (output[index] - output[index - 1]) * amount
    }
  }
  return output[output.length - 1]
}

function travelWindow(index: number) {
  const start = 0.02 + index * 0.05
  const end = 0.2 + index * 0.05
  return { start, end, mid: (start + end) / 2 }
}

function fillUp(node: SVGRectElement | null, progress: number, from: number, to: number, bottom: number, max: number) {
  if (!node) return
  const height = (segment(progress, [from, to], [0, 100]) / 100) * max
  node.setAttribute("height", height.toFixed(1))
  node.setAttribute("y", (bottom - height).toFixed(1))
}

function FlyingMaterial({
  material,
  index,
  progress,
  width,
}: {
  material: Material
  index: number
  progress: MotionValue<number>
  width: number
}) {
  const { start, end, mid } = travelWindow(index)
  const size = width < 520 ? 76 : 104
  const arc = (index % 2 === 0 ? -1 : 1) * 70
  const nodeRef = useRef<HTMLDivElement>(null)

  usePaint(progress, (value) => {
    const node = nodeRef.current
    if (!node) return
    const scale = width / VB.w
    const fromX = (material.from.x - size / 2) * scale
    const fromY = (material.from.y - size / 2) * scale
    const toX = (material.to.x - size / 2) * scale
    const toY = (material.to.y - size / 2) * scale
    const x = segment(value, [start, mid, end], [fromX, (fromX + toX) / 2 + arc * scale, toX])
    const y = segment(value, [start, mid, end], [fromY, Math.min(fromY, toY) - 60 * scale, toY])
    const rotate = segment(value, [start, end], [-10, 14])
    const shrink = segment(value, [start, end - 0.02, end], [1, 1, 0.3])
    node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${shrink})`
    node.style.opacity = String(segment(value, [start - 0.02, start, end - 0.02, end + 0.01], [0, 1, 1, 0]))
  })

  return (
    <div
      ref={nodeRef}
      aria-hidden
      className={cn("absolute top-0 left-0 z-30 will-change-transform", !material.mobile && "max-md:hidden")}
      style={{ width: pct(size, VB.w) }}
    >
      <Image src={material.src} alt="" width={300} height={300} className="h-auto w-full object-contain drop-shadow-xl" />
      <span className="mt-1 block text-center text-[10px] font-medium tracking-[0.14em] text-inverse uppercase md:text-xs">
        {material.label}
      </span>
    </div>
  )
}

function GiantWord({
  text,
  progress,
  opacityInput,
  opacityOutput,
  fillFrom,
  fillTo,
}: {
  text: string
  progress: MotionValue<number>
  opacityInput: number[]
  opacityOutput: number[]
  fillFrom: number
  fillTo: number
}) {
  const wordRef = useRef<HTMLParagraphElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  usePaint(progress, (value) => {
    if (wordRef.current) wordRef.current.style.opacity = String(segment(value, opacityInput, opacityOutput))
    if (fillRef.current) {
      const amount = segment(value, [fillFrom, fillTo], [0, 1])
      fillRef.current.style.clipPath = `inset(0 ${((1 - amount) * 100).toFixed(2)}% 0 0)`
    }
  })

  return (
    <p
      ref={wordRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[9%] text-center text-[11vw] leading-none font-medium tracking-tight md:text-[6.4vw]"
    >
      <span className="relative inline-block">
        <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(247,247,245,0.5)]">{text}</span>
        <span ref={fillRef} className="absolute inset-0 text-brand">
          {text}
        </span>
      </span>
    </p>
  )
}

function PlantScene({
  bin0,
  bin1,
  bin2,
  silo,
  tank,
  belt,
  screw,
  waterPipe,
  scaleFill,
  blades,
  chute,
  loadStream,
  pump,
  pourStream,
  floorLow,
  floorMid,
  floorTop,
}: {
  bin0: RefObject<SVGRectElement | null>
  bin1: RefObject<SVGRectElement | null>
  bin2: RefObject<SVGRectElement | null>
  silo: RefObject<SVGRectElement | null>
  tank: RefObject<SVGRectElement | null>
  belt: RefObject<SVGPathElement | null>
  screw: RefObject<SVGPathElement | null>
  waterPipe: RefObject<SVGPathElement | null>
  scaleFill: RefObject<SVGRectElement | null>
  blades: RefObject<SVGGElement | null>
  chute: RefObject<SVGGElement | null>
  loadStream: RefObject<SVGPathElement | null>
  pump: RefObject<SVGGElement | null>
  pourStream: RefObject<SVGPathElement | null>
  floorLow: RefObject<SVGRectElement | null>
  floorMid: RefObject<SVGRectElement | null>
  floorTop: RefObject<SVGRectElement | null>
}) {
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <clipPath id="jl-bin-0">
          <path d="M72 22 H126 L120 84 H78 Z" />
        </clipPath>
        <clipPath id="jl-bin-1">
          <path d="M138 22 H192 L186 84 H144 Z" />
        </clipPath>
        <clipPath id="jl-bin-2">
          <path d="M204 22 H258 L252 84 H210 Z" />
        </clipPath>
        <clipPath id="jl-silo">
          <rect x="18" y="14" width="42" height="116" />
        </clipPath>
        <clipPath id="jl-tank">
          <rect x="278" y="30" width="50" height="46" rx="6" />
        </clipPath>
      </defs>

      <line x1="0" y1={GROUND} x2={VB.w} y2={GROUND} stroke="#f7f7f5" strokeWidth="2" opacity="0.4" />

      <path d="M70 22 H128 L121 86 H77 Z" fill="none" stroke="#f7f7f5" strokeWidth="2" />
      <path d="M136 22 H194 L187 86 H143 Z" fill="none" stroke="#f7f7f5" strokeWidth="2" />
      <path d="M202 22 H260 L253 86 H209 Z" fill="none" stroke="#f7f7f5" strokeWidth="2" />
      <rect ref={bin0} clipPath="url(#jl-bin-0)" x="70" y="84" width="60" height="0" fill="#9a9a96" />
      <rect ref={bin1} clipPath="url(#jl-bin-1)" x="136" y="84" width="60" height="0" fill="#c2a15a" />
      <rect ref={bin2} clipPath="url(#jl-bin-2)" x="202" y="84" width="60" height="0" fill="#b7b7b2" />
      <text x="99" y="16" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        BRITA
      </text>
      <text x="165" y="16" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        AREIA
      </text>
      <text x="231" y="16" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        PEDRA
      </text>

      <path d="M99 86 V96 M165 86 V96 M231 86 V96" stroke="#f7f7f5" strokeWidth="2" opacity="0.5" />
      <path d="M86 98 H246" stroke="#3a3a3a" strokeWidth="9" strokeLinecap="round" />
      <path
        ref={belt}
        d="M86 98 H246"
        fill="none"
        stroke="#f7f7f5"
        strokeWidth="2"
        strokeDasharray="7 9"
        opacity="0.9"
      />

      <rect x="18" y="14" width="42" height="116" rx="4" fill="#161616" stroke="#f7f7f5" strokeWidth="2" />
      <rect ref={silo} clipPath="url(#jl-silo)" x="18" y="130" width="42" height="0" fill="#d9d9d4" />
      <path d="M18 130 H60 L39 154 Z" fill="#161616" stroke="#f7f7f5" strokeWidth="2" />
      <text x="39" y="8" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        CIMENTO
      </text>
      <path
        ref={screw}
        d="M39 152 C 70 146, 96 128, 128 112"
        fill="none"
        stroke="#ab1815"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 8"
      />

      <rect x="278" y="30" width="50" height="46" rx="6" fill="#14222c" stroke="#f7f7f5" strokeWidth="2" />
      <rect ref={tank} clipPath="url(#jl-tank)" x="278" y="76" width="50" height="0" fill="#3d88b8" />
      <text x="303" y="24" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        ÁGUA
      </text>
      <path
        ref={waterPipe}
        d="M303 76 C 300 96, 272 104, 240 110"
        fill="none"
        stroke="#7eb7d6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 8"
      />

      <path d="M128 100 H238 L190 132 H176 Z" fill="#111" stroke="#f7f7f5" strokeWidth="2" />
      <rect ref={scaleFill} x="132" y="130" width="102" height="0" fill="#8f8f8a" opacity="0.9" />
      <text x="250" y="128" textAnchor="start" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        BALANÇA
      </text>

      <circle cx="183" cy="156" r="24" fill="#161616" stroke="#f7f7f5" strokeWidth="2.5" />
      <circle cx="183" cy="156" r="14" fill="none" stroke="#f7f7f5" strokeWidth="1.2" opacity="0.4" />
      <g ref={blades}>
        <line x1="183" y1="156" x2="183" y2="136" stroke="#f7f7f5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="183" y1="156" x2="201" y2="167" stroke="#f7f7f5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="183" y1="156" x2="165" y2="167" stroke="#ab1815" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="212" y="150" textAnchor="start" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        MISTURADOR
      </text>

      <g opacity="0.55" stroke="#f7f7f5" strokeWidth="3" fill="none">
        <path d={`M128 104 L96 ${GROUND}`} />
        <path d={`M238 104 L398 ${GROUND}`} />
        <g opacity="0.4">
          <path d="M110 216 L348 216" strokeWidth="2" />
          <path d="M103 254 L373 254" strokeWidth="2" />
        </g>
      </g>

      <g ref={chute}>
        <path d="M183 180 L238 190" stroke="#1a1c1f" strokeWidth="11" strokeLinecap="round" />
        <path d="M183 180 L238 190" stroke="#f7f7f5" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path
        ref={loadStream}
        d="M237 190 C 240 196, 241 200, 242 208"
        fill="none"
        stroke="#c5c5c0"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0"
      />

      <g opacity="0.9" fill="none" stroke="#f7f7f5">
        <path d={`M498 150 V${GROUND} M622 150 V${GROUND}`} strokeWidth="4" />
        <path d="M560 150 V292" strokeWidth="2" opacity="0.6" />
        <path d="M494 150 H626 M494 196 H626 M494 242 H626" strokeWidth="4" />
        <path d={`M494 ${GROUND} H626`} strokeWidth="4" />
        <path d="M498 150 V138 M560 150 V138 M622 150 V138" stroke="#ab1815" strokeWidth="3" />
      </g>
      <rect ref={floorLow} x="500" y="290" width="120" height="0" fill="#c5c5c0" />
      <rect ref={floorMid} x="500" y="240" width="120" height="0" fill="#c5c5c0" />
      <rect ref={floorTop} x="500" y="194" width="120" height="0" fill="#c5c5c0" />
      <text x="560" y="312" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
        SUA OBRA
      </text>

      <g ref={pump} opacity="0">
        <rect x="258" y="270" width="74" height="22" rx="4" fill="#1a1c1f" stroke="#f7f7f5" strokeWidth="2" />
        <circle cx="276" cy="292" r="7" fill="#1a1c1f" stroke="#f7f7f5" strokeWidth="2" />
        <circle cx="316" cy="292" r="7" fill="#1a1c1f" stroke="#f7f7f5" strokeWidth="2" />
        <path d="M262 250 H324 L308 270 H280 Z" fill="#1a1c1f" stroke="#f7f7f5" strokeWidth="2" />
        <path d="M272 250 V140" stroke="#f7f7f5" strokeWidth="4" strokeLinecap="round" />
        <path d="M272 140 L368 100 L470 108 L560 128" fill="none" stroke="#f7f7f5" strokeWidth="4" strokeLinecap="round" />
        <circle cx="368" cy="100" r="4" fill="#ab1815" />
        <circle cx="470" cy="108" r="4" fill="#ab1815" />
        <text x="272" y="236" textAnchor="middle" fill="#f7f7f5" opacity="0.7" className={LABEL}>
          BOMBA
        </text>
      </g>
      <path
        ref={pourStream}
        d="M560 130 V 196"
        fill="none"
        stroke="#c5c5c0"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0"
      />
    </svg>
  )
}

function ScrollScene({ section }: { section: HomeSection }) {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [sceneWidth, setSceneWidth] = useState(900)
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return
    const update = () => {
      const rect = element.getBoundingClientRect()
      const travel = element.offsetHeight - window.innerHeight
      const next = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      scrollYProgress.set(next)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [scrollYProgress])

  useEffect(() => {
    const element = sceneRef.current
    if (!element) return
    const update = () => setSceneWidth(element.getBoundingClientRect().width)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const noteOneRef = useRef<HTMLParagraphElement>(null)
  const noteTwoRef = useRef<HTMLParagraphElement>(null)
  const noteThreeRef = useRef<HTMLParagraphElement>(null)
  const metrosRef = useRef<HTMLSpanElement>(null)
  const truckRef = useRef<HTMLDivElement>(null)
  const drumRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const bin0 = useRef<SVGRectElement>(null)
  const bin1 = useRef<SVGRectElement>(null)
  const bin2 = useRef<SVGRectElement>(null)
  const silo = useRef<SVGRectElement>(null)
  const tank = useRef<SVGRectElement>(null)
  const belt = useRef<SVGPathElement>(null)
  const screw = useRef<SVGPathElement>(null)
  const waterPipe = useRef<SVGPathElement>(null)
  const scaleFill = useRef<SVGRectElement>(null)
  const blades = useRef<SVGGElement>(null)
  const chute = useRef<SVGGElement>(null)
  const loadStream = useRef<SVGPathElement>(null)
  const pump = useRef<SVGGElement>(null)
  const pourStream = useRef<SVGPathElement>(null)
  const floorLow = useRef<SVGRectElement>(null)
  const floorMid = useRef<SVGRectElement>(null)
  const floorTop = useRef<SVGRectElement>(null)

  usePaint(scrollYProgress, (value) => {
    if (noteOneRef.current) noteOneRef.current.style.opacity = String(segment(value, [0.3, 0.38], [1, 0]))
    if (noteTwoRef.current) noteTwoRef.current.style.opacity = String(segment(value, [0.4, 0.48, 0.62, 0.7], [0, 1, 1, 0]))
    if (noteThreeRef.current) noteThreeRef.current.style.opacity = String(segment(value, [0.78, 0.86], [0, 1]))
    if (metrosRef.current) metrosRef.current.textContent = `${Math.round(segment(value, [0.46, 0.64], [0, 8]))} m³`

    fillUp(bin0.current, value, 0.08, 0.22, 84, 60)
    fillUp(bin1.current, value, 0.13, 0.27, 84, 60)
    fillUp(bin2.current, value, 0.19, 0.33, 84, 44)
    fillUp(silo.current, value, 0.15, 0.3, 130, 104)
    fillUp(tank.current, value, 0.2, 0.34, 76, 42)
    fillUp(scaleFill.current, value, 0.34, 0.46, 136, 28)

    if (belt.current) belt.current.style.strokeDashoffset = String(segment(value, [0.3, 0.64], [0, -220]))
    if (screw.current) screw.current.style.strokeDashoffset = String(segment(value, [0.3, 0.6], [0, -140]))
    if (waterPipe.current) waterPipe.current.style.strokeDashoffset = String(segment(value, [0.32, 0.6], [0, -130]))
    if (blades.current) {
      blades.current.setAttribute("transform", `rotate(${segment(value, [0.42, 0.68], [0, 640])} 183 156)`)
    }
    if (chute.current) {
      chute.current.setAttribute("transform", `rotate(${segment(value, [0.44, 0.52], [-14, 0])} 183 180)`)
    }
    if (loadStream.current) {
      loadStream.current.style.opacity = String(segment(value, [0.5, 0.55, 0.64, 0.68], [0, 1, 1, 0]))
    }

    if (drumRef.current) {
      drumRef.current.style.opacity = String(segment(value, [0.44, 0.5, 0.64, 0.7], [0, 0.85, 0.85, 0]))
      drumRef.current.style.transform = `rotate(${segment(value, [0.44, 0.7], [0, 300])}deg)`
    }
    if (truckRef.current) {
      const x = segment(value, [0.68, 0.8], [0, (TRUCK.travel / VB.w) * sceneWidth])
      truckRef.current.style.transform = `translateX(${x}px)`
    }
    if (dustRef.current) dustRef.current.style.opacity = String(segment(value, [0.69, 0.73, 0.78, 0.82], [0, 1, 1, 0]))

    if (pump.current) pump.current.style.opacity = String(segment(value, [0.8, 0.86], [0, 0.95]))
    if (pourStream.current) pourStream.current.style.opacity = String(segment(value, [0.86, 0.9], [0, 1]))
    fillUp(floorLow.current, value, 0.87, 0.92, 290, 46)
    fillUp(floorMid.current, value, 0.92, 0.96, 240, 44)
    fillUp(floorTop.current, value, 0.96, 1, 194, 44)

    if (ctaRef.current) {
      const opacity = segment(value, [0.9, 0.98], [0, 1])
      ctaRef.current.style.opacity = String(opacity)
      ctaRef.current.style.transform = `translateY(${segment(value, [0.9, 0.98], [16, 0])}px)`
      ctaRef.current.style.pointerEvents = opacity > 0.9 ? "auto" : "none"
    }
  })

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-graphite md:h-[240vh]">
      <h2 className="sr-only">{section.titulo}</h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-graphite pt-16 text-inverse">
        <GiantWord text="DOSADO." progress={scrollYProgress} opacityInput={[0.28, 0.38]} opacityOutput={[1, 0]} fillFrom={0.04} fillTo={0.28} />
        <GiantWord
          text="MISTURADO."
          progress={scrollYProgress}
          opacityInput={[0.4, 0.48, 0.64, 0.72]}
          opacityOutput={[0, 1, 1, 0]}
          fillFrom={0.44}
          fillTo={0.62}
        />
        <GiantWord
          text="BOMBEADO."
          progress={scrollYProgress}
          opacityInput={[0.76, 0.84]}
          opacityOutput={[0, 1]}
          fillFrom={0.8}
          fillTo={0.98}
        />

        <p ref={noteOneRef} className="absolute top-20 left-5 z-40 text-xs font-medium tracking-[0.16em] text-inverse uppercase md:top-24 md:left-10">
          01 — insumos na usina
        </p>
        <p ref={noteTwoRef} className="absolute top-20 left-5 z-40 text-xs font-medium tracking-[0.16em] text-inverse uppercase md:top-24 md:left-10">
          02 — <span ref={metrosRef}>0 m³</span> no tambor
        </p>
        <p ref={noteThreeRef} className="absolute top-20 right-5 z-40 text-right text-xs font-medium tracking-[0.16em] text-inverse uppercase md:top-24 md:right-10">
          03 — bombeado na sua obra
        </p>

        <div
          ref={sceneRef}
          className="absolute top-1/2 left-1/2 aspect-[2/1] w-[min(96vw,110vh,1040px)] -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-[6%] md:translate-y-0"
        >
          <PlantScene
            bin0={bin0}
            bin1={bin1}
            bin2={bin2}
            silo={silo}
            tank={tank}
            belt={belt}
            screw={screw}
            waterPipe={waterPipe}
            scaleFill={scaleFill}
            blades={blades}
            chute={chute}
            loadStream={loadStream}
            pump={pump}
            pourStream={pourStream}
            floorLow={floorLow}
            floorMid={floorMid}
            floorTop={floorTop}
          />

          {materials.map((material, index) => (
            <FlyingMaterial key={material.id} material={material} index={index} progress={scrollYProgress} width={sceneWidth} />
          ))}

          <div
            ref={truckRef}
            className="absolute z-20 will-change-transform"
            style={{ left: pct(TRUCK.x, VB.w), bottom: pct(TRUCK_BOTTOM, VB.h), width: pct(TRUCK.box, VB.w) }}
            aria-hidden
          >
            <div ref={dustRef} className="absolute bottom-[22%] -left-4 flex items-center gap-1.5 opacity-0">
              <span className="h-1.5 w-8 rounded-full bg-white/35 blur-sm" />
              <span className="h-1 w-4 rounded-full bg-white/25 blur-sm" />
            </div>
            <div className="absolute right-[2%] bottom-[22%] left-[4%] h-2.5 rounded-full bg-black/60 blur-md motion-safe:animate-[shadow-pulse_3.2s_ease-in-out_infinite]" />
            <div
              ref={drumRef}
              className="pointer-events-none absolute top-[30%] left-[5%] h-[40%] w-[44%] rounded-[45%] border-2 border-dashed border-white/55 opacity-0"
            />
            <Image src="/imagens/icone.png" alt="" width={720} height={420} className="relative h-auto w-full" />
          </div>
        </div>

        <div ref={ctaRef} className="pointer-events-none absolute bottom-6 left-5 z-40 opacity-0 md:left-10">
          <WhatsAppLink href={siteConfig.whatsappHref}>Quero esse concreto na minha obra</WhatsAppLink>
        </div>
      </div>
    </section>
  )
}

function StillScene({ section }: { section: HomeSection }) {
  const passos = ["Dosado na usina", "Misturado no tambor", "Bombeado na obra"]
  return (
    <section className="bg-graphite py-20 text-inverse">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{section.tema}</p>
        <h2 className="mt-4 max-w-[16ch] text-[32px] leading-[38px] font-medium tracking-tight md:text-[46px] md:leading-[52px]">
          {section.titulo}
        </h2>
        <Image
          src="/imagens/obra-carregamento.jpg"
          alt="Carregamento do caminhão betoneira na usina da JL"
          width={960}
          height={640}
          className="mt-8 h-auto w-full max-w-xl rounded-3xl object-cover"
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {passos.map((passo, index) => (
            <li key={passo} className="rounded-3xl border border-white/15 p-5">
              <p className="text-xs tracking-[0.16em] text-brand">0{index + 1}</p>
              <p className="mt-3 text-xl font-medium">{passo}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <WhatsAppLink href={siteConfig.whatsappHref}>Quero esse concreto na minha obra</WhatsAppLink>
        </div>
      </div>
    </section>
  )
}

export function MixerScene({ section }: { section: HomeSection }) {
  return (
    <div id={section.anchor} className="relative z-10">
      <div className="motion-reduce:hidden">
        <ScrollScene section={section} />
      </div>
      <div className="hidden motion-reduce:block">
        <StillScene section={section} />
      </div>
    </div>
  )
}
