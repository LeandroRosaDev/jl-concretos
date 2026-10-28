import { siteConfig } from "@/content/site"

export function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      title="Mapa da JL Concreto Usinado em Duque de Caxias"
      src={siteConfig.mapaEmbed}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
