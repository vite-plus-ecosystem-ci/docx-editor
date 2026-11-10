import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite-plus';

const exampleRoot = path.dirname(fileURLToPath(import.meta.url));
const reactEntry = fileURLToPath(import.meta.resolve('@superdoc/react'));
const superdocEntry = createRequire(reactEntry).resolve('superdoc');
const engineEntry = createRequire(superdocEntry).resolve('@superdoc/docx-engine');

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-6-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@superdoc/docx-engine'],
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(exampleRoot), path.dirname(engineEntry)],
    },
  },
});
