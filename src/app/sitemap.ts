import type { MetadataRoute } from "next"
import { posts, servicos, siteConfig } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ["", "/sobre", "/servicos", "/contato", "/blog", "/politica-de-privacidade", "/cookies", "/termos-de-uso"]

  return [
    ...estaticas.map((path) => ({
      url: `${siteConfig.url}${path}`,
    })),
    ...servicos.map((servico) => ({
      url: `${siteConfig.url}/servicos/${servico.slug}`,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  ]
}
