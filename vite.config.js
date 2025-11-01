import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Vite dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://localhost:3000',
        changeOrigin: true, // optional, recommended if backend serves images
        secure: false,
      },
    },
  },
});
