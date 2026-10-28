import { areasAtendimento } from "@/content/site"
import type { HomeSection } from "@/types/site"

export function Regions({ section }: { section: HomeSection }) {
  const loop = [...areasAtendimento, ...areasAtendimento]

  return (
    <section
      id={section.anchor}
      aria-label={section.titulo}
      className="relative z-10 overflow-hidden border-y border-white/10 bg-graphite text-inverse"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 text-center md:px-8 md:py-16">
        <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{section.tema}</p>
        <h2 className="mx-auto mt-4 max-w-[18ch] text-[32px] leading-[38px] font-medium tracking-tight min-[1100px]:text-[46px] min-[1100px]:leading-[52px]">
          {section.titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-inverse/75">{section.subtitulo}</p>
      </div>
      <p className="sr-only">{areasAtendimento.join(", ")}</p>
      <ul className="animate-marquee flex w-max gap-8 border-t border-white/10 py-5 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-5">
        {loop.map((area, index) => {
          const duplicate = index >= areasAtendimento.length
          return (
            <li
              key={`${area}-${index}`}
              aria-hidden={duplicate || undefined}
              className={`flex items-center gap-8 text-sm font-medium tracking-[0.16em] uppercase ${duplicate ? "motion-reduce:hidden" : ""}`}
            >
              {area}
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
