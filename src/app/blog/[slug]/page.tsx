import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, siteConfig } from "@/content/site"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

type Params = { slug: string }

export function generateStaticParams() {
  return posts.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  if (!post) return { title: "Página não encontrada" }
  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      images: [{ url: post.imagem, alt: post.imagemAlt }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()

  const outros = posts.filter((item) => item.slug !== post.slug)

  return (
    <PageMain>
      <PageBody>
        <PageIntro eyebrow={post.categoria} title={post.titulo} summary={post.resumo} />
        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-graphite">
          <Image
            src={post.imagem}
            alt={post.imagemAlt}
            fill
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-10 max-w-[44rem] space-y-5">
          {post.corpo.map((paragrafo) => (
            <p key={paragrafo} className="text-base leading-7 text-ink">
              {paragrafo}
            </p>
          ))}
        </div>
        <div className="mt-10">
          <WhatsAppLink href={siteConfig.whatsappHref}>Pedir orçamento no WhatsApp</WhatsAppLink>
        </div>
        <div className="mt-16 border-t border-ink/10 pt-8">
          <h2 className="text-xs tracking-[0.14em] text-brand uppercase">Outros artigos</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {outros.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="text-base text-ink">
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
