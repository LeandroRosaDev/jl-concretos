import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const sectionPad = "py-16 md:py-20 min-[1200px]:py-28"

export function Container({
  wide = false,
  className,
  children,
}: {
  wide?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        wide ? "max-w-[1240px]" : "max-w-[1120px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-xs font-medium tracking-[0.16em] text-brand uppercase", className)}>
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  inverse = false,
  className,
}: {
  children: ReactNode
  inverse?: boolean
  className?: string
}) {
  return (
    <h2
      className={cn(
        "text-[32px] leading-[38px] font-medium tracking-tight min-[1200px]:text-[46px] min-[1200px]:leading-[52px]",
        inverse ? "text-inverse" : "text-ink",
        className,
      )}
    >
      {children}
    </h2>
  )
}
