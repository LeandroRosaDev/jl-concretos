import type { Metadata } from "next"
import { PageBody, PageIntro, PageMain } from "@/components/pages/SimplePage"

export const metadata: Metadata = {
  title: "Cookies",
  description: "Uso de cookies no site da JL Concreto Usinado.",
  alternates: { canonical: "/cookies" },
}

export default function CookiesPage() {
  return (
    <PageMain>
      <PageBody>
        <PageIntro
          eyebrow="Institucional"
          title="Cookies"
          summary="Este site não instala cookies de anúncio, de remarketing ou de comentário."
        />
        <div className="mt-10 max-w-[44rem] space-y-5 text-base leading-7 text-quiet">
          <p>
            A navegação nas páginas é estática. Não há login, carrinho nem caixa de comentários. Por isso não gravamos preferência de usuário em cookie próprio.
          </p>
          <p>
            O mapa do Google, incorporado na home e na página de contato, pode definir cookies do Google quando o quadro é carregado. Esses cookies pertencem ao Google e seguem a política de privacidade dessa empresa.
          </p>
          <p>
            O servidor de hospedagem pode registrar dados técnicos do acesso, como data, página e endereço IP, para segurança e diagnóstico. Isso não é usado para montar perfil comercial dentro do site.
          </p>
          <p>
            Se preferir, o navegador permite bloquear cookies de terceiros. O conteúdo da JL continua legível; o mapa pode deixar de carregar.
          </p>
        </div>
      </PageBody>
    </PageMain>
  )
}
