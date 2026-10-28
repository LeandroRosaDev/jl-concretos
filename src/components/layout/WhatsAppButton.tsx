import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/content/site"

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      aria-label="Falar no WhatsApp com a JL Concreto Usinado"
      className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg hover:bg-[#1d9203]"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  )
}
