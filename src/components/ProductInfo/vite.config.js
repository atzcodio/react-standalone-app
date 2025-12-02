const react = require('@vitejs/plugin-react');
const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    plugins: [react()],
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'umd'],
            name: 'ProductInfoComponent',
            fileName: (format) => `productinfo.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
