import type { ComponentType } from "react"
import type { HomeSection, SectionId } from "@/types/site"
import { About } from "@/components/home/About"
import { Contact } from "@/components/home/Contact"
import { CtaBanner } from "@/components/home/CtaBanner"
import { Differentials } from "@/components/home/Differentials"
import { Faq } from "@/components/home/Faq"
import { Gallery } from "@/components/home/Gallery"
import { Hero } from "@/components/home/Hero"
import { MixerScene } from "@/components/home/MixerScene"
import { Offer } from "@/components/home/Offer"
import { Regions } from "@/components/home/Regions"
import { Services } from "@/components/home/Services"
import { Social } from "@/components/home/Social"
import { Stats } from "@/components/home/Stats"

export const sectionRegistry: Record<SectionId, ComponentType<{ section: HomeSection }>> = {
  hero: Hero,
  stats: Stats,
  sobre: About,
  usina: MixerScene,
  servicos: Services,
  diferenciais: Differentials,
  cta: CtaBanner,
  galeria: Gallery,
  oferta: Offer,
  faq: Faq,
  social: Social,
  regioes: Regions,
  contato: Contact,
}
