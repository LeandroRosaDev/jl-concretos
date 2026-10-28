export function mensagemWhatsapp(nome: string) {
  return `Olá ${nome}, estava no site JL Concreto Usinado e gostaria de saber mais.`
}

export function linkWhatsapp(telefoneE164: string, nome: string) {
  return `https://api.whatsapp.com/send?phone=${telefoneE164}&text=${encodeURIComponent(mensagemWhatsapp(nome))}`
}
