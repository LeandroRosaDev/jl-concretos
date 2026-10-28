import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { seoConfig, siteConfig } from "@/content/site"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { localBusinessJsonLd } from "@/lib/jsonld"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoConfig.title,
    template: "%s — JL Concreto Usinado",
  },
  description: seoConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.nome,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: "/imagens/obra-usina.jpg",
        width: 600,
        height: 600,
        alt: "Usina própria da JL Concreto Usinado",
      },
    ],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd()

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  )
}
