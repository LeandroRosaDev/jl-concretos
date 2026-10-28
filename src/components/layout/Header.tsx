"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { menu, siteConfig } from "@/content/site"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const menuIds = menu.map((item) => item.id).filter((id): id is string => Boolean(id))

function itemHref(href: string, id: string | undefined, isHome: boolean) {
  if (isHome && id && href.startsWith("/#")) return `#${id}`
  return href
}

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [activeId, setActiveId] = useState("inicio")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isHome) return

    const onScroll = () => {
      const mid = window.innerHeight * 0.35
      let current = "inicio"
      for (const id of menuIds) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= mid) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-graphite text-inverse">
      <div className="hidden h-9 items-center justify-between border-b border-white/10 px-8 text-xs text-inverse/70 md:flex">
        <p>{siteConfig.horarioCurto}</p>
        <p>Rio e Grande Rio · {siteConfig.cidade}</p>
      </div>
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="shrink-0" aria-label="JL Concreto Usinado, página inicial">
          <Image
            src="/imagens/logo.png"
            alt="JL Concreto Usinado"
            width={200}
            height={80}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-6 min-[1100px]:flex" aria-label="Principal">
          {menu.map((item) => {
            const href = itemHref(item.href, item.id, isHome)
            const active = item.href === "/blog" ? pathname.startsWith("/blog") : isHome && item.id === activeId
            return (
              <a
                key={item.label}
                href={href}
                className={cn(
                  "relative text-sm text-inverse/85 hover:text-inverse",
                  active && "text-inverse after:absolute after:right-0 after:-bottom-1.5 after:left-0 after:h-px after:bg-brand",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
          className="hidden h-10 items-center rounded-full bg-whatsapp px-5 text-sm font-medium text-white hover:bg-[#1d9203] min-[1100px]:inline-flex"
        >
          Orçamento
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center text-inverse min-[1100px]:hidden"
            aria-label="Abrir menu"
          >
            <Menu strokeWidth={1.5} />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="inset-0 h-svh w-screen max-w-none border-0 bg-graphite p-0 text-inverse data-[side=right]:w-screen data-[side=right]:max-w-none data-[side=right]:sm:max-w-none"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex justify-end px-5 pt-5">
              <SheetClose className="text-sm text-inverse">Fechar</SheetClose>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-6 px-8" aria-label="Principal">
              {menu.map((item) => (
                <a
                  key={item.label}
                  href={itemHref(item.href, item.id, isHome)}
                  onClick={() => setOpen(false)}
                  className="text-[32px] leading-none text-inverse"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="p-8">
              <Button
                nativeButton={false}
                render={
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    suppressHydrationWarning
                    onClick={() => setOpen(false)}
                  />
                }
                className="h-12 w-full rounded-full bg-whatsapp text-white hover:bg-[#1d9203] active:translate-y-0"
              >
                Quero fazer orçamento
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
