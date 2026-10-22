import { defineConfig } from 'vite-plus';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-4-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  plugins: [dts({ rollupTypes: true })],
  build: {
    // Keep the consumer target stable instead of following Vite's moving default.
    target: 'es2020',
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue', 'superdoc'],
      // The entry exports both named values and a default.
      output: { exports: 'named' },
    },
  },
});
