"use client"

import Link from "next/link"
import Image from "next/image"
import { footerNav, redesSociais, siteConfig, vendedores } from "@/content/site"
import { SocialIcon } from "@/components/ui/social-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const columns = [
  { id: "empresa", titulo: "Empresa", links: footerNav.empresa },
  { id: "servicos", titulo: "Serviços", links: footerNav.servicos },
  { id: "institucional", titulo: "Institucional", links: footerNav.institucional },
]

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-sm text-inverse/80 hover:text-inverse">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Attendance() {
  return (
    <ul className="flex flex-col gap-3 text-sm text-inverse/80">
      {vendedores.map((vendedor) => (
        <li key={vendedor.nome}>
          <a
            href={vendedor.whatsappHref}
            className="hover:text-inverse"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {vendedor.rotulo} — {vendedor.telefone}
          </a>
        </li>
      ))}
      {siteConfig.emails.map((item) => (
        <li key={item.email}>
          <a href={`mailto:${item.email}`} className="hover:text-inverse">
            {item.email}
          </a>
        </li>
      ))}
      <li>{siteConfig.horarioCurto}</li>
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="bg-graphite px-5 pt-16 pb-28 text-inverse md:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="hidden gap-8 min-[1100px]:grid min-[1100px]:grid-cols-5">
          <div className="col-span-2">
            <Image src="/imagens/logo.png" alt="" width={180} height={72} className="h-10 w-auto" />
            <p className="mt-4 max-w-[22rem] text-sm leading-6 text-inverse/75">{siteConfig.frase}</p>
            <p className="mt-4 text-sm leading-6 text-inverse/75">
              {siteConfig.enderecoLinhas[0]}
              <br />
              {siteConfig.enderecoLinhas[1]}
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.id}>
              <h2 className="text-xs tracking-[0.14em] text-white uppercase">{column.titulo}</h2>
              <div className="mt-4">
                <LinkList links={column.links} />
              </div>
            </div>
          ))}
        </div>

        <div className="min-[1100px]:hidden">
          <Image src="/imagens/logo.png" alt="JL Concreto Usinado" width={180} height={72} className="h-10 w-auto" />
          <p className="mt-4 max-w-[24rem] text-sm leading-6 text-inverse/75">{siteConfig.frase}</p>
          <Accordion className="mt-8">
            {columns.map((column) => (
              <AccordionItem key={column.id} value={column.id} className="border-white/10">
                <AccordionTrigger className="py-4 text-sm tracking-[0.14em] text-inverse uppercase hover:no-underline">
                  {column.titulo}
                </AccordionTrigger>
                <AccordionContent>
                  <LinkList links={column.links} />
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="atendimento" className="border-white/10">
              <AccordionTrigger className="py-4 text-sm tracking-[0.14em] text-inverse uppercase hover:no-underline">
                Atendimento
              </AccordionTrigger>
              <AccordionContent>
                <Attendance />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-10 hidden min-[1100px]:block">
          <h2 className="text-xs tracking-[0.14em] text-white uppercase">Atendimento</h2>
          <div className="mt-4">
            <Attendance />
          </div>
        </div>

        <ul className="mt-10 flex gap-4">
          {redesSociais.map((rede) => (
            <li key={rede.nome}>
              <a
                href={rede.href}
                className="text-inverse"
                aria-label={rede.nome}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name={rede.nome} />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-inverse/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 JL Concreto Usinado</p>
          <p>Concreto bombeado no Rio e no Grande Rio</p>
        </div>
      </div>
    </footer>
  )
}
