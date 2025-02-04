import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                // Menjaga nama modul agar tetap mudah diakses
                manualChunks: undefined,
            },
        },
    },
});