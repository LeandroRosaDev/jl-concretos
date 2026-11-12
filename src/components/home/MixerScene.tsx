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
const BIN_LABEL = "text-[12px] font-medium md:text-[10.5px]"

const pct = (value: number, total: number) => `${(value / total) * 100}%`

// Ordem da usina, da esquerda para a direita: cimento, brita 0, brita 1,
// areia natural, areia artificial e água. Todos descem para a balança.
type LabelLine = { text: string; fit?: number }

type Bin = {
  id: string
  x: number
  lines: LabelLine[]
  feed: string
  feedColor: string
  fill: [number, number]
}

const BIN = { w: 50, top: 30, body: 64, tip: 82, outlet: 87 }
const BIN_MAX = BIN.tip - BIN.top

const bins: Bin[] = [
  {
    id: "brita-0",
    x: 68,
    lines: [{ text: "BRITA" }, { text: "0" }],
    feed: "M93 87 V97 H146 V104",
    feedColor: "#d9d9d4",
    fill: [0.1, 0.24],
  },
  {
    id: "brita-1",
    x: 130,
    lines: [{ text: "BRITA" }, { text: "1" }],
    feed: "M155 87 V97 H166 V104",
    feedColor: "#d9d9d4",
    fill: [0.12, 0.26],
  },
  {
    id: "areia-natural",
    x: 192,
    lines: [{ text: "AREIA" }, { text: "NATURAL", fit: 48 }],
    feed: "M217 87 V97 H204 V104",
    feedColor: "#d8b878",
    fill: [0.15, 0.29],
  },
  {
    id: "areia-artificial",
    x: 254,
    lines: [{ text: "AREIA" }, { text: "ARTIFICIAL", fit: 56 }],
    feed: "M279 87 V97 H226 V104",
    feedColor: "#ece4cf",
    fill: [0.18, 0.31],
  },
]

const SILO = { x: 14, w: 42, top: 26, bottom: 118, fill: [0.08, 0.22] as [number, number] }
const TANK = { x: 318, w: 50, top: 34, bottom: 72, fill: [0.2, 0.34] as [number, number] }

const binShape = (x: number) => {
  const cx = x + BIN.w / 2
  return `M${x} ${BIN.top} H${x + BIN.w} V${BIN.body} L${cx + 5} ${BIN.tip} H${cx - 5} L${x} ${BIN.body} Z`
}

type Material = {
  id: string
  label: string
  src: string
  mobile: boolean
  from: { x: number; y: number }
  to: { x: number; y: number }
}

