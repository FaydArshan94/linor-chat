import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Plugin: handles environment variable substitution in index.html
 * and copies it to the dist folder for production deployment.
 */
function copyIndexPlugin() {
  let envVars = {};

  return {
    name: 'copy-index-html',
    // Capture the resolved config to load environment variables
    configResolved(config) {
      envVars = loadEnv(config.mode, process.cwd());
    },
    // Transform index.html when served in dev mode
    transformIndexHtml(html) {
      let output = html;
      Object.entries(envVars).forEach(([key, value]) => {
        if (key.startsWith('VITE_')) {
          const regex = new RegExp(`%${key}%`, 'g');
          output = output.replace(regex, value);
        }
      });
      return output;
    },
    // Copy and transform index.html for production build
    closeBundle() {
      const srcPath = path.resolve(__dirname, 'index.html');
      const distDir = path.resolve(__dirname, 'dist');
      const destPath = path.resolve(distDir, 'index.html');

      if (!fs.existsSync(srcPath)) return;
      if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

      let html = fs.readFileSync(srcPath, 'utf-8');

      // Replace dev script with production bundle
      html = html.replace(
        /<script type="module" src="\/src\/index\.js"><\/script>/,
        '<script src="./widget.js"></script>'
      );

      // Replace placeholders with env values
      Object.entries(envVars).forEach(([key, value]) => {
        if (key.startsWith('VITE_')) {
          const regex = new RegExp(`%${key}%`, 'g');
          html = html.replace(regex, value);
        }
      });

      fs.writeFileSync(destPath, html);
      console.log('✓ dist/index.html generated with environment variables.');
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
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
