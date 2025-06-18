import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable JSX in .js files
      include: '**/*.{jsx,js}',
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build: {
    outDir: 'build', // To maintain compatibility with existing setup
  },
  resolve: {
    alias: {
      // Set up any path aliases if needed
      // '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Add these extensions to process JSX in .js files
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
