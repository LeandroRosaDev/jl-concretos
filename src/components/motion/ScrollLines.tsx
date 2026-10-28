"use client"

import { useEffect, useRef, useState } from "react"

type Line = {
  width: number
  opacity: number
  /** comprimento de onda em alturas de tela */
  wave: number
  phase: number
  amplitude: number
  sweep: number
  drift: number
}

const lines: Line[] = [
  { width: 4, opacity: 0.3, wave: 2.6, phase: 0, amplitude: 0.6, sweep: 90, drift: -0.06 },
  { width: 3, opacity: 0.24, wave: 3.4, phase: Math.PI, amplitude: 0.55, sweep: -112, drift: 0.05 },
  { width: 2.5, opacity: 0.2, wave: 2, phase: Math.PI / 2, amplitude: 0.66, sweep: 74, drift: 0.08 },
  { width: 3.5, opacity: 0.26, wave: 4.2, phase: -Math.PI / 3, amplitude: 0.5, sweep: -134, drift: -0.09 },
  { width: 2, opacity: 0.16, wave: 3, phase: (2 * Math.PI) / 3, amplitude: 0.62, sweep: 152, drift: 0.11 },
]

function buildPath(line: Line, width: number, height: number, viewport: number) {
  const lambda = Math.max(240, line.wave * viewport)
  const amp = line.amplitude * width
  const center = width / 2
  const step = 26
  const margin = lambda + Math.abs(line.drift) * height * 1.2
  const from = -margin
  const to = height + margin
  let d = ""
  for (let y = from; y <= to; y += step) {
    const x = center + amp * Math.sin((2 * Math.PI * y) / lambda + line.phase)
    d += `${d ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

export function ScrollLines() {
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const [paths, setPaths] = useState<string[]>([])
  const [box, setBox] = useState({ width: 1440, height: 4000 })

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const measure = () => {
      const rect = svg.getBoundingClientRect()
      const viewport = window.innerHeight
      setBox({ width: rect.width, height: rect.height })
      setPaths(lines.map((line) => buildPath(line, rect.width, rect.height, viewport)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!paths.length) return
    const groups = groupRefs.current
    const drawn = pathRefs.current
    const lengths = drawn.map((path) => (path ? path.getTotalLength() : 0))
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")

    const update = () => {
      const hero = document.getElementById("inicio")
      const start = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight
      const still = media.matches
      const scrolled = Math.max(0, window.scrollY + window.innerHeight - start)

      drawn.forEach((path, index) => {
        if (!path) return
        const length = lengths[index]
        path.style.strokeDasharray = `${length}`
        if (still) {
          path.style.strokeDashoffset = "0"
          return
        }
        const grow = Math.min(1, scrolled / Math.max(1, window.innerHeight * 0.9))
        path.style.strokeDashoffset = `${length * (1 - grow)}`
      })

      groups.forEach((group, index) => {
        if (!group) return
        if (still) {
          group.setAttribute("transform", "translate(0 0)")
          return
        }
        const line = lines[index]
        const x = line.sweep * Math.sin(scrolled / 460 + line.phase)
        const y = line.drift * scrolled
        group.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    media.addEventListener("change", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      media.removeEventListener("change", update)
    }
  }, [paths])

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 ${box.width} ${box.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {paths.map((d, index) => (
        <g
          key={lines[index].phase + lines[index].wave}
          ref={(node) => {
            groupRefs.current[index] = node
          }}
        >
          <path
            ref={(node) => {
              pathRefs.current[index] = node
            }}
            d={d}
            fill="none"
            stroke="#ab1815"
            strokeWidth={lines[index].width}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity={lines[index].opacity}
          />
        </g>
      ))}
    </svg>
  )
}
