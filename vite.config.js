import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    root: 'src/fe',
    build: {
        outDir: '../../dist',
        emptyOutDir: true,
    },
    plugins: [react()],
    server: {
        port: 3030,
        proxy: {
            '/api': {
                target: 'http://localhost:3031',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/fe'),
        },
    },
});