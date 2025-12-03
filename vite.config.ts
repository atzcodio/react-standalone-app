import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode: any }) => ({
    plugins: [react()],
    resolve: {
        alias: {
            // optional: make imports of component bundles resolve to the public folder in prod
            '@/components': path.resolve(__dirname, 'public/components'),
        },
    },
    build: {
        outDir: 'build',               // <-- your existing build folder
        rollupOptions: {
            // Treat component bundles as external – they will be loaded at runtime
            external: [
                // any peer deps you already have (react, etc.)
                'react',
                'react-dom',
                // component bundle names – Vite will keep the import as a dynamic import
                // (the actual URLs are resolved by the loader above)
                // No need to list them all; we’ll load them via `import()` in the registry.
            ],
        },
    },
}));