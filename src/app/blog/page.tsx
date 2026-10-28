import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { posts } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre concreto bombeado, laje pré-moldada e piso industrial para obras no Rio de Janeiro e no Grande Rio.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <PageMain tone="mist">
      <PageBody>
        <PageIntro
          eyebrow="Conteúdo"
          title="Guias para quem vai concretar"
          summary="Textos diretos sobre bombeamento, laje e piso, escritos a partir do que a JL entrega na obra."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col bg-white">
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-graphite">
                <Image src={post.imagem} alt={post.imagemAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs tracking-[0.14em] text-brand uppercase">{post.categoria}</p>
                <h2 className="mt-3 text-xl leading-7 font-medium text-ink">
                  <Link href={`/blog/${post.slug}`}>{post.titulo}</Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-quiet">{post.resumo}</p>
              </div>
            </li>
          ))}
        </ul>
      </PageBody>
    </PageMain>
  )
}
