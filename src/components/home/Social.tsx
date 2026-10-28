import { redesSociais } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { SocialIcon } from "@/components/ui/social-icon"

export function Social({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10">
      <Container className={`${sectionPad} text-center`}>
        <Eyebrow>{section.tema}</Eyebrow>
        <SectionTitle className="mx-auto mt-4 max-w-[16ch]">{section.titulo}</SectionTitle>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-quiet">{section.subtitulo}</p>
        <ul className="mt-10 flex flex-wrap items-start justify-center gap-8 md:gap-12">
          {redesSociais.map((rede) => (
            <li key={rede.nome}>
              <a
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rede.nome}
                className="group flex flex-col items-center gap-3"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <SocialIcon name={rede.nome} />
                </span>
                <span className="text-sm font-medium text-ink">{rede.nome}</span>
                <span className="text-xs tracking-wide text-quiet">{rede.rotulo}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
