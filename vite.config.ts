import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'fir-canvas',
            fileName: (format) => `fir-canvas.${format}.js`,
            formats: ['es', 'umd'],
        },
        outDir: './lib',
    },
});
