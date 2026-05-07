import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin: copies index.html → dist/index.html, swapping the dev script tag
// with the production built widget.js so Vercel can serve it as a static page.
function copyIndexPlugin() {
  return {
    name: 'copy-index-html',
    closeBundle() {
      const src = path.resolve(__dirname, 'index.html');
      const dest = path.resolve(__dirname, 'dist', 'index.html');
      let html = fs.readFileSync(src, 'utf-8');
      // Replace dev-only module script with production widget
      html = html.replace(
        /<script type="module" src="\/src\/index\.js"><\/script>/,
        '<script src="./widget.js"></script>'
      );
      fs.writeFileSync(dest, html);
      console.log('✓ dist/index.html written');
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
