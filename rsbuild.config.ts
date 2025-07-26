import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './src/index.html',
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port: 3000,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          'tailwindcss',
          'autoprefixer',
        ],
      },
    },
  },
}); 