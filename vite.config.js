import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { version } from './package.json';

process.env.REACT_APP_VERSION = version;

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      manifest: {
        short_name: '树洞社区版',
        name: 'P大树洞社区版',
        icons: [
          {
            src: 'static/favicon/256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'static/favicon/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#333333',
        background_color: '#333333',
      },
    }),
  ],
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build',
  },
});
