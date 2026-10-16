import { defineConfig } from 'vite-plus';

// Browser / <script> (IIFE) build of @superdoc/fonts: emits dist/superdoc-fonts.min.js exposing
// the `SuperDocFonts` global ({ superdocFonts, createSuperDocFonts, resolveBundledFontAssetUrl }).
// The bundler entry (src/index.ts) stays tsc-built; this build exists only for plain <script>/CDN
// consumption, where the import.meta.url asset URLs don't apply. tsc runs first and writes the
// dist/*.js + dist/*.d.ts, so this build must NOT empty the output dir.
export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-3-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/cdn-entry.ts',
      formats: ['iife'],
      name: 'SuperDocFonts',
      fileName: () => 'superdoc-fonts.min.js',
    },
    minify: 'esbuild',
    sourcemap: true,
  },
});
