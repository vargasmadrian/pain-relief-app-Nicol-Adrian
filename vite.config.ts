import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/pain-relief-app-Nicol-Adrian/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MoovIA - Teoría del Dolor',
        short_name: 'MoovIA',
        description: 'Aplicación interactiva de educación y terapia basada en neurociencia del dolor',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: '/avatar_placeholder.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/avatar_placeholder.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
