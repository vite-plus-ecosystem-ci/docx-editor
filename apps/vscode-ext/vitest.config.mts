import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-6-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    include: ['__tests__/**/*.test.ts'],
    alias: [
      {
        find: /^superdoc\/style\.css$/,
        replacement: fileURLToPath(new URL('./__tests__/stubs/superdoc-style.ts', import.meta.url)),
      },
      { find: /^superdoc$/, replacement: fileURLToPath(new URL('./__tests__/stubs/superdoc.ts', import.meta.url)) },
    ],
  },
});
