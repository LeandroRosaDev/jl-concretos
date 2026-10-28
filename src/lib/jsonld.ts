import { areasAtendimento, redesSociais, siteConfig, vendedores } from "@/content/site"

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.nome,
    description:
      "Concreteira com usina própria em Duque de Caxias. Concreto bombeado, piso industrial e laje pré-moldada para o Rio e o Grande Rio.",
    url: siteConfig.url,
    image: `${siteConfig.url}/imagens/obra-usina.jpg`,
    telephone: "+55-21-97019-2706",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Crateus, s/n, Quadra 05, Lote 05, Chácara Rio Petrópolis",
      addressLocality: "Duque de Caxias",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    areaServed: areasAtendimento,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "12:00",
      },
    ],
    contactPoint: vendedores.map((vendedor) => ({
      "@type": "ContactPoint",
      telephone: `+${vendedor.telefoneE164}`,
      contactType: "sales",
      name: vendedor.nome,
      availableLanguage: "Portuguese",
    })),
    sameAs: redesSociais.map((rede) => rede.href),
  }
}
