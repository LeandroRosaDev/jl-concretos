/**
 * PM2 para o site JL Concreto Usinado (Next.js).
 *
 * Uso:
 *  npm run build
 *  pm2 start ecosystem.config.cjs
 *  pm2 reload ecosystem.config.cjs --update-env
 *  pm2 logs jl-concreto
 *  pm2 save && pm2 startup
 */

module.exports = {
  apps: [
    {
      name: "jl-concreto",
      script: "npm",
      args: "run start -- -p 3091",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3091",
      },
    },
  ],
}
