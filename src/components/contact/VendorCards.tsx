import { vendedores } from "@/content/site"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export function VendorCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {vendedores.map((vendedor) => (
        <li key={vendedor.nome} className="rounded-3xl border border-ink/10 bg-white p-6">
          <p className="text-xs tracking-[0.14em] text-brand uppercase">{vendedor.rotulo}</p>
          <a href={vendedor.telHref} className="mt-3 block text-2xl font-medium text-ink">
            {vendedor.telefone}
          </a>
          <WhatsAppLink href={vendedor.whatsappHref} className="mt-6 w-full">
            Chamar no WhatsApp
          </WhatsAppLink>
        </li>
      ))}
    </ul>
  )
}
