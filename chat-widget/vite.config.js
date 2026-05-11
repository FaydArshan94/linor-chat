import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin: copies index.html → dist/index.html, swapping the dev script tag
// with the production built widget.js so Vercel can serve it as a static page.
// Also replaces %VITE_...% env placeholders.
function copyIndexPlugin() {
  return {
    name: 'copy-index-html',
    configResolved(config) {
      this.env = loadEnv(config.mode, process.cwd());
    },
    closeBundle() {
      const src = path.resolve(__dirname, 'index.html');
      const dest = path.resolve(__dirname, 'dist', 'index.html');
      let html = fs.readFileSync(src, 'utf-8');

      // Replace dev-only module script with production widget
      html = html.replace(
        /<script type="module" src="\/src\/index\.js"><\/script>/,
        '<script src="./widget.js"></script>'
      );

      // Replace %VITE_...% env placeholders
      Object.entries(this.env).forEach(([key, value]) => {
        if (key.startsWith('VITE_')) {
          const regex = new RegExp(`%${key}%`, 'g');
          html = html.replace(regex, value);
        }
      });

      fs.writeFileSync(dest, html);
      console.log('✓ dist/index.html written with env variables');
    },
  };
}

export default defineConfig({
  plugins: [copyIndexPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'AIReceptionistWidget',
      fileName: () => 'widget.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2017',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});
