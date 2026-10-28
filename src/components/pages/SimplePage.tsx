import type { ReactNode } from "react"
import { Container, Eyebrow, sectionPad } from "@/components/layout/primitives"
import { cn } from "@/lib/utils"

export function PageMain({
  children,
  tone = "white",
  className,
}: {
  children: ReactNode
  tone?: "white" | "mist"
  className?: string
}) {
  return (
    <main className={cn(tone === "mist" ? "bg-mist" : "bg-white", "pt-16 md:pt-[100px]", className)}>
      {children}
    </main>
  )
}

export function PageBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <Container className={cn(sectionPad, className)}>{children}</Container>
}

export function PageIntro({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string
  title: string
  summary?: string
}) {
  return (
    <header>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 max-w-[20ch] text-[32px] leading-[38px] font-medium tracking-tight text-ink min-[1200px]:text-[48px] min-[1200px]:leading-[52px]">
        {title}
      </h1>
      {summary ? (
        <p className="mt-6 max-w-[42rem] text-base leading-[26px] text-quiet min-[1200px]:text-[18px] min-[1200px]:leading-[30px]">
          {summary}
        </p>
      ) : null}
    </header>
  )
}
