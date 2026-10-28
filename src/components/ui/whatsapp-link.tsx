import type { ReactNode } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function WhatsAppLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-medium text-white transition-colors hover:bg-[#1d9203]",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden />
      {children}
    </a>
  )
}
