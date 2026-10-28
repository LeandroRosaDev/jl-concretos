import type { Metadata } from "next"
import { siteConfig } from "@/content/site"
import { MapEmbed } from "@/components/contact/MapEmbed"
import { VendorCards } from "@/components/contact/VendorCards"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Fale conosco",
  description:
    "Orçamento de concreto bombeado pelo WhatsApp. Léo (21) 97019-2706 e Junior (21) 96409-9610. Usina em Duque de Caxias.",
  alternates: { canonical: "/contato" },
}

export default function ContatoPage() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro
          eyebrow="Contato"
          title="Peça o orçamento direto com quem vende"
          summary="Não há formulário. O atendimento começa no WhatsApp, no horário da concreteira, com o Léo ou com o Junior."
        />
        <div className="mt-10">
          <VendorCards />
        </div>
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-[0.14em] text-brand uppercase">E-mails</dt>
            <dd className="mt-3 flex flex-col gap-2 text-sm">
              {siteConfig.emails.map((item) => (
                <a key={item.email} href={`mailto:${item.email}`} className="text-ink">
                  {item.email}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-brand uppercase">Horário</dt>
            <dd className="mt-3 text-sm leading-6 text-ink">{siteConfig.horario}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-brand uppercase">Endereço</dt>
            <dd className="mt-3 text-sm leading-6 text-ink">
              {siteConfig.enderecoLinhas[0]}
              <br />
              {siteConfig.enderecoLinhas[1]}
            </dd>
          </div>
        </dl>
      </PageBody>
      <div className="relative h-[280px] bg-graphite min-[1200px]:h-[420px]">
        <MapEmbed className="absolute inset-0 h-full w-full border-0" />
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] px-5 py-6 md:px-8">
        <a
          href={siteConfig.mapaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand"
        >
          Abrir no Google Maps
        </a>
      </div>
    </PageMain>
  )
}
