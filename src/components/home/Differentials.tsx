import { diferenciais } from "@/content/site"
import type { HomeSection } from "@/types/site"
import { Container, Eyebrow, SectionTitle, sectionPad } from "@/components/layout/primitives"
import { Reveal } from "@/components/motion/Reveal"

export function Differentials({ section }: { section: HomeSection }) {
  return (
    <section id={section.anchor} className="relative z-10">
      <Container className={sectionPad}>
        <Reveal>
          <Eyebrow>{section.tema}</Eyebrow>
          <SectionTitle className="mt-4 max-w-[18ch]">{section.titulo}</SectionTitle>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {diferenciais.map((item, index) => (
              <li key={item.numero}>
                <Reveal delay={index * 90}>
                <div className="border-t-2 border-brand pt-6">
                  <p className="text-xs tracking-[0.16em] text-quiet">{item.numero}</p>
                  <h3 className="mt-3 text-2xl font-medium text-ink">{item.titulo}</h3>
                <p className="mt-3 text-base leading-7 text-quiet">{item.texto}</p>
                </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