const materials: Material[] = [
  { id: "cimento", label: "Cimento", src: "/imagens/materiais/cimento.png", mobile: true, from: { x: -80, y: 40 }, to: { x: 35, y: 64 } },
  { id: "brita", label: "Brita", src: "/imagens/materiais/brita.png", mobile: true, from: { x: -90, y: 250 }, to: { x: 124, y: 50 } },
  { id: "areia", label: "Areia", src: "/imagens/materiais/areia.png", mobile: true, from: { x: 730, y: 240 }, to: { x: 248, y: 50 } },
  { id: "agua", label: "Água", src: "/imagens/materiais/agua.png", mobile: false, from: { x: 730, y: 20 }, to: { x: 343, y: 52 } },
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

function BinLabel({ x, lines }: { x: number; lines: LabelLine[] }) {
  const baselines = lines.length === 1 ? [21] : [9, 21]
  return (
    <>
      {lines.map((line, index) => (
        <text
          key={line.text}
          x={x}
          y={baselines[index]}
          textAnchor="middle"
          fill="#f7f7f5"
          opacity="0.85"
          className={BIN_LABEL}
          {...(line.fit ? { textLength: line.fit, lengthAdjust: "spacingAndGlyphs" as const } : {})}
        >
          {line.text}
        </text>
      ))}
    </>
  )
}

// Texturas leves para cada insumo, em vez de PNGs pesados dentro do SVG.
function MaterialPatterns() {
  return (
    <>
      <pattern id="jl-tex-brita-0" width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="#6f6f6b" />
        <circle cx="2" cy="2" r="1.9" fill="#b3b3ae" />
        <circle cx="6.5" cy="3" r="1.6" fill="#8e8e89" />
        <circle cx="3.5" cy="6.8" r="1.7" fill="#9f9f9a" />
        <circle cx="7.6" cy="7.4" r="1.3" fill="#c8c8c3" />
      </pattern>
      <pattern id="jl-tex-brita-1" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#5f5f5b" />
        <circle cx="4" cy="4" r="3.6" fill="#a9a9a4" />
        <circle cx="12" cy="5" r="3.2" fill="#85857f" />
        <circle cx="7.5" cy="12" r="3.5" fill="#b9b9b4" />
        <circle cx="14.5" cy="13" r="2.4" fill="#93938e" />
        <circle cx="1" cy="12" r="2" fill="#7c7c77" />
      </pattern>
      <pattern id="jl-tex-areia-natural" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#c69a5c" />
        <circle cx="1.2" cy="1.4" r="0.7" fill="#e3c08a" />
        <circle cx="4.3" cy="2.6" r="0.6" fill="#9e7541" />
        <circle cx="2.6" cy="4.7" r="0.6" fill="#ddb57a" />
        <circle cx="5.2" cy="5.3" r="0.5" fill="#a87d47" />
      </pattern>
      <pattern id="jl-tex-areia-artificial" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#ddd8cb" />
        <circle cx="1.2" cy="1.4" r="0.7" fill="#f6f3ea" />
        <circle cx="4.3" cy="2.6" r="0.6" fill="#b5afa1" />
        <circle cx="2.6" cy="4.7" r="0.6" fill="#f0ece1" />
        <circle cx="5.2" cy="5.3" r="0.5" fill="#c2bcae" />
      </pattern>
      <pattern id="jl-tex-agua" width="20" height="8" patternUnits="userSpaceOnUse">
        <rect width="20" height="8" fill="#1f86d4" />
        <path d="M0 4 Q5 1 10 4 T20 4" fill="none" stroke="#5cc2f5" strokeWidth="1.4" opacity="0.8" />
      </pattern>
    </>
  )
}

function PlantScene({
  fills,
  feeds,
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
  fills: RefObject<Record<string, SVGRectElement | null>>
  feeds: RefObject<SVGGElement | null>
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
  const fillRef = (id: string) => (node: SVGRectElement | null) => {
    fills.current[id] = node
  }
  const siloCx = SILO.x + SILO.w / 2
  const tankCx = TANK.x + TANK.w / 2

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <MaterialPatterns />
        {bins.map((bin) => (
          <clipPath key={bin.id} id={`jl-clip-${bin.id}`}>
            <path d={binShape(bin.x)} />
          </clipPath>
        ))}
        <clipPath id="jl-clip-silo">
          <rect x={SILO.x} y={SILO.top} width={SILO.w} height={SILO.bottom - SILO.top} rx="4" />
        </clipPath>
        <clipPath id="jl-clip-tank">
          <rect x={TANK.x} y={TANK.top} width={TANK.w} height={TANK.bottom - TANK.top} rx="6" />
        </clipPath>
      </defs>

      <line x1="0" y1={GROUND} x2={VB.w} y2={GROUND} stroke="#f7f7f5" strokeWidth="2" opacity="0.4" />

      {/* Estrutura da usina, atrás de tudo para não cruzar os rótulos. */}
      <g opacity="0.55" stroke="#f7f7f5" strokeWidth="3" fill="none">
        <path d={`M128 104 L96 ${GROUND}`} />
        <path d={`M238 104 L398 ${GROUND}`} />
        <g opacity="0.4">
          <path d="M110 216 L348 216" strokeWidth="2" />
          <path d="M103 254 L373 254" strokeWidth="2" />
        </g>
      </g>

      {/* Bomba: só o mastro e a lança, ligados à traseira do caminhão estacionado. */}
      <g ref={pump} opacity="0" fill="none" stroke="#f7f7f5" strokeLinecap="round">
        <path d="M306 258 C 296 262, 290 268, 286 276" strokeWidth="4" />
        <path d={`M286 ${GROUND} V140`} strokeWidth="4" />
        <path d={`M278 ${GROUND} H294`} strokeWidth="4" />
        <path d="M286 140 L368 100 L470 108 L560 128" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="368" cy="100" r="4" fill="#ab1815" stroke="none" />
        <circle cx="470" cy="108" r="4" fill="#ab1815" stroke="none" />
        <text x="280" y="236" textAnchor="end" fill="#f7f7f5" fillOpacity="0.75" stroke="#111111" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" className={LABEL}>
          BOMBA
        </text>
      </g>

      {/* Canos tracejados: cada insumo desce até a balança. */}
      <g ref={feeds} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5">
        <path d={`M${siloCx} 143 C 64 152, 100 130, 132 116`} stroke="#f7f7f5" />
        {bins.map((bin) => (
          <path key={bin.id} d={bin.feed} stroke={bin.feedColor} />
        ))}
        <path d={`M${tankCx} 78 C 340 100, 290 108, 236 114`} stroke="#5ec4f2" />
      </g>

      {/* Cimento */}
      <rect x={SILO.x} y={SILO.top} width={SILO.w} height={SILO.bottom - SILO.top} rx="4" fill="#161616" />
      <rect ref={fillRef("silo")} clipPath="url(#jl-clip-silo)" x={SILO.x} y={SILO.bottom} width={SILO.w} height="0" fill="#ecece8" />
      <rect x={SILO.x} y={SILO.top} width={SILO.w} height={SILO.bottom - SILO.top} rx="4" fill="none" stroke="#f7f7f5" strokeWidth="2" />
      <path d={`M${SILO.x} 57 H${SILO.x + SILO.w} M${SILO.x} 88 H${SILO.x + SILO.w}`} stroke="#9a9a96" strokeWidth="1" />
      <path d={`M${SILO.x} ${SILO.bottom} H${SILO.x + SILO.w} L${siloCx + 3} 138 H${siloCx - 3} Z`} fill="#bdbdb8" stroke="#f7f7f5" strokeWidth="2" strokeLinejoin="round" />
      <rect x={siloCx - 3} y="138" width="6" height="5" fill="#f7f7f5" />
      <BinLabel x={siloCx} lines={[{ text: "CIMENTO", fit: 46 }]} />

      {/* Britas e areias */}
      {bins.map((bin) => {
        const cx = bin.x + BIN.w / 2
        const shape = binShape(bin.x)
        return (
          <g key={bin.id}>
            <path d={shape} fill="#161616" />
            <rect
              ref={fillRef(bin.id)}
              clipPath={`url(#jl-clip-${bin.id})`}
              x={bin.x}
              y={BIN.tip}
              width={BIN.w}
              height="0"
              fill={`url(#jl-tex-${bin.id})`}
            />
            <path d={shape} fill="none" stroke="#f7f7f5" strokeWidth="2" strokeLinejoin="round" />
            <rect x={cx - 3} y={BIN.tip} width="6" height={BIN.outlet - BIN.tip} fill={bin.feedColor} />
            <BinLabel x={cx} lines={bin.lines} />
          </g>
        )
      })}

      {/* Água */}
      <rect x={TANK.x} y={TANK.top} width={TANK.w} height={TANK.bottom - TANK.top} rx="6" fill="#14222c" />
      <rect ref={fillRef("tank")} clipPath="url(#jl-clip-tank)" x={TANK.x} y={TANK.bottom} width={TANK.w} height="0" fill="url(#jl-tex-agua)" />
      <rect x={TANK.x} y={TANK.top} width={TANK.w} height={TANK.bottom - TANK.top} rx="6" fill="none" stroke="#f7f7f5" strokeWidth="2" />
      <rect x={tankCx - 3} y={TANK.bottom} width="6" height="6" fill="#5ec4f2" />
      <BinLabel x={tankCx} lines={[{ text: "ÁGUA" }]} />

      {/* Balança */}
      <rect x="132" y="104" width="102" height="26" rx="2" fill="#111" stroke="#f7f7f5" strokeWidth="2" />
      <rect ref={scaleFill} x="134" y="128" width="98" height="0" fill="#8f8f8a" opacity="0.9" />
      <path d="M152 106 V128 M172 106 V128 M193 106 V128 M214 106 V128" stroke="#f7f7f5" strokeWidth="1" opacity="0.3" />
      <path d="M128 104 H140 M226 104 H238" stroke="#f7f7f5" strokeWidth="3" strokeLinecap="round" />
      <path d="M183 130 V132" stroke="#f7f7f5" strokeWidth="4" />
      <text x="244" y="132" textAnchor="start" fill="#f7f7f5" fillOpacity="0.75" stroke="#111111" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" className={LABEL}>
        BALANÇA
      </text>

      {/* Misturador */}
      <circle cx="183" cy="156" r="24" fill="#161616" stroke="#f7f7f5" strokeWidth="2.5" />
      <circle cx="183" cy="156" r="14" fill="none" stroke="#f7f7f5" strokeWidth="1.2" opacity="0.4" />
      <g ref={blades}>
        <line x1="183" y1="156" x2="183" y2="136" stroke="#f7f7f5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="183" y1="156" x2="201" y2="167" stroke="#f7f7f5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="183" y1="156" x2="165" y2="167" stroke="#ab1815" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="183" cy="156" r="3" fill="#ab1815" />
      <text x="212" y="156" textAnchor="start" fill="#f7f7f5" fillOpacity="0.75" stroke="#111111" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" className={LABEL}>
        MISTURADOR
      </text>

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
      <text x="560" y="312" textAnchor="middle" fill="#f7f7f5" fillOpacity="0.75" stroke="#111111" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" className={LABEL}>
        SUA OBRA
      </text>

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

  const fills = useRef<Record<string, SVGRectElement | null>>({})
  const feeds = useRef<SVGGElement>(null)
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

    fillUp(fills.current.silo ?? null, value, SILO.fill[0], SILO.fill[1], SILO.bottom, SILO.bottom - SILO.top - 4)
    for (const bin of bins) fillUp(fills.current[bin.id] ?? null, value, bin.fill[0], bin.fill[1], BIN.tip, BIN_MAX - 4)
    fillUp(fills.current.tank ?? null, value, TANK.fill[0], TANK.fill[1], TANK.bottom, TANK.bottom - TANK.top - 4)
    fillUp(scaleFill.current, value, 0.34, 0.46, 128, 20)

    if (feeds.current) feeds.current.style.strokeDashoffset = String(segment(value, [0.3, 0.64], [0, -160]))
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
            fills={fills}
            feeds={feeds}
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
