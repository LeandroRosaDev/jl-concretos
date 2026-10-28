import type { Metadata } from "next"
import { sectionRegistry } from "@/components/home/registry"
import { ScrollLines } from "@/components/motion/ScrollLines"
import { getHomeSections } from "@/lib/sections"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  const sections = getHomeSections()

  return (
    <main className="relative pt-16 md:pt-[100px]">
      <ScrollLines />
      {sections.map((section) => {
        const Section = sectionRegistry[section.id]
        return <Section key={section.id} section={section} />
      })}
    </main>
  )
}
