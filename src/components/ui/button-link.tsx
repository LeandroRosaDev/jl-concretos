"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  onClick,
}: {
  href: string
  children: ReactNode
  variant?: "solid" | "outline" | "outline-dark" | "brand"
  className?: string
  onClick?: () => void
}) {
  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")

  return (
    <Button
      nativeButton={false}
      render={
        external ? (
          <a
            href={href}
            onClick={onClick}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          />
        ) : (
          <Link href={href} onClick={onClick} />
        )
      }
      className={cn(
        "h-12 rounded-full px-6 text-sm font-medium active:translate-y-0",
        variant === "solid" && "bg-ink text-white hover:bg-ink/90",
        variant === "brand" && "bg-brand text-white hover:bg-brand/90",
        variant === "outline" && "border-inverse bg-transparent text-inverse hover:bg-white/10",
        variant === "outline-dark" &&
          "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-transparent",
        className,
      )}
    >
      {children}
    </Button>
  )
}
