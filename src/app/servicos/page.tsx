import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { servicos } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Nossos serviços",
  description:
    "Concreto bombeado, piso industrial e laje pré-fabricada com usina própria da JL Concreto Usinado, no Rio e no Grande Rio.",
  alternates: { canonical: "/servicos" },
}

export default function ServicosPage() {
  return (
    <PageMain tone="mist">
      <PageBody>
        <PageIntro
          eyebrow="Serviços"
          title="Concreto para a obra inteira"
          summary="Três frentes de fornecimento, todas com dosagem na usina própria e bombeamento quando a obra precisa."
        />
        <ul className="mt-12 flex flex-col gap-6">
          {servicos.map((servico) => (
            <li key={servico.slug} className="grid overflow-hidden bg-white md:grid-cols-[280px_minmax(0,1fr)]">
              <div className="relative min-h-52 bg-graphite">
                <Image src={servico.imagem} alt={servico.imagemAlt} fill sizes="280px" className="object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-medium text-ink">{servico.titulo}</h2>
                <p className="mt-3 max-w-[46rem] text-base leading-7 text-quiet">{servico.descricao}</p>
                <Link href={`/servicos/${servico.slug}`} className="mt-5 inline-flex text-sm font-medium text-brand">
                  Ver detalhes
                  <span aria-hidden className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </PageBody>
    </PageMain>
  )
}
