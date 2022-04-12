/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ include: ['./src/props-diff-logger.tsx'] })],
  build: {
    lib: {
      entry: './src/props-diff-logger.tsx',
      name: 'WithPropsDiffLogger',
      fileName: (format) => `props-diff-logger.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
