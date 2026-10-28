import { homeSections } from "@/content/site"
import type { HomeSection } from "@/types/site"

export function getHomeSections() {
  return homeSections.filter((section) => section.ativo).sort((a, b) => a.ordem - b.ordem)
}

export function getSection(id: HomeSection["id"]) {
  return homeSections.find((section) => section.id === id) ?? null
}
