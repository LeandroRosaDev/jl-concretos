"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const radius = 18
const circumference = 2 * Math.PI * radius

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > 400)
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lg transition-opacity duration-200",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }}
    >
      <svg className="absolute inset-0 size-12 -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#e4e6ea" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#ab1815"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp strokeWidth={1.5} className="relative size-5" aria-hidden />
    </button>
  )
}
