import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { servicos, siteConfig } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

type Params = { slug: string }

export function generateStaticParams() {
  return servicos.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const servico = servicos.find((item) => item.slug === slug)
  if (!servico) return { title: "Página não encontrada" }
  return {
    title: servico.titulo,
    description: servico.frase,
    alternates: { canonical: `/servicos/${servico.slug}` },
  }
}

export default async function ServicoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const servico = servicos.find((item) => item.slug === slug)
  if (!servico) notFound()

  const outros = servicos.filter((item) => item.slug !== servico.slug)

  return (
    <PageMain>
      <PageBody>
        <PageIntro eyebrow="Serviços" title={servico.titulo} summary={servico.frase} />
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-graphite">
          <Image
            src={servico.imagem}
            alt={servico.imagemAlt}
            fill
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-8 max-w-[44rem] text-base leading-7 text-quiet">{servico.descricao}</p>
        <div className="mt-12 grid gap-12 min-[900px]:grid-cols-2">
          <div>
            <h2 className="text-xs tracking-[0.14em] text-brand uppercase">O que inclui</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {servico.inclui.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-ink">
                  <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs tracking-[0.14em] text-brand uppercase">Aplicações</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {servico.aplicacoes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-ink">
                  <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-[44rem] text-base leading-7 text-quiet">{servico.paraQuem}</p>
        <div className="mt-10">
          <WhatsAppLink href={siteConfig.whatsappHref}>Orçar no WhatsApp</WhatsAppLink>
        </div>
        <div className="mt-16 border-t border-ink/10 pt-8">
          <h2 className="text-xs tracking-[0.14em] text-brand uppercase">Outros serviços</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {outros.map((item) => (
              <li key={item.slug}>
                <Link href={`/servicos/${item.slug}`} className="text-base text-ink">
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </PageMain>
  )
}
