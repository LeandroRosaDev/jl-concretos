# JL Concreto Usinado

Site institucional em Next.js, com conteúdo estático e orçamento pelo WhatsApp.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
pm2 start ecosystem.config.cjs
```

O processo sobe na porta 3091, no mesmo padrão de proxy reverso usado nos outros sites.
