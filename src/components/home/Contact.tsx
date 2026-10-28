import { siteConfig } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { MapEmbed } from "@/components/contact/MapEmbed"
import { VendorCards } from "@/components/contact/VendorCards"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"

export function Contact({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10">
      <Container className={sectionPad}>
        <Eyebrow>{section.tema}</Eyebrow>
        <SectionTitle className="mt-4 max-w-[14ch]">{section.titulo}</SectionTitle>
        <p className="mt-4 max-w-[36rem] text-base leading-7 text-quiet">{section.subtitulo}</p>
        <div className="mt-8">
          <VendorCards />
        </div>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-[0.14em] text-quiet uppercase">E-mail</dt>
            <dd className="mt-1">
              <a className="text-ink" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-quiet uppercase">Horário</dt>
            <dd className="mt-1 text-ink">{siteConfig.horario}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-quiet uppercase">Endereço</dt>
            <dd className="mt-1 text-ink">
              {siteConfig.enderecoLinhas[0]}
              <br />
              {siteConfig.enderecoLinhas[1]}
            </dd>
          </div>
        </dl>
      </Container>
      <div className="relative h-[280px] bg-graphite min-[1200px]:h-[420px]">
        <MapEmbed className="absolute inset-0 h-full w-full border-0" />
      </div>
      <Container className="flex flex-col gap-2 py-6">
        <p className="text-sm text-ink">
          {siteConfig.enderecoLinhas[0]} — {siteConfig.enderecoLinhas[1]}
        </p>
        <a
          href={siteConfig.mapaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand"
        >
          Abrir no Google Maps
        </a>
      </Container>
    </section>
  )
}
