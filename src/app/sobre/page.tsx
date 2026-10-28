import type { Metadata } from "next"
import Image from "next/image"
import { areasAtendimento, siteConfig, sobreConteudo } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export const metadata: Metadata = {
  title: "Sobre a empresa",
  description:
    "A JL Concreto Usinado é uma concreteira com usina própria em Duque de Caxias e mais de cinco anos de atendimento no Rio e no Grande Rio.",
  alternates: { canonical: "/sobre" },
}

export default function SobrePage() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro eyebrow="A concreteira" title={sobreConteudo.titulo} summary={sobreConteudo.resumo} />
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-graphite">
          <Image
            src="/imagens/obra-usina.jpg"
            alt="Usina própria da JL Concreto Usinado em Duque de Caxias"
            fill
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-10 max-w-[44rem] space-y-5">
          {sobreConteudo.paragrafos.map((paragrafo) => (
            <p key={paragrafo} className="text-base leading-7 text-ink">
              {paragrafo}
            </p>
          ))}
          <p className="text-base leading-7 text-ink">{sobreConteudo.missao}</p>
        </div>
        <div className="mt-14">
          <h2 className="text-xs tracking-[0.14em] text-brand uppercase">Onde atendemos</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {areasAtendimento.map((area) => (
              <li key={area} className="rounded-2xl border border-ink/10 px-3 py-4 text-sm text-ink">
                {area}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12">
          <WhatsAppLink href={siteConfig.whatsappHref}>Falar com um vendedor</WhatsAppLink>
        </div>
      </PageBody>
    </PageMain>
  )
}
